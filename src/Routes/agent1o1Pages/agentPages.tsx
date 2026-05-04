import pages from '@/Routes/pages';
import { lazy } from 'react';

const AgentPages = [
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

export default AgentPages;
