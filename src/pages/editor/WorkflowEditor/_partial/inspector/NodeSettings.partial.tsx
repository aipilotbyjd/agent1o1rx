import { useMemo } from 'react';
import { NODE_CATALOG_MAP } from '../../_helper/nodeCatalog.constants';
import { collectUpstreamVariables } from '../../_helper/variables.helper';
import { useWorkflowEditor } from '../../_context/WorkflowEditorProvider.context';
import type { TNodeField } from '../../_types/node.type';

const inputClass =
	'w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-emerald-400';

const FieldInput = ({
	field,
	value,
	onChange,
}: {
	field: TNodeField;
	value: unknown;
	onChange: (value: unknown) => void;
}) => {
	if (field.kind === 'toggle') {
		const active = Boolean(value);
		return (
			<button
				type='button'
				role='switch'
				aria-checked={active}
				onClick={() => onChange(!active)}
				className={`h-7 w-12 rounded-full border p-1 transition ${active ? 'border-emerald-400 bg-emerald-400' : 'border-zinc-700 bg-zinc-900'}`}>
				<span className={`block h-4 w-4 rounded-full bg-white transition ${active ? 'translate-x-5' : ''}`} />
			</button>
		);
	}

	if (field.kind === 'select' || field.kind === 'model' || field.kind === 'credential') {
		return (
			<select
				value={String(value ?? '')}
				onChange={(event) => onChange(event.target.value)}
				className={inputClass}>
				<option value=''>Select</option>
				{field.options?.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		);
	}

	if (field.kind === 'number') {
		return (
			<input
				type='number'
				value={Number(value ?? 0)}
				onChange={(event) => onChange(Number(event.target.value))}
				className={inputClass}
			/>
		);
	}

	if (field.kind === 'longtext' || field.kind === 'code') {
		return (
			<textarea
				rows={field.rows ?? 4}
				value={String(value ?? '')}
				onChange={(event) => onChange(event.target.value)}
				placeholder={field.placeholder}
				className={`${inputClass} font-mono text-xs`}
			/>
		);
	}

	return (
		<input
			value={String(value ?? '')}
			onChange={(event) => onChange(event.target.value)}
			placeholder={field.placeholder}
			className={inputClass}
		/>
	);
};

const NodeSettings = ({ nodeId }: { nodeId: string }) => {
	const { state, dispatch } = useWorkflowEditor();
	const node = state.nodes.find((item) => item.id === nodeId);
	const def = node ? NODE_CATALOG_MAP[node.data.defKey] : null;
	const variables = useMemo(
		() => (node ? collectUpstreamVariables(node.id, state.nodes, state.edges) : []),
		[node, state.edges, state.nodes],
	);

	if (!node || !def) return null;

	return (
		<div className='space-y-4'>
			<div>
				<label className='mb-1 block text-xs font-black uppercase tracking-widest text-zinc-500'>
					Node name
				</label>
				<input
					value={node.data.label}
					onChange={(event) =>
						dispatch({ type: 'RENAME_NODE', id: node.id, label: event.target.value })
					}
					className={inputClass}
				/>
			</div>
			{def.fields.map((field) => (
				<div key={field.key}>
					<label className='mb-1 block text-xs font-black uppercase tracking-widest text-zinc-500'>
						{field.label}
					</label>
					<FieldInput
						field={field}
						value={node.data.values[field.key]}
						onChange={(value) =>
							dispatch({
								type: 'UPDATE_NODE_VALUE',
								id: node.id,
								fieldKey: field.key,
								value,
							})
						}
					/>
					{field.supportsVariables && variables.length > 0 && (
						<div className='mt-2 flex flex-wrap gap-1'>
							{variables.slice(0, 6).map((variable) => (
								<span
									key={`${variable.nodeId}:${variable.outputId}`}
									className='rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-300'>
									{variable.token}
								</span>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default NodeSettings;
