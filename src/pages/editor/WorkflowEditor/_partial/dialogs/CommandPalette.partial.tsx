import { NODE_CATALOG } from '../../_helper/nodeCatalog.constants';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import Modal from './Modal.partial';

const CommandPalette = () => {
	const { state, dispatch } = useWorkflowEditor();
	if (!state.ui.commandPaletteOpen) return null;

	return (
		<Modal
			title='Command Palette'
			onClose={() => dispatch({ type: 'SET_COMMAND_PALETTE', open: false })}>
			<div className='grid gap-2'>
				<button
					type='button'
					onClick={() => {
						dispatch({ type: 'AUTO_LAYOUT' });
						dispatch({ type: 'SET_COMMAND_PALETTE', open: false });
					}}
					className='rounded-lg bg-zinc-100 px-3 py-2 text-left text-sm font-bold text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'>
					Auto-layout canvas
				</button>
				<button
					type='button'
					onClick={() => {
						dispatch({ type: 'TOGGLE_AI_PANEL' });
						dispatch({ type: 'SET_COMMAND_PALETTE', open: false });
					}}
					className='rounded-lg bg-zinc-100 px-3 py-2 text-left text-sm font-bold text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'>
					Open AI builder
				</button>
				<div className='pt-2 text-xs font-black tracking-widest text-zinc-500 uppercase dark:text-zinc-400'>
					Add node
				</div>
				<div className='max-h-72 overflow-y-auto'>
					{NODE_CATALOG.map((node) => (
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
