import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const CrossIcon = ({ isActive, strokeWidth = 1, }) => {

	const { windowWidth, } = useSiteGlobals();

	return (
		<div className='w-4 h-4 z-[9999] group flex-shrink-0'>
			<div
				className='relative w-full h-full'
				style={{
					transition: isActive ? 'background-color 0.2s ease, top 0.3s 0.3s ease-in-out, transform 0.3s 0.3s ease-in-out' : 'background-color 0.2s ease, top 0.3s ease-in-out, transform 0.3s ease-in-out',
					transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
				}}
			>
				<div
					className='absolute top-1/2 left-0 w-4 sm:w-4 h-[1px] bg-navy group-hover:!bg-yellow -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-90'
					style={{
						height: strokeWidth + 'px',
					}}
				/>
				<div
					className='absolute top-1/2 left-0 w-4 sm:w-4 h-[1px] bg-navy group-hover:!bg-yellow -translate-y-1/2 left-1/2 -translate-x-1/2'
					style={{
						height: strokeWidth + 'px',
					}}
				/>
			</div>
		</div>
	)
}

export default CrossIcon;