import pages from '@/Routes/pages';
import { lazy } from 'react';

const WorkflowEditorPage = lazy(() => import('@/pages/editor/WorkflowEditor/WorkflowEditor.page'));

const EditorRoutes = [
	{
		path: pages.editor.editorMain.subPages.flowEditor.to,
		element: <WorkflowEditorPage />,
	}
];

export default EditorRoutes;