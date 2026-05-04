const suggestions = [
	'Add an Output node to every production workflow.',
	'Use Extract Data when downstream steps need structured JSON.',
	'Keep credentials in integration nodes instead of plain text fields.',
];

const AiSuggestions = () => (
	<div className='space-y-2'>
		<div className='text-xs font-black uppercase tracking-widest text-zinc-500'>Suggestions</div>
		{suggestions.map((suggestion) => (
			<div key={suggestion} className='rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300'>
				{suggestion}
			</div>
		))}
	</div>
);

export default AiSuggestions;
