import type { TCanvasNode } from '../../_types/canvas.type';

const NodeRunOutput = ({ nodes }: { nodes: TCanvasNode[] }) => (
	<div className='grid gap-2 md:grid-cols-3'>
		{nodes
			.filter((node) => node.data.outputPreview !== undefined)
			.slice(-3)
			.map((node) => (
				<div key={node.id} className='rounded-lg bg-zinc-950 p-3'>
					<div className='mb-1 truncate text-xs font-black text-zinc-200'>{node.data.label}</div>
					<pre className='max-h-20 overflow-hidden text-[10px] text-zinc-500'>
						{JSON.stringify(node.data.outputPreview, null, 2)}
					</pre>
				</div>
			))}
	</div>
);

export default NodeRunOutput;
