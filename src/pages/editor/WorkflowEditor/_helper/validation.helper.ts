import type { TCanvasEdge, TCanvasNode } from '../_types/canvas.type';
import type { TNodeDefinition } from '../_types/node.type';

export type TValidationIssue = {
	id: string;
	nodeId?: string;
	message: string;
	severity: 'error' | 'warning';
};

export const validateWorkflow = (
	nodes: TCanvasNode[],
	edges: TCanvasEdge[],
	nodeCatalog: Record<string, TNodeDefinition>,
): TValidationIssue[] => {
	const issues: TValidationIssue[] = [];
	const nodeIds = new Set(nodes.map((node) => node.id));

	edges.forEach((edge) => {
		if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
			issues.push({
				id: `edge:${edge.id}`,
				message: 'A connection points to a missing node.',
				severity: 'error',
			});
		}
	});

	nodes.forEach((node) => {
		const def = nodeCatalog[node.data.defKey];
		if (!def) {
			issues.push({
				id: `node:${node.id}:definition`,
				nodeId: node.id,
				message: 'Node definition is missing.',
				severity: 'error',
			});
			return;
		}
		def.fields
			.filter((field) => field.required)
			.forEach((field) => {
				const value = node.data.values[field.key];
				if (value === undefined || value === null || value === '') {
					issues.push({
						id: `node:${node.id}:${field.key}`,
						nodeId: node.id,
						message: `${def.label} requires ${field.label}.`,
						severity: 'warning',
					});
				}
			});
	});

	if (!nodes.some((node) => nodeCatalog[node.data.defKey]?.category === 'output')) {
		issues.push({
			id: 'workflow:output',
			message: 'Add an Output node so the workflow returns a result.',
			severity: 'warning',
		});
	}

	return issues;
};
