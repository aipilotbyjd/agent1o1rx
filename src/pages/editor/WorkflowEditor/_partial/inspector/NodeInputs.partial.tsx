import { PORT_TYPE_COLOR } from '../../_helper/builder.constants';
import type { TNodeDefinition } from '../../_types/node.type';

const NodeInputs = ({ def }: { def: TNodeDefinition }) => (
	<div>
		<div className='mb-2 text-xs font-black uppercase tracking-widest text-zinc-500'>Inputs</div>
		<div className='space-y-1'>
			{def.inputs.length ? (
				def.inputs.map((input) => (
					<div key={input.id} className='flex items-center justify-between rounded-lg bg-zinc-900 px-3 py-2 text-sm'>
						<span>{input.name}</span>
						<span className='flex items-center gap-1 text-xs text-zinc-400'>
							<span
								className='h-2 w-2 rounded-full'
								style={{ backgroundColor: PORT_TYPE_COLOR[input.type] }}
							/>
							{input.type}
						</span>
					</div>
				))
			) : (
				<div className='rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-500'>No inputs</div>
			)}
		</div>
	</div>
);

export default NodeInputs;
