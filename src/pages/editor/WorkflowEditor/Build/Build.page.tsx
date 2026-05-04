import AiBuilderPanel from '../_partial/ai/AiBuilderPanel.partial';
import Canvas from '../_partial/canvas/Canvas.partial';
import CommandPalette from '../_partial/dialogs/CommandPalette.partial';
import ImportExportDialog from '../_partial/dialogs/ImportExportDialog.partial';
import Inspector from '../_partial/inspector/Inspector.partial';
import NodeLibrary from '../_partial/library/NodeLibrary.partial';
import RunPanel from '../_partial/run/RunPanel.partial';
import ActionBar from '../_partial/shell/ActionBar.partial';
import StatusBar from '../_partial/shell/StatusBar.partial';
import Topbar from '../_partial/shell/Topbar.partial';
import { useAutosave } from '../_hooks/useAutosave.hook';
import { useEditorHotkeys } from '../_hooks/useEditorHotkeys.hook';

const BuildPage = () => {
	useAutosave();
	useEditorHotkeys();

	return (
		<div className='flex h-full min-h-0 flex-col'>
			<Topbar />
			<div className='flex min-h-0 flex-1'>
				<NodeLibrary />
				<div className='relative flex min-w-0 flex-1 flex-col'>
					<Canvas />
					<ActionBar />
					<RunPanel />
				</div>
				<Inspector />
			</div>
			<StatusBar />
			<AiBuilderPanel />
			<CommandPalette />
			<ImportExportDialog />
		</div>
	);
};

export default BuildPage;
