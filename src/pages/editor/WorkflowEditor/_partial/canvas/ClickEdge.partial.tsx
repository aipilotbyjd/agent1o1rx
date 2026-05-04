import type { TCanvasEdge, TCanvasNode } from '../../_types/canvas.type';

const ClickEdge = ({
	edge,
	source,
	target,
	onRemove,
}: {
	edge: TCanvasEdge;
	source?: TCanvasNode;
	target?: TCanvasNode;
	onRemove: () => void;
}) => {
	if (!source || !target) return null;
	const x1 = source.position.x + 220;
	const y1 = source.position.y + 58;
	const x2 = target.position.x;
	const y2 = target.position.y + 58;
	const mx = (x1 + x2) / 2;

	return (
		<g>
			<path
				d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
				fill='none'
				stroke='rgba(139, 92, 246, 0.6)'
				strokeWidth='2'
			/>
			<foreignObject x={mx - 12} y={(y1 + y2) / 2 - 12} width='24' height='24'>
				<button
					type='button'
					onClick={onRemove}
					title='Remove connection'
					className='h-6 w-6 rounded-full border border-zinc-300 bg-white text-xs text-zinc-700 shadow hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'>
					x
				</button>
			</foreignObject>
			<title>{edge.id}</title>
		</g>
	);
};

export default ClickEdge;
