import type { TRunLog } from '../../_types/run.type';

const RunConsole = ({ logs }: { logs: TRunLog[] }) => (
	<div className='h-40 overflow-y-auto rounded-lg bg-zinc-950 p-3 font-mono text-xs'>
		{logs.length ? (
			logs.map((log) => (
				<div
					key={log.id}
					className={
						log.level === 'error'
							? 'text-rose-300'
							: log.level === 'warn'
								? 'text-amber-300'
								: 'text-zinc-300'
					}>
					<span className='text-zinc-600'>{new Date(log.at).toLocaleTimeString()}</span>{' '}
					{log.message}
				</div>
			))
		) : (
			<div className='text-zinc-600'>Run logs will appear here.</div>
		)}
	</div>
);

export default RunConsole;
