import { ReactNode } from 'react';
import { WorkflowEditorProvider } from '../_context/WorkflowEditorProvider.context';

const WorkflowEditorLayout = ({ children }: { children: ReactNode }) => (
	<WorkflowEditorProvider>
		<div className='flex h-screen w-screen flex-col overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100'>
			{children}
		</div>
	</WorkflowEditorProvider>
);

export default WorkflowEditorLayout;
