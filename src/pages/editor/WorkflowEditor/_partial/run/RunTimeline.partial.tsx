import type { TRunState } from '../../_types/run.type';

const RunTimeline = ({ run }: { run: TRunState }) => (
	<div className='flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400'>
		<span className='rounded-full bg-zinc-200 px-2 py-1 font-bold uppercase dark:bg-zinc-800'>{run.status}</span>
		{run.startedAt && <span>Started {new Date(run.startedAt).toLocaleTimeString()}</span>}
		{run.finishedAt && <span>Finished {new Date(run.finishedAt).toLocaleTimeString()}</span>}
	</div>
);

export default RunTimeline;
