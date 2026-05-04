const CanvasStats = ({ nodes, edges }: { nodes: number; edges: number }) => (
	<div className='absolute left-4 top-4 flex gap-2'>
		<span className='rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-xs font-bold text-white backdrop-blur'>
			{nodes} nodes
		</span>
		<span className='rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-xs font-bold text-white backdrop-blur'>
			{edges} connections
		</span>
	</div>
);

export default CanvasStats;
