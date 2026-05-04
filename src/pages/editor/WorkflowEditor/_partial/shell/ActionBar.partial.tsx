import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';

const ActionBar = () => {
	const { dispatch } = useWorkflowEditor();

	return (
		<div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-xl border border-white/10 bg-zinc-950/90 p-2 shadow-xl backdrop-blur'>
			<button
				type='button'
				onClick={() => dispatch({ type: 'SET_COMMAND_PALETTE', open: true })}
				className='rounded-lg px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white'>
				Command
			</button>
			<button
				type='button'
				onClick={() => dispatch({ type: 'SET_IMPORT_EXPORT', open: true })}
				className='rounded-lg px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white'>
				Import / Export
			</button>
			<button
				type='button'
				onClick={() => dispatch({ type: 'TOGGLE_RUN_PANEL' })}
				className='rounded-lg px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white'>
				Console
			</button>
		</div>
	);
};

export default ActionBar;
