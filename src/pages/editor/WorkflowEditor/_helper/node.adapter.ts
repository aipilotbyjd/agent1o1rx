import type { INodeType, INodeParameter } from '@/types/nodeType.type';
import type { TNodeDefinition, TNodeField, TNodePort, TNodeCategory } from '../_types/node.type';
import React, { ReactNode } from 'react';
import * as SvgIcons from '@/components/icon/svg-icons';
import * as Huge from '@/components/icon/huge';

// Map API parameter types to frontend field kinds
const PARAMETER_TYPE_MAP: Record<string, TNodeField['kind']> = {
	string: 'text',
	number: 'number',
	boolean: 'toggle',
	options: 'select',
	select: 'select',
	code: 'code',
	json: 'code',
	credential: 'credential',
	expression: 'text',
};

// Map API categories to frontend categories
const CATEGORY_MAP: Record<string, TNodeCategory> = {
	ai: 'ai',
	input: 'input',
	output: 'output',
	data: 'data',
	logic: 'logic',
	loop: 'loop',
	scrape: 'scrape',
	extract: 'extract',
	integration: 'integration',
	note: 'note',
	trigger: 'input',
	action: 'data',
};

// Map port types from API to frontend
const PORT_TYPE_MAP: Record<string, TNodePort['type']> = {
	string: 'string',
	number: 'number',
	boolean: 'boolean',
	list: 'list',
	file: 'file',
	json: 'json',
	any: 'any',
};

/**
 * Map API icon name to React component
 */
const mapIcon = (iconName?: string): ReactNode => {
	if (!iconName) return null;

	const IconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);

	// Try svg-icons first
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (SvgIcons[IconName]) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return React.createElement(SvgIcons[IconName]);
	}

	// Try huge-icons
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (Huge[IconName]) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return React.createElement(Huge[IconName]);
	}

	return null;
};

/**
 * Map API node type to frontend node definition
 */
export const adaptNodeTypeToDefinition = (apiNode: INodeType): TNodeDefinition => {
	return {
		key: apiNode.type,
		category: mapCategory(apiNode.category),
		label: apiNode.name,
		description: apiNode.description,
		icon: mapIcon(apiNode.icon),
		color: mapColor(apiNode.color),
		inputs: mapPorts(apiNode.inputs || []),
		outputs: mapOutputs(apiNode.outputs || []),
		fields: mapFields(apiNode.parameters || []),
		supportsLoopMode: apiNode.type === 'loop.each',
		requiresCredential: !!(apiNode.credentials && apiNode.credentials.length > 0),
	};
};

/**
 * Map category from various formats to frontend TNodeCategory
 */
export const mapCategory = (category: unknown): TNodeCategory => {
	if (!category) return 'data';

	// Handle array - take first element
	if (Array.isArray(category)) {
		return mapCategory(category[0]);
	}

	// Handle object with name property
	if (typeof category === 'object' && category !== null) {
		return mapCategory((category as { name?: string }).name);
	}

	// Handle string
	if (typeof category !== 'string') return 'data';

	const lowerCategory = category.toLowerCase();

	// Direct match
	if (Object.keys(CATEGORY_MAP).includes(lowerCategory)) {
		return CATEGORY_MAP[lowerCategory] || 'data';
	}

	// Check for node type prefix (e.g., "ai.agent" -> "ai")
	if (category.includes('.')) {
		const prefix = category.split('.')[0];
		return CATEGORY_MAP[prefix] || 'data';
	}

	return 'data';
};

/**
 * Map color from API format to frontend color name
 */
const mapColor = (color?: string): string => {
	if (!color) return 'sky';

	const COLOR_MAP: Record<string, string> = {
		sky: 'sky',
		violet: 'violet',
		emerald: 'emerald',
		fuchsia: 'fuchsia',
		amber: 'amber',
		rose: 'rose',
		indigo: 'indigo',
		cyan: 'cyan',
		green: 'green',
		zinc: 'zinc',
	};

	return COLOR_MAP[color.toLowerCase()] || color;
};

/**
 * Map input/output definitions to frontend ports
 */
const mapPorts = (ports: { name: string; type: string }[]): TNodePort[] => {
	if (!ports || !Array.isArray(ports)) return [];

	return ports.map((port) => ({
		id: port.name,
		name: port.name,
		type: PORT_TYPE_MAP[port.type] || 'any',
	}));
};

/**
 * Map outputs (same structure as inputs but named differently in API)
 */
const mapOutputs = (outputs: { name: string; type: string }[]): TNodePort[] => {
	return mapPorts(outputs);
};

/**
 * Map parameters to frontend fields
 */
const mapFields = (parameters: INodeParameter[]): TNodeField[] => {
	if (!parameters || !Array.isArray(parameters)) return [];

	return parameters.map((param) => ({
		key: param.name,
		label: param.display_name || param.label || param.name,
		kind: PARAMETER_TYPE_MAP[param.type] || 'text',
		required: param.required || false,
		default: param.default,
		help: param.description,
		placeholder: param.placeholder,
		options: param.options?.map((opt) => ({
			label: opt.name,
			value: opt.value,
		})),
		supportsVariables: true,
	}));
};
