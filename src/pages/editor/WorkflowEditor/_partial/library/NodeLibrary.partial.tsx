import { useMemo, useState } from 'react';
import { CATEGORY_META } from '../../_helper/builder.constants';
import { NODE_CATALOG } from '../../_helper/nodeCatalog.constants';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import NodeCategorySection from './NodeCategorySection.partial';
import NodeLibrarySearch from './NodeLibrarySearch.partial';
import TemplateLibrary from './TemplateLibrary.partial';

const NodeLibrary = () => {
	const { state, dispatch } = useWorkflowEditor();
	const [query, setQuery] = useState('');

	const filtered = useMemo(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return NODE_CATALOG;
		return NODE_CATALOG.filter((node) =>
			[node.label, node.description, node.category, node.key].some((value) =>
				value.toLowerCase().includes(needle),
			),
		);
	}, [query]);

	if (!state.ui.leftPanelOpen) return null;

	return (
		<aside className='flex h-full w-80 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'>
			<div className='flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800'>
				<div>
					<div className='text-sm font-black text-zinc-900 dark:text-white'>Node Library</div>
					<div className='text-xs text-zinc-500'>{NODE_CATALOG.length} building blocks</div>
				</div>
				<button
					type='button'
					onClick={() => dispatch({ type: 'TOGGLE_LEFT_PANEL' })}
					className='rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-500 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white'>
					Hide
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
