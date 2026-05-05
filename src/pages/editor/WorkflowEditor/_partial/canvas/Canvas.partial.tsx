import {
	Background,
	Controls,
	MiniMap,
	ReactFlow,
	applyNodeChanges,
	useReactFlow,
	type Connection,
	type EdgeTypes,
	type IsValidConnection,
	type NodeChange,
	type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCanvasDrop } from '../../_hooks/useCanvasDrop.hook';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import BaseNode from './nodes/BaseNode.partial';
import InputNode from './nodes/InputNode.partial';
import OutputNode from './nodes/OutputNode.partial';
import StickyNote from './nodes/StickyNote.partial';
import CanvasEmptyState from './CanvasEmptyState.partial';
import CanvasStats from './CanvasStats.partial';
import ClickEdge from './ClickEdge.partial';
import useDarkMode from '@/hooks/useDarkMode';
import type { TCanvasNode } from '../../_types/canvas.type';
import { validateWorkflow } from '../../_helper/validation.helper';
import { NODE_CATALOG_MAP } from '../../_helper/nodeCatalog.constants';
import { PORT_TYPE_COLOR } from '../../_helper/builder.constants';
import type { TPortType } from '../../_types/node.type';

const nodeTypes: NodeTypes = {
	base: BaseNode,
	input: InputNode,
	output: OutputNode,
	note: StickyNote,
};

const edgeTypes: EdgeTypes = {
	workflow: ClickEdge,
};

const getPortType = (node: TCanvasNode | undefined, portId?: string | null): TPortType => {
	const def = node ? NODE_CATALOG_MAP[node.data.defKey] : undefined;
	const port = [...(def?.inputs ?? []), ...(def?.outputs ?? [])].find((item) => item.id === portId);
	return port?.type ?? 'any';
};

const getEdgeLabel = (
	nodes: TCanvasNode[],
	source: string,
	target: string,
	sourceHandle?: string | null,
	targetHandle?: string | null,
) => {
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const sourceType = getPortType(byId.get(source), sourceHandle);
	const targetType = getPortType(byId.get(target), targetHandle);
	const type = sourceType === 'any' ? targetType : sourceType;
	return type === 'any' ? 'flow' : type;
};

const Canvas = () => {
	const { state, dispatch } = useWorkflowEditor();
	const { isDarkTheme } = useDarkMode();
	const reactFlow = useReactFlow<TCanvasNode>();
	const didDragNodeRef = useRef(false);
	const [isDraggingExistingNode, setIsDraggingExistingNode] = useState(false);
	const { isDraggingNode, onDragOver, onDragLeave, onDrop } = useCanvasDrop((event) =>
		reactFlow.screenToFlowPosition({ x: event.clientX, y: event.clientY }),
	);
	const validationIssues = useMemo(
		() => validateWorkflow(state.nodes, state.edges),
		[state.nodes, state.edges],
	);
	const issuesByNode = useMemo(() => {
		const result = new Map<string, typeof validationIssues>();
		validationIssues.forEach((issue) => {
			if (!issue.nodeId) return;
			result.set(issue.nodeId, [...(result.get(issue.nodeId) ?? []), issue]);
		});
		return result;
	}, [validationIssues]);

	const storeNodes = useMemo(
		() =>
			state.nodes.map((node) => ({
				...node,
				selected: state.ui.selectedNodeId === node.id,
				draggable: !node.data.locked,
				data: {
					...node.data,
					validationIssues: issuesByNode.get(node.id) ?? [],
					isActiveRunNode: state.run.currentNodeId === node.id,
				},
			})),
		[issuesByNode, state.nodes, state.run.currentNodeId, state.ui.selectedNodeId],
	);

	const [nodes, setNodes] = useState<TCanvasNode[]>(storeNodes);

	useEffect(() => {
		if (!isDraggingExistingNode) setNodes(storeNodes);
	}, [isDraggingExistingNode, storeNodes]);

	const edges = useMemo(
		() =>
			state.edges.map((edge) => {
				const sourceType = getPortType(
					state.nodes.find((node) => node.id === edge.source),
					edge.sourceHandle,
				);
				const targetType = getPortType(
					state.nodes.find((node) => node.id === edge.target),
					edge.targetHandle,
				);
				const typeMismatch =
					sourceType !== 'any' && targetType !== 'any' && sourceType !== targetType;
				const isActive =
					state.run.status === 'running' &&
					(edge.source === state.run.currentNodeId || edge.target === state.run.currentNodeId);
				return {
					...edge,
					type: 'workflow' as const,
					animated: isActive,
					data: {
						...edge.data,
						label: getEdgeLabel(
							state.nodes,
							edge.source,
							edge.target,
							edge.sourceHandle,
							edge.targetHandle,
						),
						labelColor: PORT_TYPE_COLOR[sourceType === 'any' ? targetType : sourceType],
						isActive,
						issue: typeMismatch ? 'Port types do not match' : undefined,
					},
					style: {
						stroke: typeMismatch
							? 'rgb(244 63 94)'
							: isActive
								? 'rgb(16 185 129)'
								: 'rgb(139 92 246)',
						strokeWidth: isActive ? 3 : 2,
					},
				};
			}),
		[state.edges, state.nodes, state.run.currentNodeId, state.run.status],
	);

	const isValidConnection: IsValidConnection = useCallback(
		(connection) => {
			if (!connection.source || !connection.target || connection.source === connection.target) {
				return false;
			}
			const sourceType = getPortType(
				state.nodes.find((node) => node.id === connection.source),
				connection.sourceHandle,
			);
			const targetType = getPortType(
				state.nodes.find((node) => node.id === connection.target),
				connection.targetHandle,
			);
			return sourceType === 'any' || targetType === 'any' || sourceType === targetType;
		},
		[state.nodes],
	);

	const onNodesChange = useCallback(
		(changes: NodeChange<TCanvasNode>[]) => {
			setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
			changes.forEach((change) => {
				if (change.type === 'select' && change.selected) {
					dispatch({ type: 'SELECT_NODE', id: change.id, openInspector: false });
				}
			});
		},
		[dispatch],
	);

	const onConnect = useCallback(
		(connection: Connection) => {
			if (!connection.source || !connection.target) return;
			dispatch({
				type: 'ADD_EDGE',
				source: connection.source,
				target: connection.target,
				sourceHandle: connection.sourceHandle ?? undefined,
				targetHandle: connection.targetHandle ?? undefined,
			});
		},
		[dispatch],
	);

	return (
		<section
			data-canvas='true'
			className='relative min-h-0 flex-1 overflow-hidden bg-zinc-50 dark:bg-zinc-950'
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}>
			<ReactFlow
				fitView
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				onNodesChange={onNodesChange}
				onConnect={onConnect}
				isValidConnection={isValidConnection}
				onNodeDragStart={(_, node) => {
					didDragNodeRef.current = true;
					setIsDraggingExistingNode(true);
					dispatch({ type: 'SELECT_NODE', id: node.id, openInspector: false });
				}}
				onNodeDragStop={(_, node) => {
					setIsDraggingExistingNode(false);
					dispatch({ type: 'MOVE_NODE', id: node.id, position: node.position });
				}}
				onPaneClick={() => dispatch({ type: 'SELECT_NODE', id: null })}
				onNodeClick={(_, node) => {
					if (didDragNodeRef.current) {
						didDragNodeRef.current = false;
						return;
					}
					dispatch({ type: 'SELECT_NODE', id: node.id });
				}}
				onEdgesDelete={(deletedEdges) =>
					deletedEdges.forEach((edge) => dispatch({ type: 'REMOVE_EDGE', id: edge.id }))
				}
				deleteKeyCode={null}
				defaultViewport={{ x: 0, y: 0, zoom: 1 }}
				minZoom={0.2}
				maxZoom={1.5}
				colorMode={isDarkTheme ? 'dark' : 'light'}
				className='workflow-react-flow'>
				<Background
					color={isDarkTheme ? 'rgba(255,255,255,.24)' : 'rgba(0,0,0,.1)'}
					gap={28}
					size={1}
				/>
				<Controls position='bottom-right' />
				{state.ui.miniMapOpen && (
					<MiniMap
						nodeStrokeWidth={3}
						position='bottom-left'
						pannable
						zoomable
						className='overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
					/>
				)}
			</ReactFlow>
			{state.nodes.length === 0 ? (
				<CanvasEmptyState />
			) : (
				<CanvasStats nodes={state.nodes.length} edges={state.edges.length} />
			)}
			{isDraggingNode && (
				<div className='pointer-events-none absolute inset-4 rounded-2xl border-2 border-dashed border-emerald-400/70 bg-emerald-400/10' />
			)}
		</section>
	);
};

export default Canvas;
