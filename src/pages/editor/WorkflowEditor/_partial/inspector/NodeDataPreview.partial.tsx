import type { TCanvasNode } from '../../_types/canvas.type';

const NodeDataPreview = ({ node }: { node: TCanvasNode }) => (
	<div>
		<div className='mb-2 text-xs font-black uppercase tracking-widest text-zinc-500'>Data Preview</div>
		<pre className='max-h-40 overflow-auto rounded-lg bg-zinc-950 p-3 text-xs text-zinc-300'>
			{JSON.stringify(node.data.outputPreview ?? node.data.values, null, 2)}
		</pre>
	</div>
);

export default NodeDataPreview;
