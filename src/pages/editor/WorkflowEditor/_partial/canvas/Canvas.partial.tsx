import { useCanvasDrop } from '../../_hooks/useCanvasDrop.hook';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import BaseNode from './nodes/BaseNode.partial';
import InputNode from './nodes/InputNode.partial';
import OutputNode from './nodes/OutputNode.partial';
import IntegrationNode from './nodes/IntegrationNode.partial';
import StickyNote from './nodes/StickyNote.partial';
import CanvasEmptyState from './CanvasEmptyState.partial';
import CanvasStats from './CanvasStats.partial';
import ClickEdge from './ClickEdge.partial';
import useDarkMode from '@/hooks/useDarkMode';

const Canvas = () => {
	const { state, dispatch } = useWorkflowEditor();
	const { isDarkTheme } = useDarkMode();
	const { isDraggingNode, onDragOver, onDragLeave, onDrop } = useCanvasDrop();
	const nodeById = new Map(state.nodes.map((node) => [node.id, node]));

	return (
		<section
			data-canvas='true'
			className='relative min-h-0 flex-1 overflow-hidden bg-zinc-50 dark:bg-zinc-950'
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onClick={() => dispatch({ type: 'SELECT_NODE', id: null })}>
			<div
				className='absolute inset-0 opacity-30'
				style={{
					backgroundImage: `radial-gradient(${isDarkTheme ? 'rgba(255,255,255,.24)' : 'rgba(0,0,0,.1)'} 1px, transparent 1px)`,
					backgroundSize: '28px 28px',
				}}
			/>
			<svg className='pointer-events-none absolute inset-0 h-full w-full overflow-visible'>
				{state.edges.map((edge) => (
					<ClickEdge
						key={edge.id}
						edge={edge}
						source={nodeById.get(edge.source)}
						target={nodeById.get(edge.target)}
						onRemove={() => dispatch({ type: 'REMOVE_EDGE', id: edge.id })}
					/>
				))}
			</svg>
			<div className='absolute inset-0'>
				{state.nodes.map((node) => {
					const props = {
						node,
						selected: state.ui.selectedNodeId === node.id,
						onSelect: () => dispatch({ type: 'SELECT_NODE', id: node.id }),
						onMove: (x: number, y: number) =>
							dispatch({ type: 'MOVE_NODE', id: node.id, position: { x, y } }),
					};
					if (node.type === 'input') return <InputNode key={node.id} {...props} />;
					if (node.type === 'output') return <OutputNode key={node.id} {...props} />;
					if (node.type === 'note') return <StickyNote key={node.id} {...props} />;
					if (node.data.defKey.startsWith('int.')) {
						return <IntegrationNode key={node.id} {...props} />;
					}
					return <BaseNode key={node.id} {...props} />;
				})}
			</div>
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
