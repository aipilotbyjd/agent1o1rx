import type { TCanvasEdge, TCanvasNode } from '../_types/canvas.type';
import type { TNodeDefinition } from '../_types/node.type';

export type TWorkflowVariable = {
	nodeId: string;
	nodeLabel: string;
	outputId: string;
	token: string;
};

export const collectUpstreamVariables = (
	nodeId: string,
	nodes: TCanvasNode[],
	edges: TCanvasEdge[],
	nodeCatalog: Record<string, TNodeDefinition>,
): TWorkflowVariable[] => {
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const visited = new Set<string>();
	const upstream: TCanvasNode[] = [];

	const visit = (id: string) => {
		edges
			.filter((edge) => edge.target === id)
			.forEach((edge) => {
				if (visited.has(edge.source)) return;
				visited.add(edge.source);
				const node = byId.get(edge.source);
				if (!node) return;
				upstream.push(node);
				visit(edge.source);
			});
	};

	visit(nodeId);

	return upstream.flatMap((node) => {
		const def = nodeCatalog[node.data.defKey];
		return (def?.outputs ?? []).map((output) => ({
			nodeId: node.id,
			nodeLabel: node.data.label,
			outputId: output.id,
			token: `{{${node.data.label}.${output.name}}}`,
		}));
	});
};
