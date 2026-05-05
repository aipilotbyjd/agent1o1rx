import { PORT_TYPE_COLOR } from '../../_helper/builder.constants';
import type { TNodeDefinition } from '../../_types/node.type';

const NodeOutputs = ({ def }: { def: TNodeDefinition }) => (
	<div>
		<div className='mb-2 text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400'>
			Outputs
		</div>
		<div className='space-y-1'>
			{def.outputs.length ? (
				def.outputs.map((output) => (
					<div
						key={output.id}
						className='flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100'>
						<span>{output.name}</span>
						<span className='flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400'>
							<span
								className='h-2 w-2 rounded-full'
								style={{ backgroundColor: PORT_TYPE_COLOR[output.type] }}
							/>
							{output.type}
						</span>
					</div>
				))
			) : (
				<div className='rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400'>
					No outputs
				</div>
			)}
		</div>
	</div>
);

export default NodeOutputs;
