import { HUE_TO_CLASSES } from '../../_helper/builder.constants';
import type { TNodeDefinition } from '../../_types/node.type';

const NodeCategorySection = ({
	label,
	color,
	nodes,
	onAdd,
}: {
	label: string;
	color: string;
	nodes: TNodeDefinition[];
	onAdd: (defKey: string) => void;
}) => {
	if (!nodes.length) return null;
	const hue = HUE_TO_CLASSES[color] ?? HUE_TO_CLASSES.zinc;

	return (
		<div className='px-2 py-2'>
			<div className='mb-1 flex items-center justify-between px-1'>
				<span className='text-[11px] font-black uppercase tracking-widest text-zinc-500'>
					{label}
				</span>
				<span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${hue.bg} ${hue.text}`}>
					{nodes.length}
				</span>
			</div>
			<div className='space-y-1'>
				{nodes.map((node) => (
					<button
						key={node.key}
						type='button'
						draggable
						onDragStart={(event) => {
							event.dataTransfer.setData('application/x-node-def', node.key);
							event.dataTransfer.effectAllowed = 'move';
						}}
						onClick={() => onAdd(node.key)}
						className='group flex w-full cursor-grab items-center gap-2 rounded-lg border border-transparent p-2 text-left transition hover:border-zinc-700 hover:bg-zinc-900 active:cursor-grabbing'>
						<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-[10px] font-black ${hue.bg} ${hue.text} ${hue.border}`}>
							{node.icon}
						</span>
						<span className='min-w-0 flex-1'>
							<span className='block truncate text-sm font-bold text-zinc-100'>
								{node.label}
							</span>
							<span className='line-clamp-1 text-xs text-zinc-500'>{node.description}</span>
						</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default NodeCategorySection;
