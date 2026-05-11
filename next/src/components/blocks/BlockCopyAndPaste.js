import { useRef, useState } from 'react';

const BlockCopyAndPaste = ({ value, }) => {

	const { type, string, text, } = value;
	const textElement = useRef();
	const copyTextTimer = useRef(null);

	const [isCopied, setIsCopied] = useState(false);

	return (
		<div className='p-4 sm:p-8'>
			<div
				className='relative p-4 bg-pale-yellow rounded-xs max-w-textcol overflow-hidden my-4 mx-auto'
			>
				<p
					ref={textElement}
					style={{
						fontFamily: type === 'code' ? 'monospace' : undefined,
						whiteSpace: type === 'single line' ? 'nowrap' : 'collapse',
					}}
				>
					{type === 'single line' ? string : text}
				</p>
				<div className='flex justify-end items-end pt-4'>
					<button
						aria-label={`${!isCopied ? 'Copy' : 'Copied'} text`}
						className='cursor-pointer bg-yellow text-navy px-2 py-1 rounded-xs hover:bg-navy hover:text-white transition-colors duration-300 font-subheading'
						onClick={() => {
							clearTimeout(copyTextTimer.current);
							navigator.clipboard.writeText(type === 'single line' ? string : text).then(() => {
								setIsCopied(true);
								copyTextTimer.current = setTimeout(() => {
									setIsCopied(false);
								}, [5000]);
							})
						}}
						>{!isCopied ? 'copy text' : 'copied!'}</button>
				</div>
			</div>
		</div>
  )
};

export default BlockCopyAndPaste;