import { NODE_CATALOG_MAP } from '../../../_helper/nodeCatalog.constants';
import { HUE_TO_CLASSES, PORT_TYPE_COLOR } from '../../../_helper/builder.constants';
import type { TCanvasNode } from '../../../_types/canvas.type';

type TBaseNodeProps = {
	node: TCanvasNode;
	selected: boolean;
	onSelect: () => void;
	onMove: (x: number, y: number) => void;
};

const BaseNode = ({ node, selected, onSelect, onMove }: TBaseNodeProps) => {
	const def = NODE_CATALOG_MAP[node.data.defKey];
	const hue = HUE_TO_CLASSES[def?.color ?? 'zinc'] ?? HUE_TO_CLASSES.zinc;
	const status = node.data.status ?? 'idle';

	const onDragEnd = (event: React.DragEvent<HTMLButtonElement>) => {
		const canvas = event.currentTarget.closest('[data-canvas="true"]');
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		onMove(event.clientX - rect.left - 110, event.clientY - rect.top - 36);
	};

	return (
		<button
			type='button'
			draggable
			onClick={onSelect}
			onDragEnd={onDragEnd}
			className={[
				'absolute w-[220px] cursor-grab rounded-lg border bg-white p-3 text-left text-zinc-950 shadow-lg transition active:cursor-grabbing',
				selected ? 'border-zinc-950 ring-4 ring-emerald-400/40' : hue.border,
			].join(' ')}
			style={{ left: node.position.x, top: node.position.y }}>
			<div className='flex items-start gap-2'>
				<span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-xs font-black ${hue.bg} ${hue.text} ${hue.border}`}>
					{def?.icon ?? '?'}
				</span>
				<div className='min-w-0 flex-1'>
					<div className='truncate text-sm font-bold'>{node.data.label}</div>
					<div className='line-clamp-2 text-xs text-zinc-500'>{def?.description}</div>
				</div>
			</div>
			<div className='mt-3 flex items-center justify-between gap-2'>
				<div className='flex gap-1'>
					{(def?.inputs ?? []).slice(0, 3).map((port) => (
						<span
							key={port.id}
							className='h-2.5 w-2.5 rounded-full border border-zinc-800'
							style={{ backgroundColor: PORT_TYPE_COLOR[port.type] }}
							title={`${port.name}: ${port.type}`}
						/>
					))}
				</div>
				<span className='rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-500'>
					{status}
				</span>
				<div className='flex gap-1'>
					{(def?.outputs ?? []).slice(0, 3).map((port) => (
						<span
							key={port.id}
							className='h-2.5 w-2.5 rounded-full border border-zinc-800'
							style={{ backgroundColor: PORT_TYPE_COLOR[port.type] }}
							title={`${port.name}: ${port.type}`}
						/>
					))}
				</div>
			</div>
		</button>
	);
};

export default BaseNode;
