import { Link } from 'react-router';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import { useRunWorkflow } from '../../_hooks/useRunWorkflow.hook';
import DarkModeSwitcherPart from '@/parts/DarkModeSwitcher.part';
import Icon from '@/components/icon/Icon';

const TopbarIconButton = ({
	title,
	icon,
	onClick,
	disabled,
	active,
}: {
	title: string;
	icon: string;
	onClick?: () => void;
	disabled?: boolean;
	active?: boolean;
}) => (
	<button
		type='button'
		title={title}
		aria-label={title}
		onClick={onClick}
		disabled={disabled}
		className={[
			'flex h-9 w-9 items-center justify-center rounded-lg border text-lg transition',
			active
				? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/60 dark:bg-emerald-950/40 dark:text-emerald-300'
				: 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white',
			disabled ? 'cursor-not-allowed opacity-30' : '',
		].join(' ')}>
		<Icon icon={icon} />
	</button>
);

const Topbar = () => {
	const { state, dispatch } = useWorkflowEditor();
	const { runWorkflow, stopRun } = useRunWorkflow();
	const isRunning = state.run.status === 'running';

	return (
		<header className='flex h-14 shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-3 dark:border-zinc-800 dark:bg-zinc-950'>
			<TopbarIconButton
				title='Toggle node library'
				icon='SidebarLeft'
				active={state.ui.leftPanelOpen}
				onClick={() => dispatch({ type: 'TOGGLE_LEFT_PANEL' })}
			/>
			<Link
				to='/'
				title='Home'
				aria-label='Home'
				className='flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white'>
				<Icon icon='Home01' />
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
					<TopbarIconButton
						title='Undo'
						icon='ArrowLeft02'
						onClick={() => dispatch({ type: 'UNDO' })}
						disabled={!state.history.past.length}
					/>
					<TopbarIconButton
						title='Redo'
						icon='ArrowRight02'
						onClick={() => dispatch({ type: 'REDO' })}
						disabled={!state.history.future.length}
					/>
					<TopbarIconButton
						title='Auto-layout'
						icon='FitToScreen'
						onClick={() => dispatch({ type: 'AUTO_LAYOUT' })}
					/>
					<TopbarIconButton
						title='AI builder'
						icon='AiMagic'
						active={state.ui.aiPanelOpen}
						onClick={() => dispatch({ type: 'TOGGLE_AI_PANEL' })}
					/>
					<button
						type='button'
						onClick={isRunning ? stopRun : runWorkflow}
						className={`flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-black text-white ${isRunning ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}>
						<Icon icon={isRunning ? 'Stop' : 'Play'} className='text-base' />
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
