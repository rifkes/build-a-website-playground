import { useMemo } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getImageUrl from '@/utils/getImageUrl';

const ImageAndQuoteBlock = ({ value,}) => {

	const { backgroundColor, text, image, textSize, order, } = value;
	const { windowWidth, } = useSiteGlobals();

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
	}, [text,]);

  return (
		<div
			style={{ backgroundColor: backgroundColor, }}
			className='flex flex-col sm:flex-row'
		>
			<div
				className='p-4 sm:p-8 w-full sm:w-1/2'
				style={{ order: order === 'imageFirst' ? 1 : 0, }}
			>
				<blockquote
					className={`${textSize === 'large' ? 'font-heading' : 'font-subheading'} text-balance text-foreground`}
					
				>
					“{ textFormatted }”
				</blockquote>
			</div>
			<div
				className='w-full sm:w-1/2'
				style={{ order: order === 'imageFirst' ? 0 : 1, }}
			>
				<img src={getImageUrl({ src: image?.url, width: windowWidth >= 768 ? windowWidth * 0.5 : windowWidth })} alt="" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', }} />
			</div>
    </div>
  );
};

export default ImageAndQuoteBlock