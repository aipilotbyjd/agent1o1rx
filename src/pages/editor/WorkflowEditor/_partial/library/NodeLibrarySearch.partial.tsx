const NodeLibrarySearch = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) => (
	<div className='border-b border-zinc-200 dark:border-zinc-800 p-3'>
		<input
			value={value}
			onChange={(event) => onChange(event.target.value)}
			placeholder='Search nodes'
			className='w-full rounded-lg border bg-white text-zinc-900 placeholder:text-zinc-500 outline-none transition border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 focus:border-emerald-400'
		/>
	</div>
);

export default NodeLibrarySearch;
