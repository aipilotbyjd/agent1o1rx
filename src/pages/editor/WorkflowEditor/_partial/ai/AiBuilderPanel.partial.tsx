import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import AiSuggestions from './AiSuggestions.partial';
import PromptToWorkflow from './PromptToWorkflow.partial';

const AiBuilderPanel = () => {
	const { state, dispatch } = useWorkflowEditor();
	if (!state.ui.aiPanelOpen) return null;

	return (
		<aside className='fixed top-20 right-4 z-40 flex w-[380px] flex-col gap-4 rounded-2xl border border-violet-300 bg-white p-4 text-zinc-900 shadow-2xl dark:border-violet-700/50 dark:bg-zinc-950 dark:text-zinc-100'>
			<div className='flex items-center justify-between'>
				<div>
					<div className='text-sm font-black text-zinc-900 dark:text-white'>
						AI Builder
					</div>
					<div className='text-xs text-zinc-500 dark:text-zinc-400'>
						Prompt to single workflow
					</div>
				</div>
				<button
					type='button'
					onClick={() => dispatch({ type: 'TOGGLE_AI_PANEL' })}
					className='rounded-lg border border-zinc-300 px-2 py-1 text-xs text-zinc-600 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white'>
					Close
				</button>
			</div>
			<PromptToWorkflow />
			<AiSuggestions />
		</aside>
	);
};

export default AiBuilderPanel;
