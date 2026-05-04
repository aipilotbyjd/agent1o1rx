const NodeLibrarySearch = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) => (
	<div className='border-b border-zinc-800 p-3'>
		<input
			value={value}
			onChange={(event) => onChange(event.target.value)}
			placeholder='Search nodes'
			className='w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-400'
		/>
	</div>
);

export default NodeLibrarySearch;
