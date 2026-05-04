import { CATEGORY_META } from './builder.constants';
import { NODE_CATALOG } from './nodeCatalog.constants';
import type { TNodeCategory } from '../_types/node.type';

export const NODE_GROUPS = Object.keys(CATEGORY_META).map((category) => ({
	category: category as TNodeCategory,
	meta: CATEGORY_META[category as TNodeCategory],
	nodes: NODE_CATALOG.filter((node) => node.category === category),
}));
