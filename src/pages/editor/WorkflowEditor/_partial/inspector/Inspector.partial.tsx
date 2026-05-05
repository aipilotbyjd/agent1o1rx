import { useEffect } from 'react';
import { NODE_CATALOG_MAP } from '../../_helper/nodeCatalog.constants';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import NodeDataPreview from './NodeDataPreview.partial';
import NodeDocs from './NodeDocs.partial';
import NodeInputs from './NodeInputs.partial';
import NodeOutputs from './NodeOutputs.partial';
import NodeSettings from './NodeSettings.partial';

const Inspector = () => {
	const { state, dispatch } = useWorkflowEditor();
	const selected = state.nodes.find((node) => node.id === state.ui.selectedNodeId);
	const def = selected ? NODE_CATALOG_MAP[selected.data.defKey] : null;
	const isOpen = state.ui.rightPanelOpen && Boolean(selected && def);

	useEffect(() => {
		if (!isOpen) return undefined;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') dispatch({ type: 'TOGGLE_RIGHT_PANEL' });
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [dispatch, isOpen]);

	if (!isOpen || !selected || !def) return null;

	return (
		<div
			className='fixed inset-0 z-40 flex items-center justify-center bg-zinc-950/55 p-4 backdrop-blur-sm'
			onMouseDown={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}>
			<section
				role='dialog'
				aria-modal='true'
				aria-labelledby='node-inspector-title'
				className='flex h-[min(760px,calc(100vh-32px))] w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-950 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100'
				onMouseDown={(event) => event.stopPropagation()}>
				<div className='hidden w-72 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 p-5 md:flex dark:border-zinc-800 dark:bg-zinc-900/60'>
					<div
						className='flex h-12 w-12 items-center justify-center rounded-xl border text-lg font-black'
						style={{
							borderColor: def.color === 'emerald' ? 'rgb(52 211 153)' : undefined,
						}}>
						{def.icon}
					</div>
					<div className='mt-4'>
						<div className='text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400'>
							{def.category}
						</div>
						<div className='mt-1 text-xl font-black text-zinc-950 dark:text-white'>
							{selected.data.label}
						</div>
						<p className='mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300'>
							{def.description}
						</p>
					</div>
					<div className='mt-6 grid grid-cols-2 gap-2 text-sm'>
						<div className='rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950'>
							<div className='text-xs text-zinc-500'>Inputs</div>
							<div className='mt-1 text-lg font-black'>{def.inputs.length}</div>
						</div>
						<div className='rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950'>
							<div className='text-xs text-zinc-500'>Outputs</div>
							<div className='mt-1 text-lg font-black'>{def.outputs.length}</div>
						</div>
					</div>
					<div className='mt-auto flex gap-2 pt-6'>
						<button
							type='button'
							onClick={() => dispatch({ type: 'DUPLICATE_SELECTED' })}
							className='flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900'>
							Duplicate
						</button>
						<button
							type='button'
							onClick={() => dispatch({ type: 'DELETE_SELECTED' })}
							className='flex-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-bold text-white hover:bg-rose-600'>
							Delete
						</button>
					</div>
				</div>
				<div className='flex min-w-0 flex-1 flex-col'>
					<header className='flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 px-5 dark:border-zinc-800'>
						<div className='min-w-0'>
							<div
								id='node-inspector-title'
								className='truncate text-sm font-black text-zinc-950 dark:text-white'>
								Configure {selected.data.label}
							</div>
							<div className='text-xs text-zinc-500'>{def.key}</div>
						</div>
						<button
							type='button'
							onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
							className='rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white'>
							Close
						</button>
					</header>
					<div className='min-h-0 flex-1 overflow-y-auto p-5'>
						<div className='mx-auto max-w-2xl space-y-6'>
							<div className='md:hidden'>
								<div className='text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400'>
									{def.category}
								</div>
								<p className='mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300'>
									{def.description}
								</p>
							</div>
							<NodeSettings nodeId={selected.id} />
							<div className='grid gap-4 md:grid-cols-2'>
								<NodeInputs def={def} />
								<NodeOutputs def={def} />
							</div>
							<NodeDataPreview node={selected} />
							<NodeDocs def={def} />
							<div className='flex gap-2 md:hidden'>
								<button
									type='button'
									onClick={() => dispatch({ type: 'DUPLICATE_SELECTED' })}
									className='flex-1 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-bold text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700'>
									Duplicate
								</button>
								<button
									type='button'
									onClick={() => dispatch({ type: 'DELETE_SELECTED' })}
									className='flex-1 rounded-lg bg-rose-500 px-3 py-2 text-sm font-bold text-white hover:bg-rose-600'>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Inspector;
