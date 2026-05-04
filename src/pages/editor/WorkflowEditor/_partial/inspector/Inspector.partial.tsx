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

	if (!state.ui.rightPanelOpen) return null;

	return (
		<aside className='flex h-full w-96 shrink-0 flex-col border-l border-zinc-800 bg-zinc-950'>
			<div className='flex h-14 items-center justify-between border-b border-zinc-800 px-4'>
				<div>
					<div className='text-sm font-black text-white'>Inspector</div>
					<div className='text-xs text-zinc-500'>
						{selected ? selected.data.label : 'Select a node'}
					</div>
				</div>
				<button
					type='button'
					onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
					className='rounded-md border border-zinc-800 px-2 py-1 text-xs text-zinc-400 hover:text-white'>
					Hide
				</button>
			</div>
			<div className='min-h-0 flex-1 overflow-y-auto p-4'>
				{selected && def ? (
					<div className='space-y-5'>
						<NodeSettings nodeId={selected.id} />
						<NodeInputs def={def} />
						<NodeOutputs def={def} />
						<NodeDataPreview node={selected} />
						<NodeDocs def={def} />
						<div className='flex gap-2'>
							<button
								type='button'
								onClick={() => dispatch({ type: 'DUPLICATE_SELECTED' })}
								className='flex-1 rounded-lg bg-zinc-800 px-3 py-2 text-sm font-bold text-white hover:bg-zinc-700'>
								Duplicate
							</button>
							<button
								type='button'
								onClick={() => dispatch({ type: 'DELETE_SELECTED' })}
								className='flex-1 rounded-lg bg-rose-500 px-3 py-2 text-sm font-bold text-white hover:bg-rose-600'>
								Delete
							</button>
						</div>
					</div>
				) : (
					<div className='rounded-xl border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-500'>
						Select a canvas node to configure parameters, inspect ports, and preview output.
					</div>
				)}
			</div>
		</aside>
	);
};

export default Inspector;
