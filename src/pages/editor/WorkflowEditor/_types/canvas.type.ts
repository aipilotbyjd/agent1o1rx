import type { TCanvasNodeData } from './node.type';

export type TCanvasPosition = {
	x: number;
	y: number;
};

export type TCanvasNode = {
	id: string;
	type: 'base' | 'input' | 'output' | 'note';
	position: TCanvasPosition;
	data: TCanvasNodeData;
};

export type TCanvasEdge = {
	id: string;
	source: string;
	target: string;
	sourceHandle?: string;
	targetHandle?: string;
};

export type TCanvasSnapshot = {
	nodes: TCanvasNode[];
	edges: TCanvasEdge[];
};
