import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import type { TCanvasEdge } from '../../_types/canvas.type';

const ClickEdge = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	markerEnd,
	style,
	selected,
}: EdgeProps<TCanvasEdge>) => {
	const { dispatch } = useWorkflowEditor();
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	return (
		<>
			<BaseEdge path={edgePath} markerEnd={markerEnd} style={style} interactionWidth={20} />
			<EdgeLabelRenderer>
				<button
					type='button'
					onClick={() => dispatch({ type: 'REMOVE_EDGE', id })}
					title='Remove connection'
					className={[
						'nodrag nopan absolute h-6 w-6 rounded-full border text-xs shadow transition',
						'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100',
						'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700',
						selected ? 'ring-2 ring-violet-400/50' : '',
					].join(' ')}
					style={{
						transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
						pointerEvents: 'all',
					}}>
					x
				</button>
			</EdgeLabelRenderer>
		</>
	);
};

export default ClickEdge;
