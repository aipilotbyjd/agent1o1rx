import type { TRunLog } from '../../_types/run.type';

const RunConsole = ({ logs }: { logs: TRunLog[] }) => (
	<div className='h-40 overflow-y-auto rounded-lg bg-white p-3 font-mono text-xs text-zinc-800 dark:bg-zinc-950 dark:text-zinc-300'>
		{logs.length ? (
			logs.map((log) => (
				<div
					key={log.id}
					className={
						log.level === 'error'
							? 'text-rose-600 dark:text-rose-400'
							: log.level === 'warn'
								? 'text-amber-600 dark:text-amber-400'
								: 'text-zinc-600 dark:text-zinc-300'
					}>
					<span className='text-zinc-500 dark:text-zinc-500'>{new Date(log.at).toLocaleTimeString()}</span>{' '}
					{log.message}
				</div>
			))
		) : (
			<div className='text-zinc-500 dark:text-zinc-500'>Run logs will appear here.</div>
		)}
	</div>
);

export default RunConsole;
