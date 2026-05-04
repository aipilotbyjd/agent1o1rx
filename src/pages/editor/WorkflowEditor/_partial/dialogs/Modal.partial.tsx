import { ReactNode } from 'react';

const Modal = ({
	title,
	children,
	onClose,
}: {
	title: string;
	children: ReactNode;
	onClose: () => void;
}) => (
	<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'>
		<div className='w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl'>
			<div className='flex items-center justify-between border-b border-zinc-800 px-5 py-4'>
				<div className='text-sm font-black uppercase tracking-widest text-white'>{title}</div>
				<button
					type='button'
					onClick={onClose}
					className='rounded-lg border border-zinc-800 px-2 py-1 text-xs text-zinc-400 hover:text-white'>
					Close
				</button>
			</div>
			<div className='p-5'>{children}</div>
		</div>
	</div>
);

export default Modal;
