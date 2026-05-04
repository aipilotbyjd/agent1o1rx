const CanvasStats = ({ nodes, edges }: { nodes: number; edges: number }) => (
	<div className='absolute left-4 top-4 flex gap-2'>
		<span className='rounded-full border border-zinc-300 bg-white/90 px-3 py-1 text-xs font-bold text-zinc-800 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200'>
			{nodes} nodes
		</span>
		<span className='rounded-full border border-zinc-300 bg-white/90 px-3 py-1 text-xs font-bold text-zinc-800 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200'>
			{edges} connections
		</span>
	</div>
);

export default CanvasStats;
