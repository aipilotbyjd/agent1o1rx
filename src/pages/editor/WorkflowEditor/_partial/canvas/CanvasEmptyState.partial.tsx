import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';

const templates = [
	{
		name: 'Scrape and summarize',
		description: 'Ask for a URL, scrape the page, summarize, and return output.',
		nodes: ['input.ask', 'scrape.url', 'ai.chat', 'output.display'],
	},
	{
		name: 'Extract structured data',
		description: 'Collect text, extract JSON, then return the result.',
		nodes: ['input.ask', 'ai.extract', 'output.display'],
	},
	{
		name: 'Classify and notify',
		description: 'Ask AI to classify input and send a Slack message.',
		nodes: ['input.ask', 'ai.chat', 'int.slack', 'output.display'],
	},
];

const CanvasEmptyState = () => {
	const { dispatch } = useWorkflowEditor();

	return (
		<div className='pointer-events-none absolute inset-0 flex items-center justify-center p-6'>
			<div className='pointer-events-auto w-full max-w-3xl'>
				<div className='mb-5 text-center'>
					<div className='text-xl font-black text-zinc-900 dark:text-white'>
						Start with a workflow template
					</div>
					<div className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
						Drag nodes from the library or choose a starter flow.
					</div>
				</div>
				<div className='grid gap-3 md:grid-cols-3'>
					{templates.map((template) => (
						<button
							key={template.name}
							type='button'
							onClick={() =>
								dispatch({
									type: 'ADD_TEMPLATE',
									name: template.name,
									defKeys: template.nodes,
								})
							}
							className='rounded-xl border border-zinc-200 bg-white p-4 text-left text-zinc-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800'>
							<div className='text-sm font-black'>{template.name}</div>
							<div className='mt-1 min-h-10 text-xs text-zinc-500 dark:text-zinc-400'>
								{template.description}
							</div>
							<div className='mt-3 flex gap-1 text-[10px] font-black text-zinc-400 dark:text-zinc-500'>
								{template.nodes.map((node) => (
									<span
										key={node}
										className='rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800'>
										{node.split('.')[0]}
									</span>
								))}
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default CanvasEmptyState;
