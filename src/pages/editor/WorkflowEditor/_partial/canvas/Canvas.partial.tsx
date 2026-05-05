import {
	Background,
	Controls,
	MiniMap,
	ReactFlow,
	applyNodeChanges,
	useReactFlow,
	type Connection,
	type EdgeTypes,
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

const nodeTypes: NodeTypes = {
	base: BaseNode,
	input: InputNode,
	output: OutputNode,
	note: StickyNote,
};

const edgeTypes: EdgeTypes = {
	workflow: ClickEdge,
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

	const storeNodes = useMemo(
		() =>
			state.nodes.map((node) => ({
				...node,
				selected: state.ui.selectedNodeId === node.id,
				draggable: !node.data.locked,
			})),
		[state.nodes, state.ui.selectedNodeId],
	);

	const [nodes, setNodes] = useState<TCanvasNode[]>(storeNodes);

	useEffect(() => {
		if (!isDraggingExistingNode) setNodes(storeNodes);
	}, [isDraggingExistingNode, storeNodes]);

	const edges = useMemo(
		() =>
			state.edges.map((edge) => ({
				...edge,
				type: 'workflow' as const,
				animated: state.run.status === 'running',
				style: { stroke: 'rgb(139 92 246)', strokeWidth: 2 },
			})),
		[state.edges, state.run.status],
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
				<MiniMap
					nodeStrokeWidth={3}
					position='bottom-left'
					pannable
					zoomable
					className='overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
				/>
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
