import { useEffect } from 'react';
import { useWorkflowEditor } from '../_context/WorkflowEditorProvider.context';

const isTypingTarget = (target: EventTarget | null) => {
	if (!(target instanceof HTMLElement)) return false;
	return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
};

export const useEditorHotkeys = () => {
	const { dispatch } = useWorkflowEditor();

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const mod = event.metaKey || event.ctrlKey;

			if (mod && event.key.toLowerCase() === 'z' && !event.shiftKey) {
				event.preventDefault();
				dispatch({ type: 'UNDO' });
				return;
			}
			if (
				(mod && event.shiftKey && event.key.toLowerCase() === 'z') ||
				(mod && event.key.toLowerCase() === 'y')
			) {
				event.preventDefault();
				dispatch({ type: 'REDO' });
				return;
			}
			if (mod && event.key.toLowerCase() === 'd') {
				event.preventDefault();
				dispatch({ type: 'DUPLICATE_SELECTED' });
				return;
			}
			if (mod && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				dispatch({ type: 'TOGGLE_AI_PANEL' });
				return;
			}
			if (mod && event.key.toLowerCase() === 'p') {
				event.preventDefault();
				dispatch({ type: 'SET_COMMAND_PALETTE', open: true });
				return;
			}
			if (!isTypingTarget(event.target) && event.key.toLowerCase() === 'l') {
				event.preventDefault();
				dispatch({ type: 'AUTO_LAYOUT' });
				return;
			}
			if (!isTypingTarget(event.target) && ['Backspace', 'Delete'].includes(event.key)) {
				event.preventDefault();
				dispatch({ type: 'DELETE_SELECTED' });
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [dispatch]);
};
