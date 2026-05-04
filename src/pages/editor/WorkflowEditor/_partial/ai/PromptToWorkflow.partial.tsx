import { useState } from 'react';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';

const PromptToWorkflow = () => {
	const { dispatch } = useWorkflowEditor();
	const [prompt, setPrompt] = useState('');

	const generate = () => {
		const lower = prompt.toLowerCase();
		const defKeys = lower.includes('slack')
			? ['input.ask', 'ai.chat', 'int.slack', 'output.display']
			: lower.includes('scrape') || lower.includes('website')
				? ['input.ask', 'scrape.url', 'ai.chat', 'output.display']
				: lower.includes('extract')
					? ['input.ask', 'ai.extract', 'output.display']
					: ['input.ask', 'ai.chat', 'output.display'];

		dispatch({
			type: 'ADD_TEMPLATE',
			name: prompt.trim() || 'AI generated workflow',
			defKeys,
		});
	};

	return (
		<div className='space-y-3'>
			<textarea
				value={prompt}
				onChange={(event) => setPrompt(event.target.value)}
				placeholder='Describe the workflow you want to build'
				className='h-32 w-full rounded-xl border bg-white p-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-violet-400'
			/>
			<button
				type='button'
				onClick={generate}
				className='w-full rounded-xl bg-violet-500 px-4 py-2 text-sm font-black text-white hover:bg-violet-600'>
				Generate workflow
			</button>
		</div>
	);
};

export default PromptToWorkflow;
