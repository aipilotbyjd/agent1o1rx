import type { TNodeDefinition } from '../../_types/node.type';

const NodeDocs = ({ def }: { def: TNodeDefinition }) => (
	<div className='rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950'>
		<div className='text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400'>
			Docs
		</div>
		<p className='mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300'>
			{def.description}
		</p>
		{def.supportsLoopMode && (
			<p className='mt-2 text-sm leading-relaxed text-indigo-600 dark:text-indigo-300'>
				This node is designed for list processing and can be wired after list-producing
				steps.
			</p>
		)}
		{def.requiresCredential && (
			<p className='mt-2 text-sm leading-relaxed text-amber-600 dark:text-amber-300'>
				This node requires a connected credential before production execution.
			</p>
		)}
	</div>
);

export default NodeDocs;
