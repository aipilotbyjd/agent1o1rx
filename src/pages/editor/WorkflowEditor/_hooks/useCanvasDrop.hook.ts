import { useCallback, useState } from 'react';
import { useWorkflowEditor } from '../_context/WorkflowEditorProvider.context';
import type { TCanvasPosition } from '../_types/canvas.type';

export const useCanvasDrop = () => {
	const { dispatch } = useWorkflowEditor();
	const [isDraggingNode, setIsDraggingNode] = useState(false);

	const getCanvasPosition = useCallback((event: React.DragEvent<HTMLElement>): TCanvasPosition => {
		const rect = event.currentTarget.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		};
	}, []);

	const onDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
		setIsDraggingNode(true);
	}, []);

	const onDragLeave = useCallback((event: React.DragEvent<HTMLElement>) => {
		if (event.currentTarget === event.target) setIsDraggingNode(false);
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent<HTMLElement>) => {
			event.preventDefault();
			setIsDraggingNode(false);
			const defKey = event.dataTransfer.getData('application/x-node-def');
			if (!defKey) return;
			dispatch({ type: 'ADD_NODE', defKey, position: getCanvasPosition(event) });
		},
		[dispatch, getCanvasPosition],
	);

	return { isDraggingNode, onDragOver, onDragLeave, onDrop };
};
