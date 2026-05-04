export const HISTORY_LIMIT = 40;
export const AUTOSAVE_DEBOUNCE_MS = 700;

export const CATEGORY_META = {
	input: { label: 'Inputs', order: 1, color: 'sky' },
	ai: { label: 'AI', order: 2, color: 'violet' },
	scrape: { label: 'Scrape', order: 3, color: 'emerald' },
	extract: { label: 'Extract', order: 4, color: 'fuchsia' },
	data: { label: 'Data', order: 5, color: 'amber' },
	logic: { label: 'Logic', order: 6, color: 'rose' },
	loop: { label: 'Loop', order: 7, color: 'indigo' },
	integration: { label: 'Integrations', order: 8, color: 'cyan' },
	output: { label: 'Outputs', order: 9, color: 'green' },
	note: { label: 'Notes', order: 10, color: 'zinc' },
} as const;

export const HUE_TO_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
	sky: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300' },
	violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-300' },
	emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
	fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-300' },
	amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },
	rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300' },
	indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-300' },
	cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-300' },
	green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300' },
	zinc: { bg: 'bg-zinc-50', text: 'text-zinc-700', border: 'border-zinc-300' },
};

export const PORT_TYPE_COLOR: Record<string, string> = {
	string: '#0ea5e9',
	number: '#f59e0b',
	boolean: '#f43f5e',
	list: '#8b5cf6',
	file: '#10b981',
	json: '#d946ef',
	any: '#71717a',
};
