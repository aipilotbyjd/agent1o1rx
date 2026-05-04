import { validateWorkflow } from '../../_helper/validation.helper';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';

const StatusBar = () => {
	const { state } = useWorkflowEditor();
	const issues = validateWorkflow(state.nodes, state.edges);

	return (
		<footer className='flex h-8 shrink-0 items-center justify-between border-t border-zinc-800 bg-zinc-950 px-3 text-xs text-zinc-500'>
			<span>{state.workflow.savingState}</span>
			<span>{issues.length ? `${issues.length} validation issue(s)` : 'Workflow is valid'}</span>
			<span>{state.workflow.folder}</span>
		</footer>
	);
};

export default StatusBar;
