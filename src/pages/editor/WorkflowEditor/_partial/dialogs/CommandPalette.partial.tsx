import { useMemo, useState } from 'react';
import { NODE_CATALOG } from '../../_helper/nodeCatalog.constants';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import { useRunWorkflow } from '../../_hooks/useRunWorkflow.hook';
import Modal from './Modal.partial';

const CommandPalette = () => {
	const { state, dispatch } = useWorkflowEditor();
	const { runWorkflow, stopRun } = useRunWorkflow();
	const [query, setQuery] = useState('');
	const needle = query.trim().toLowerCase();
	const filteredNodes = useMemo(() => {
		if (!needle) return NODE_CATALOG;
		return NODE_CATALOG.filter((node) =>
			[node.label, node.description, node.category, node.key].some((value) =>
				value.toLowerCase().includes(needle),
			),
		);
	}, [needle]);
	const commands = [
		{
			label: state.run.status === 'running' ? 'Stop workflow' : 'Run workflow',
			description: 'Execute the current canvas',
			action: state.run.status === 'running' ? stopRun : runWorkflow,
		},
		{
			label: 'Auto-layout canvas',
			description: 'Reposition nodes into a readable flow',
			action: () => dispatch({ type: 'AUTO_LAYOUT' }),
		},
		{
			label: 'Open AI builder',
			description: 'Generate or improve a workflow',
			action: () => dispatch({ type: 'TOGGLE_AI_PANEL' }),
		},
		{
			label: 'Open import / export',
			description: 'Load or copy workflow JSON',
			action: () => dispatch({ type: 'SET_IMPORT_EXPORT', open: true }),
		},
		{
			label: 'Toggle run console',
			description: 'Show execution logs and node output',
			action: () => dispatch({ type: 'TOGGLE_RUN_PANEL' }),
		},
	].filter((command) =>
		needle
			? [command.label, command.description].some((value) => value.toLowerCase().includes(needle))
			: true,
	);

	if (!state.ui.commandPaletteOpen) return null;

	return (
		<Modal
			title='Command Palette'
			onClose={() => dispatch({ type: 'SET_COMMAND_PALETTE', open: false })}>
			<div className='grid gap-2'>
				<input
					autoFocus
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder='Search commands and nodes'
					className='mb-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 focus:border-emerald-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100'
				/>
				{commands.map((command) => (
					<button
						key={command.label}
						type='button'
						onClick={() => {
							command.action();
							dispatch({ type: 'SET_COMMAND_PALETTE', open: false });
						}}
						className='rounded-lg bg-zinc-100 px-3 py-2 text-left hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'>
						<span className='block text-sm font-bold text-zinc-900 dark:text-zinc-100'>
							{command.label}
						</span>
						<span className='block text-xs text-zinc-500 dark:text-zinc-400'>
							{command.description}
						</span>
					</button>
				))}
				<div className='pt-2 text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400'>
					Add node
				</div>
				<div className='max-h-72 overflow-y-auto'>
					{filteredNodes.map((node) => (
						<button
							key={node.key}
							type='button'
							onClick={() => {
								dispatch({
									type: 'ADD_NODE',
									defKey: node.key,
									position: {
										x: 160 + state.nodes.length * 24,
										y: 140 + state.nodes.length * 18,
									},
								});
								dispatch({ type: 'SET_COMMAND_PALETTE', open: false });
							}}
							className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800'>
							<span className='flex h-7 w-7 items-center justify-center rounded bg-zinc-200 text-[10px] font-black text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200'>
								{node.icon}
							</span>
							<span>
								<span className='block text-sm font-bold text-zinc-900 dark:text-zinc-100'>
									{node.label}
								</span>
								<span className='block text-xs text-zinc-500 dark:text-zinc-400'>
									{node.description}
								</span>
							</span>
						</button>
					))}
				</div>
			</div>
		</Modal>
	);
};

export default CommandPalette;
