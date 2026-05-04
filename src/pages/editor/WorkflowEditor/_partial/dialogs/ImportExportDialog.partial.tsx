import { useMemo, useState } from 'react';
import { exportWorkflow, parseWorkflowImport } from '../../_helper/importExport.helper';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import Modal from './Modal.partial';

const ImportExportDialog = () => {
	const { state, dispatch } = useWorkflowEditor();
	const exported = useMemo(() => exportWorkflow(state), [state]);
	const [raw, setRaw] = useState(exported);
	const [error, setError] = useState<string | null>(null);

	if (!state.ui.importExportOpen) return null;

	return (
		<Modal title='Import / Export Workflow' onClose={() => dispatch({ type: 'SET_IMPORT_EXPORT', open: false })}>
			<div className='space-y-3'>
				<textarea
					value={raw}
					onChange={(event) => setRaw(event.target.value)}
					className='h-80 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-200 outline-none focus:border-emerald-400'
				/>
				{error && <div className='rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-200'>{error}</div>}
				<div className='flex justify-end gap-2'>
					<button
						type='button'
						onClick={() => {
							setRaw(exported);
							setError(null);
						}}
						className='rounded-lg border border-zinc-800 px-3 py-2 text-sm font-bold text-zinc-300 hover:text-white'>
						Reset
					</button>
					<button
						type='button'
						onClick={() => {
							try {
								dispatch({ type: 'LOAD_WORKFLOW', workflow: parseWorkflowImport(raw) });
							} catch (err) {
								setError(err instanceof Error ? err.message : 'Invalid workflow JSON.');
							}
						}}
						className='rounded-lg bg-emerald-500 px-3 py-2 text-sm font-black text-white hover:bg-emerald-600'>
						Import
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ImportExportDialog;
