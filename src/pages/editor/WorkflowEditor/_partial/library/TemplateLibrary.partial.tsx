import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';

const TemplateLibrary = () => {
	const { dispatch } = useWorkflowEditor();

	return (
		<div className='border-t border-zinc-800 p-3'>
			<button
				type='button'
				onClick={() =>
					dispatch({
						type: 'ADD_TEMPLATE',
						name: 'New AI workflow',
						defKeys: ['input.ask', 'ai.chat', 'output.display'],
					})
				}
				className='w-full rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-left text-sm font-bold text-emerald-200 transition hover:bg-emerald-400/20'>
				Generate starter flow
			</button>
		</div>
	);
};

export default TemplateLibrary;
