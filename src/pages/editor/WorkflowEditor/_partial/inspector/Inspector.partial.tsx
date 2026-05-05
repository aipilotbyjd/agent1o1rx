import { NODE_CATALOG_MAP } from '../../_helper/nodeCatalog.constants';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import NodeDataPreview from './NodeDataPreview.partial';
import NodeDocs from './NodeDocs.partial';
import NodeInputs from './NodeInputs.partial';
import NodeOutputs from './NodeOutputs.partial';
import NodeSettings from './NodeSettings.partial';

const Inspector = () => {
	const { state, dispatch } = useWorkflowEditor();
	const selected = state.nodes.find((node) => node.id === state.ui.selectedNodeId);
	const def = selected ? NODE_CATALOG_MAP[selected.data.defKey] : null;
	const isOpen = state.ui.rightPanelOpen && Boolean(selected && def);

	if (!isOpen || !selected || !def) return null;

	return (
		<aside
			aria-labelledby='node-inspector-title'
			className='flex h-full min-h-0 w-full overflow-hidden border-l border-zinc-200 bg-white text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100'>
			<div className='flex min-h-0 w-full flex-col'>
				<div className='border-b border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60'>
					<div
						className='flex h-11 w-11 items-center justify-center rounded-lg border text-base font-black'
						style={{
							borderColor: def.color === 'emerald' ? 'rgb(52 211 153)' : undefined,
						}}>
						{def.icon}
					</div>
					<div className='mt-3'>
						<div className='text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400'>
							{def.category}
						</div>
						<div className='mt-1 truncate text-lg font-black text-zinc-950 dark:text-white'>
							{selected.data.label}
						</div>
						<p className='mt-2 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300'>
							{def.description}
						</p>
					</div>
					<div className='mt-4 grid grid-cols-2 gap-2 text-sm'>
						<div className='rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950'>
							<div className='text-xs text-zinc-500'>Inputs</div>
							<div className='mt-1 text-lg font-black'>{def.inputs.length}</div>
						</div>
						<div className='rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950'>
							<div className='text-xs text-zinc-500'>Outputs</div>
							<div className='mt-1 text-lg font-black'>{def.outputs.length}</div>
						</div>
					</div>
					<div className='mt-4 flex gap-2'>
						<button
							type='button'
							onClick={() => dispatch({ type: 'DUPLICATE_SELECTED' })}
							className='flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900'>
							Duplicate
						</button>
						<button
							type='button'
							onClick={() => dispatch({ type: 'DELETE_SELECTED' })}
							className='flex-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-bold text-white hover:bg-rose-600'>
							Delete
						</button>
					</div>
				</div>
				<header className='flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800'>
					<div className='min-w-0'>
						<div
							id='node-inspector-title'
							className='truncate text-sm font-black text-zinc-950 dark:text-white'>
							Configure
						</div>
						<div className='truncate text-xs text-zinc-500'>{def.key}</div>
					</div>
					<button
						type='button'
						onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
						className='rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white'>
						Close
					</button>
				</header>
				<div className='min-h-0 flex-1 overflow-y-auto p-4'>
					<div className='space-y-5'>
						<NodeSettings nodeId={selected.id} />
						<div className='grid gap-4 xl:grid-cols-2'>
							<NodeInputs def={def} />
							<NodeOutputs def={def} />
						</div>
						<NodeDataPreview node={selected} />
						<NodeDocs def={def} />
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Inspector;
