import pages from '@/Routes/pages';
import { lazy } from 'react';

const EditorPages = [
	{
		path: pages.examples.exampleMain.to,
		children: [
			{
				path: pages.examples.exampleMain.subPages.userInterface.subPages.navs.to,
				element: <NavsExamplePage />,
			},
		],
	},
];

export default EditorPages;
