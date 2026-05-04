import type { TCanvasNode } from '../../../_types/canvas.type';

const StickyNote = ({
	node,
	selected,
	onSelect,
	onMove,
}: {
	node: TCanvasNode;
	selected: boolean;
	onSelect: () => void;
	onMove: (x: number, y: number) => void;
}) => {
	const onDragEnd = (event: React.DragEvent<HTMLButtonElement>) => {
		const canvas = event.currentTarget.closest('[data-canvas="true"]');
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		onMove(event.clientX - rect.left - 100, event.clientY - rect.top - 40);
	};

	return (
		<button
			type='button'
			draggable
			onClick={onSelect}
			onDragEnd={onDragEnd}
			className={[
				'absolute w-[200px] rounded-md border p-3 text-left shadow-lg transition',
				'border-amber-300 bg-amber-100 text-amber-950',
				'dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200',
				selected ? 'ring-4 ring-amber-400/40' : '',
			].join(' ')}
			style={{ left: node.position.x, top: node.position.y }}>
			<div className='text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400'>Note</div>
			<div className='mt-1 whitespace-pre-line text-sm'>
				{String(node.data.values.content ?? 'Add notes in the inspector.')}
			</div>
		</button>
	);
};

export default StickyNote;
