import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import NodeRunOutput from './NodeRunOutput.partial';
import RunConsole from './RunConsole.partial';
import RunTimeline from './RunTimeline.partial';

const RunPanel = () => {
	const { state, dispatch } = useWorkflowEditor();
	if (!state.ui.runPanelOpen) return null;

	return (
		<section className='shrink-0 border-t border-zinc-800 bg-zinc-900 p-4'>
			<div className='mb-3 flex items-center justify-between'>
				<div>
					<div className='text-sm font-black text-white'>Run Output</div>
					<RunTimeline run={state.run} />
				</div>
				<button
					type='button'
					onClick={() => dispatch({ type: 'TOGGLE_RUN_PANEL' })}
					className='rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:text-white'>
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
