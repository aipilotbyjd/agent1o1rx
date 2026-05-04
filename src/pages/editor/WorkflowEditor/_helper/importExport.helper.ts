import type { TExportedWorkflow, TWorkflowEditorState } from '../_types/workflow-editor.type';

export const exportWorkflow = (state: TWorkflowEditorState): string =>
	JSON.stringify(
		{
			workflow: state.workflow,
			nodes: state.nodes,
			edges: state.edges,
		} satisfies TExportedWorkflow,
		null,
		2,
	);

export const parseWorkflowImport = (raw: string): TExportedWorkflow => {
	const parsed = JSON.parse(raw) as Partial<TExportedWorkflow>;
	if (!parsed.workflow || !Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
		throw new Error('Invalid workflow JSON.');
	}
	return parsed as TExportedWorkflow;
};
