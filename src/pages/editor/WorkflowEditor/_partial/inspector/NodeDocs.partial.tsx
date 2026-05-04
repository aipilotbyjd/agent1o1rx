import type { TNodeDefinition } from '../../_types/node.type';

const NodeDocs = ({ def }: { def: TNodeDefinition }) => (
	<div className='rounded-xl border border-zinc-800 bg-zinc-950 p-3'>
		<div className='text-xs font-black uppercase tracking-widest text-zinc-500'>Docs</div>
		<p className='mt-2 text-sm leading-relaxed text-zinc-300'>{def.description}</p>
		{def.supportsLoopMode && (
			<p className='mt-2 text-sm leading-relaxed text-indigo-200'>
				This node is designed for list processing and can be wired after list-producing steps.
			</p>
		)}
		{def.requiresCredential && (
			<p className='mt-2 text-sm leading-relaxed text-amber-200'>
				This node requires a connected credential before production execution.
			</p>
		)}
	</div>
);

export default NodeDocs;
