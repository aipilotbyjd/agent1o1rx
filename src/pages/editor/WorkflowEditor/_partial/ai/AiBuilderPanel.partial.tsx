import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import AiSuggestions from './AiSuggestions.partial';
import PromptToWorkflow from './PromptToWorkflow.partial';

const AiBuilderPanel = () => {
	const { state, dispatch } = useWorkflowEditor();
	if (!state.ui.aiPanelOpen) return null;

	return (
		<aside className='fixed right-4 top-20 z-40 flex w-[380px] flex-col gap-4 rounded-2xl border border-violet-400/20 bg-zinc-950 p-4 text-zinc-100 shadow-2xl'>
			<div className='flex items-center justify-between'>
				<div>
					<div className='text-sm font-black text-white'>AI Builder</div>
					<div className='text-xs text-zinc-500'>Prompt to single workflow</div>
				</div>
				<button
					type='button'
					onClick={() => dispatch({ type: 'TOGGLE_AI_PANEL' })}
					className='rounded-lg border border-zinc-800 px-2 py-1 text-xs text-zinc-400 hover:text-white'>
					Close
				</button>
			</div>
			<PromptToWorkflow />
			<AiSuggestions />
		</aside>
	);
};

export default AiBuilderPanel;
