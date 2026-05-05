import { Link } from 'react-router';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import { useRunWorkflow } from '../../_hooks/useRunWorkflow.hook';
import DarkModeSwitcherPart from '@/parts/DarkModeSwitcher.part';

const Topbar = () => {
	const { state, dispatch } = useWorkflowEditor();
	const { runWorkflow, stopRun } = useRunWorkflow();
	const isRunning = state.run.status === 'running';

	return (
		<header className='flex h-14 shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-3 dark:border-zinc-800 dark:bg-zinc-950'>
			<button
				type='button'
				onClick={() => dispatch({ type: 'TOGGLE_LEFT_PANEL' })}
				className='rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white'>
				Library
			</button>
			<Link
				to='/'
				className='rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white'>
				Home
			</Link>
			<input
				value={state.workflow.name}
				onChange={(event) =>
					dispatch({
						type: 'SET_WORKFLOW_META',
						patch: { name: event.target.value, savingState: 'dirty' },
					})
				}
				className='max-w-md min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm font-black text-zinc-900 outline-none hover:border-zinc-200 focus:border-emerald-400 dark:text-white dark:hover:border-zinc-800'
			/>
			<div className='ml-auto flex items-center gap-4'>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						onClick={() => dispatch({ type: 'UNDO' })}
						disabled={!state.history.past.length}
						className='rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 disabled:opacity-30 dark:border-zinc-800 dark:text-zinc-300'>
						Undo
					</button>
					<button
						type='button'
						onClick={() => dispatch({ type: 'REDO' })}
						disabled={!state.history.future.length}
						className='rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 disabled:opacity-30 dark:border-zinc-800 dark:text-zinc-300'>
						Redo
					</button>
					<button
						type='button'
						onClick={() => dispatch({ type: 'AUTO_LAYOUT' })}
						className='rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white'>
						Layout
					</button>
					<button
						type='button'
						onClick={() => dispatch({ type: 'TOGGLE_AI_PANEL' })}
						className='rounded-lg border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-xs font-bold text-violet-600 dark:text-violet-100'>
						AI
					</button>
					<button
						type='button'
						onClick={isRunning ? stopRun : runWorkflow}
						className={`rounded-lg px-4 py-2 text-xs font-black text-white ${isRunning ? 'bg-rose-500' : 'bg-emerald-500'}`}>
						{isRunning ? 'Stop' : 'Run'}
					</button>
				</div>

				<div className='h-8 w-px bg-zinc-200 dark:bg-zinc-800' />

				<div className='w-40'>
					<DarkModeSwitcherPart />
				</div>
			</div>
		</header>
	);
};

export default Topbar;
