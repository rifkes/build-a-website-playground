import client from '@/hooks/useSanityQuery';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import imageUrlBuilder from '@sanity/image-url';
import { useMemo } from 'react';

const BlockImage = ({ value, }) => {

	const { windowWidth, } = useSiteGlobals();

	const src = useMemo(() => {

		if (value?.image?.url.indexOf('.gif') >= 0) {
			return value?.image?.url;
		}

		const builder = imageUrlBuilder(client);

		const urlFor = (source) => {
			return builder.image(source);
		}
		const url = urlFor(value?.image?.url).format('webp').width(2048).url();

		return url;
	}, [ value?.image?.url, ]);

  return (
    <div
			className='my-8 mx-auto'
			style={ {
				width: windowWidth > 767 ? `${ value?.image?.percentageWidthDesktop }%` : `${ value?.image?.percentageWidthMobile }%`,
			} }
		>
			<img
				src={src}
				alt={value?.image?.alt}
				className='block w-full mx-auto'
				style={{
					aspectRatio: `${value?.image?.width} / ${value?.image?.height}`,
				}}
			/>
			{ value?.image?.caption && <p className='text-center mt-2 text-sm'>{ value?.image?.caption }</p> }
    </div>
  )
};

export default BlockImage;