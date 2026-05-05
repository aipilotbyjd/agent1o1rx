import { Handle, Position, type NodeProps } from '@xyflow/react';
import { NODE_CATALOG_MAP } from '../../../_helper/nodeCatalog.constants';
import { HUE_TO_CLASSES, PORT_TYPE_COLOR } from '../../../_helper/builder.constants';
import type { TCanvasNode } from '../../../_types/canvas.type';
import type { TNodePort } from '../../../_types/node.type';

const getPortTop = (index: number, total: number) => `${((index + 1) * 100) / (total + 1)}%`;

const PortHandles = ({
	ports,
	type,
	position,
}: {
	ports: TNodePort[];
	type: 'source' | 'target';
	position: Position;
}) => (
	<>
		{ports.map((port, index) => (
			<Handle
				key={port.id}
				id={port.id}
				type={type}
				position={position}
				title={`${port.name}: ${port.type}`}
				style={{
					top: getPortTop(index, ports.length),
					backgroundColor: PORT_TYPE_COLOR[port.type],
					borderColor: 'rgb(39 39 42)',
					height: 10,
					width: 10,
				}}
			/>
		))}
	</>
);

const BaseNode = ({ data, selected }: NodeProps<TCanvasNode>) => {
	const def = NODE_CATALOG_MAP[data.defKey];
	const hue = HUE_TO_CLASSES[def?.color ?? 'zinc'] ?? HUE_TO_CLASSES.zinc;
	const status = data.status ?? 'idle';
	const inputs = def?.inputs ?? [];
	const outputs = def?.outputs ?? [];

	return (
		<div
			className={[
				'relative w-[220px] rounded-lg border p-3 text-left shadow-lg transition',
				'bg-white text-zinc-950 dark:bg-zinc-900 dark:text-zinc-100',
				selected ? 'ring-4 ring-emerald-400/40' : `${hue.border} ${hue.darkBorder}`,
			].join(' ')}>
			<PortHandles ports={inputs} type='target' position={Position.Left} />
			<div className='flex items-start gap-2'>
				<span
					className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-xs font-black ${hue.bg} ${hue.text} ${hue.border} ${hue.darkBg} ${hue.darkText} ${hue.darkBorder}`}>
					{def?.icon ?? '?'}
				</span>
				<div className='min-w-0 flex-1'>
					<div className='truncate text-sm font-bold'>{data.label}</div>
					<div className='line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400'>
						{def?.description}
					</div>
				</div>
			</div>
			<div className='mt-3 flex items-center justify-between gap-2'>
				<div className='flex gap-1'>
					{inputs.slice(0, 3).map((port) => (
						<span
							key={port.id}
							className='h-2.5 w-2.5 rounded-full border border-zinc-800 dark:border-zinc-600'
							style={{ backgroundColor: PORT_TYPE_COLOR[port.type] }}
							title={`${port.name}: ${port.type}`}
						/>
					))}
				</div>
				<span className='rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-zinc-500 uppercase dark:bg-zinc-800 dark:text-zinc-400'>
					{status}
				</span>
				<div className='flex gap-1'>
					{outputs.slice(0, 3).map((port) => (
						<span
							key={port.id}
							className='h-2.5 w-2.5 rounded-full border border-zinc-800 dark:border-zinc-600'
							style={{ backgroundColor: PORT_TYPE_COLOR[port.type] }}
							title={`${port.name}: ${port.type}`}
						/>
					))}
				</div>
			</div>
			<PortHandles ports={outputs} type='source' position={Position.Right} />
		</div>
	);
};

export default BaseNode;
