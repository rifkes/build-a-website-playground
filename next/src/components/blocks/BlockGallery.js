import client from '@/hooks/useSanityQuery';
import imageUrlBuilder from '@sanity/image-url';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState, } from 'react';

const GalleryImage = ({ value, }) => {

	const src = useMemo(() => {

		if (value?.url.indexOf('.gif') >= 0) {
			return value?.url;
		}

		const builder = imageUrlBuilder(client);

		const urlFor = (source) => {
			return builder.image(source);
		}
		const url = urlFor(value?.url).format('webp').width(2048).url();

		return url;
	}, [value?.url,]);

	return (
		<motion.div
			initial={{ opacity: 0, }}
			animate={{ opacity: 1, }}
			exit={{ opacity: 0, }}
			transition={{ duration: 0.2, }}
			key={value?._key}
			className='w-full h-auto'
		>
			<img
				src={src}
				alt={value?.alt}
				className='block w-full h-auto'
				style={{
					aspectRatio: `${value?.width} / ${value?.height}`,
				}}
			/>
		</motion.div>
  )
};

const BlockGallery = ({ value, }) => {

	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className='w-full'>
			<div className='relative w-full'>
				<AnimatePresence mode='wait'>
					{value?.gallery?.map((image, index) => (
						index === activeIndex &&
						<GalleryImage key={index} value={image} />
					)) }
				</AnimatePresence>
			</div>
			<div className='flex justify-center items-center gap-2 mt-2'>
				<button aria-label={`Previous image`} onClick={() => setActiveIndex((activeIndex - 1 + value?.gallery?.length) % value?.gallery?.length)} className='border border-foreground bg-background hover:bg-foreground text-foreground hover:text-background active:bg-foreground active:text-background transition-colors duration-200 px-2 rounded-sm cursor-pointer'>Previous</button>
				<button aria-label={`Next image`} onClick={() => setActiveIndex((activeIndex + 1 + value?.gallery?.length) % value?.gallery?.length)} className='border border-foreground bg-background hover:bg-foreground text-foreground hover:text-background active:bg-foreground active:text-background transition-colors duration-200 px-2 rounded-sm cursor-pointer'>Next</button>
			</div>
		</div>
	)
}

export default BlockGallery;