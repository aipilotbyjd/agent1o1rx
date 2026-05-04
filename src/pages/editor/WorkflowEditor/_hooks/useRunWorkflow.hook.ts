import { useRef } from 'react';
import { createId } from '../_context/WorkflowEditorStore.context';
import { useWorkflowEditor } from '../_context/WorkflowEditorProvider.context';
import { createMockNodeOutput, getRunOrder } from '../_helper/runGraph.helper';

export const useRunWorkflow = () => {
	const { state, dispatch } = useWorkflowEditor();
	const stopped = useRef(false);

	const runWorkflow = async () => {
		if (state.run.status === 'running') return;
		stopped.current = false;
		dispatch({ type: 'RUN_START', id: createId('run') });

		const order = getRunOrder(state.nodes, state.edges);
		for (const node of order) {
			if (stopped.current) break;
			const started = performance.now();
			dispatch({ type: 'RUN_CURRENT_NODE', nodeId: node.id });
			dispatch({ type: 'SET_NODE_STATUS', id: node.id, status: 'running' });
			dispatch({ type: 'APPEND_LOG', log: { nodeId: node.id, level: 'info', message: `${node.data.label} started` } });
			await new Promise((resolve) => {
				window.setTimeout(resolve, 300);
			});
			const durationMs = Math.round(performance.now() - started);
			dispatch({
				type: 'SET_NODE_STATUS',
				id: node.id,
				status: 'success',
				durationMs,
				outputPreview: createMockNodeOutput(node),
			});
			dispatch({ type: 'APPEND_LOG', log: { nodeId: node.id, level: 'info', message: `${node.data.label} finished in ${durationMs}ms` } });
		}

		dispatch({ type: 'RUN_FINISH', status: stopped.current ? 'stopped' : 'success' });
	};

	const stopRun = () => {
		stopped.current = true;
		dispatch({ type: 'RUN_FINISH', status: 'stopped' });
	};

	return { runWorkflow, stopRun };
};
