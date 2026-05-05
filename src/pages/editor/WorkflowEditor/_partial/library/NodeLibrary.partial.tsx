import { useMemo, useState } from 'react';
import { CATEGORY_META } from '../../_helper/builder.constants';
import { useNodeCatalog } from '../../_hooks/useNodeCatalog.hook';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import NodeCategorySection from './NodeCategorySection.partial';
import NodeLibrarySearch from './NodeLibrarySearch.partial';
import TemplateLibrary from './TemplateLibrary.partial';

const NodeLibrary = () => {
	const { state, dispatch } = useWorkflowEditor();
	const [query, setQuery] = useState('');
	const { nodes: catalogNodes, isLoading, refetch } = useNodeCatalog();

	const filtered = useMemo(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return catalogNodes;
		return catalogNodes.filter((node) =>
			[node.label, node.description, node.category, node.key].some((value) =>
				value.toLowerCase().includes(needle),
			),
		);
	}, [query, catalogNodes]);

	if (!state.ui.leftPanelOpen) return null;

	// Show loading skeleton while fetching
	if (isLoading) {
		return (
			<aside className='flex h-full w-full shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'>
				<div className='flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800'>
					<div>
						<div className='text-sm font-black text-zinc-900 dark:text-white'>
							Node Library
						</div>
						<div className='text-xs text-zinc-500'>Loading...</div>
					</div>
				</div>
				<div className='flex-1 space-y-4 p-4'>
					{[...Array(5)].map((_, i) => (
						<div key={i} className='space-y-2'>
							<div className='h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-700' />
							<div className='space-y-1'>
								{[...Array(3)].map((_, j) => (
									<div
										key={j}
										className='h-8 rounded bg-zinc-100 dark:bg-zinc-800'
										style={{ width: `${80 + Math.random() * 40}%` }}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</aside>
		);
	}

	return (
		<aside className='flex h-full w-full shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'>
			<div className='flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800'>
				<div>
					<div className='text-sm font-black text-zinc-900 dark:text-white'>
						Node Library
					</div>
					<div className='text-xs text-zinc-500'>
						{catalogNodes.length} building blocks
					</div>
				</div>
				<button
					type='button'
					onClick={() => refetch()}
					className='rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-500 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white'
					title='Refresh node catalog'>
					🔄
				</button>
			</div>
			<NodeLibrarySearch value={query} onChange={setQuery} />
			<div className='min-h-0 flex-1 overflow-y-auto'>
				{Object.entries(CATEGORY_META)
					.sort(([, a], [, b]) => a.order - b.order)
					.map(([category, meta]) => (
						<NodeCategorySection
							key={category}
							label={meta.label}
							color={meta.color}
							nodes={filtered.filter((node) => node.category === category)}
							onAdd={(defKey) =>
								dispatch({ type: 'ADD_NODE', defKey, position: { x: 120, y: 120 } })
							}
						/>
					))}
			</div>
			<TemplateLibrary />
		</aside>
	);
};

export default NodeLibrary;
