import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import NodeRunOutput from './NodeRunOutput.partial';
import RunConsole from './RunConsole.partial';
import RunTimeline from './RunTimeline.partial';

const RunPanel = () => {
	const { state, dispatch } = useWorkflowEditor();
	if (!state.ui.runPanelOpen) return null;

	return (
		<section className='h-full overflow-y-auto border-t border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950'>
			<div className='mb-3 flex items-center justify-between'>
				<div>
					<div className='text-sm font-black text-zinc-900 dark:text-white'>
						Run Output
					</div>
					<RunTimeline run={state.run} />
				</div>
				<button
					type='button'
					onClick={() => dispatch({ type: 'TOGGLE_RUN_PANEL' })}
					className='rounded-md border border-zinc-300 px-2 py-1 text-xs text-zinc-600 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white'>
					Close
				</button>
			</div>
			<div className='grid gap-3 lg:grid-cols-[1fr_360px]'>
				<RunConsole logs={state.run.logs} />
				<NodeRunOutput nodes={state.nodes} />
			</div>
		</section>
	);
};

export default RunPanel;
