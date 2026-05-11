import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

const Hamburger = () => {

	const { setMenuIsOpen, menuIsOpen, headerColor, } = useSiteGlobals();

	const isCrossSymbol = useMemo(() => {
		return menuIsOpen;
	}, [menuIsOpen,]);

	return (
		<motion.button
			aria-label={`${menuIsOpen ? 'Close' : 'Open'} menu`}
			initial={{ opacity: 0, }}
			animate={{ opacity: 1, }}
			exit={{ opacity: 0, }}
			transition={{ duration: 0.3, }}
			onClick={() => {
				setMenuIsOpen(prev => !prev);
			}}
			className='absolute top-4 right-4 w-6 h-5 z-[9999] cursor-pointer group'
		>
			<div
				className='relative w-full h-full'
				style={{
					// delayed on coming into cross symbol
					transition: isCrossSymbol ? 'background-color 0.2s ease, top 0.3s 0.3s ease-in-out, transform 0.3s 0.3s ease-in-out' : 'background-color 0.2s ease, top 0.3s ease-in-out, transform 0.3s ease-in-out',
					transform: isCrossSymbol ? 'rotate(45deg)' : 'rotate(0deg)',
				}}
			>
				<div
					className='absolute top-0 left-0 w-6 h-1 bg-navy group-hover:!bg-yellow'
					style={{
						transition: isCrossSymbol ? 'background-color 0.2s ease, top 0.3s ease-in-out, transform 0.3s ease-in-out' : 'background-color 0.2s ease, top 0.3s 0.3s ease-in-out, transform 0.3s 0.3s ease-in-out',
						top: isCrossSymbol ? '50%' : '0%',
						transform: isCrossSymbol ? 'translateY(0%)' : 'translateY(0%)',
						backgroundColor: menuIsOpen ? 'var(--color-yellow)' : headerColor,
					}}
				/>
				<div
					className='absolute top-1/2 left-0 w-6 h-1 bg-navy group-hover:!bg-yellow'
					style={{
						transition: isCrossSymbol ? 'background-color 0.2s ease, top 0.3s ease-in-out, transform 0.3s ease-in-out' : 'background-color 0.2s ease, top 0.3s 0.3s ease-in-out, transform 0.3s 0.3s ease-in-out',
						transform: isCrossSymbol ? 'translateY(0%)' : 'translateY(-50%)',
						backgroundColor: menuIsOpen ? 'var(--color-yellow)' : headerColor,
					}}
				/>
				<div
					className='absolute top-1/2 left-0 w-6 h-1 bg-navy group-hover:!bg-yellow'
					style={{
						// delayed on coming into cross symbol
						transition: isCrossSymbol ? 'background-color 0.2s ease, top 0.3s 0.3s ease-in-out, transform 0.3s 0.3s ease-in-out' : 'background-color 0.2s ease, top 0.3s ease-in-out, transform 0.3s ease-in-out',
						transform: isCrossSymbol ? 'rotate(90deg) translateY(0%)' : 'rotate(0deg) translateY(-50%)',
						backgroundColor: menuIsOpen ? 'var(--color-yellow)' : headerColor,
					}}
				/>
				<div
					className='absolute bottom-0 left-0 w-6 h-1 bg-navy group-hover:!bg-yellow'
					style={{
						transition: isCrossSymbol ? 'background-color 0.2s ease, bottom 0.3s ease-in-out, transform 0.3s ease-in-out' : 'background-color 0.2s ease, bottom 0.3s 0.3s ease-in-out, transform 0.3s 0.3s ease-in-out',
						bottom: isCrossSymbol ? '50%' : '0%',
						transform: isCrossSymbol ? 'translateY(100%)' : 'translateY(0%)',
						backgroundColor: menuIsOpen ? 'var(--color-yellow)' : headerColor,
					}}
				/>
				</div>
		</motion.button>
	)
}

export default Hamburger;