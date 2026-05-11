import { useMemo } from 'react';

const PullQuoteBlock = ({ value, }) => {

	const { backgroundColor, text, } = value;

	const textFormatted = useMemo(() => {
		if (!text) return '';
		let newText = text;
		if (newText[ 0 ] === '“' || newText[ 0 ] === '"' || newText[ 0 ] === "'" || newText[ 0 ] === '”' || newText[ 0 ] === '‘' || newText[ 0 ] === "’" || newText[ 0 ] === '`') {
			newText = newText.substring(1);
		}
		if (newText[ newText.length - 1 ] === '”' || newText[ newText.length - 1 ] === '"' || newText[ newText.length - 1 ] === "'" || newText[ newText.length - 1 ] === '‘' || newText[ newText.length - 1 ] === "’" || newText[ newText.length - 1 ] === '`') {
			newText = newText.substring(0, newText.length - 1);
		}
		return newText;
	}, [text, ]);

  return (
		<div
			className='p-4 sm:p-8 py-20'
			style={{ backgroundColor: backgroundColor, width: '100%', }}>
			<blockquote
				className='font-huge text-balance text-foreground text-center'
				style={{
					backgroundColor: backgroundColor,
					color: backgroundColor === '#0d1449' ? 'var(--color-yellow)' : 'var(--color-navy)',
				 }}
			>
				“{ textFormatted }”
      </blockquote>
    </div>
  );
};

export default PullQuoteBlock;