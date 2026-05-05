import type { TCanvasEdge, TCanvasNode, TCanvasSnapshot } from './canvas.type';
import type { TRunState } from './run.type';

export type TWorkflowMeta = {
	id: string;
	name: string;
	folder: string;
	updatedAt: number;
	savingState: 'saved' | 'saving' | 'dirty' | 'error';
};

export type TEditorUiState = {
	leftPanelOpen: boolean;
	rightPanelOpen: boolean;
	runPanelOpen: boolean;
	aiPanelOpen: boolean;
	miniMapOpen: boolean;
	commandPaletteOpen: boolean;
	importExportOpen: boolean;
	selectedNodeId: string | null;
};

export type THistoryState = {
	past: TCanvasSnapshot[];
	future: TCanvasSnapshot[];
};

export type TWorkflowEditorState = {
	workflow: TWorkflowMeta;
	nodes: TCanvasNode[];
	edges: TCanvasEdge[];
	run: TRunState;
	ui: TEditorUiState;
	history: THistoryState;
};

export type TExportedWorkflow = {
	workflow: TWorkflowMeta;
	nodes: TCanvasNode[];
	edges: TCanvasEdge[];
};
