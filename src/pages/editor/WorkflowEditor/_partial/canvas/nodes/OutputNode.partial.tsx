import BaseNode from './BaseNode.partial';
import type { TCanvasNode } from '../../../_types/canvas.type';

const OutputNode = (props: {
	node: TCanvasNode;
	selected: boolean;
	onSelect: () => void;
	onMove: (x: number, y: number) => void;
}) => <BaseNode {...props} />;

export default OutputNode;
