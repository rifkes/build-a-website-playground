import { useState } from 'react';
import PortableTextBlocks from './PortableTextBlocks';
import { AnimatePresence, motion } from 'framer-motion';
import CrossIcon from '../CrossIcon';

const BlockDropdown = ({ value, }) => {
		
	const [ isOpen, setIsOpen ] = useState(false);

  return (
    <div
			className='relative transition-height duration-300 overflow-hidden max-w-textcol mx-auto dropdown'
			style={ {
				height: isOpen === false ? 'calc(auto, size)' : 'calc-size(auto, size)',
			} }
		>
      <button
				aria-label={`${isOpen ? 'Close' : 'Open'} dropdown: ${value?.heading}`}
				className='w-full flex items-start justify-between gap-4 cursor-pointer'
				onClick={ () => setIsOpen(!isOpen) }
			>
				<span className='block text-left font-subheading text-pretty leading-[1.5rem]'>
					{ value?.heading }
				</span>
				<div className='flex-shrink-0 flex items-center justify-center h-[1.5rem]'>
					<CrossIcon isActive={isOpen} strokeWidth={2} />
				</div>
			</button>
			<AnimatePresence>
				{
					isOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0, }}
							animate={{ opacity: 1, height: 'auto', }}
							exit={{ opacity: 0, height: 0, }}
							transition={{ duration: 0.3, ease: 'easeInOut', }}
							className='relative'
						>
							<div
								className='rich-text text-balance mt-4'
							>
								<PortableTextBlocks value={ value?.content } />
							</div>
						</motion.div>
					)
				}
			</AnimatePresence>
    </div>
  )
};

export default BlockDropdown;