import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import getImageUrl from '@/utils/getImageUrl';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const PageTopSlideshow = ({ pageData, }) => {

	const { setPageTopSlideshowForegroundColor, } = useSiteGlobals();
	const [activeImage, setActiveImage,] = useState(0);
	const { windowWidth, } = useSiteGlobals();

	// start page header colour

	const [ slideTopColors, setSlideTopColors ] = useState([]);

	useEffect(() => {
		const urls = [];
		for (let i = 0; i < pageData?.topSlideshow?.length; i++) {
			const url = getImageUrl({ src: pageData?.topSlideshow[i]?.url, width: 200, });
			console.log(url);
			urls.push(url);
		}
		const imgs = [];
		let loaded = 0;

		const handleAllLoaded = () => {
			const colors = [];

			for (let i = 0; i < imgs.length; i++) {
				const canvas = document.createElement('canvas');
				canvas.width = imgs[i].width;
				canvas.height = Math.round(imgs[i].height * 0.25);
				const ctx = canvas.getContext('2d');
				ctx.drawImage(imgs[i], 0, 0);
				const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				let totalBrightness = 0;
				let totalYellowness = 0;

				for (let j = 0; j < imgData.data.length; j += 4) {
					totalBrightness += imgData.data[j + 0] + imgData.data[j + 1] + imgData.data[j + 2];
					// test for how close to yellow it is too
					if (imgData.data[j + 0] > 200 && imgData.data[j + 1] > 200 && imgData.data[j + 2] < 128) {
						totalYellowness += 1;
					}
				}
				const averageBrightness = totalBrightness / imgData.data.length;
				const averageYellowness = totalYellowness / imgData.data.length;
				colors.push(averageBrightness < 128 && averageYellowness < 0.05 ? 'var(--color-yellow)' : 'var(--color-navy)');
			}
			setSlideTopColors(colors);
		}

		for (let i = 0; i < urls.length; i++) {
			const img = document.createElement('img');
			img.crossOrigin = 'anonymous';
			img.addEventListener('load', () => {
				loaded++;
				if (loaded === urls.length) {
					handleAllLoaded();
				}
			});
			img.src = urls[i];
			imgs.push(img);
		}

	}, [pageData?.topSlideshow,]);

	useEffect(() => {
		setPageTopSlideshowForegroundColor(slideTopColors[activeImage]);
	}, [activeImage, slideTopColors, setPageTopSlideshowForegroundColor,]);

	useEffect(() => {
		return () => {
			setPageTopSlideshowForegroundColor('var(--color-navy)');
		}
	}, []);

	// end page header colour

	useEffect(() => {
		let interval = setInterval(() => {
			setActiveImage((prev) => (prev + 1) % pageData?.topSlideshow?.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [pageData?.topSlideshow,]);

	return (
		<div className='w-full h-[66vh] relative z-[32] page-top-slideshow bg-white'>
			<AnimatePresence>
				{
					pageData?.topSlideshow?.map((image, index) => (
						activeImage === index &&
						<motion.img
							key={index}
							initial={{ opacity: 0, }}
							animate={{ opacity: 1, }}
							exit={{ opacity: 0, }}
							transition={{ duration: 0.4, }}
							className='w-full h-full block sm:h-full object-cover absolute top-0 left-0'
							src={getImageUrl({ src: image?.url, width: windowWidth * 2, })}
							alt={image?.alt ?? ''}
						/>
					))
				}
			</AnimatePresence>
		</div>
	)
}

export default PageTopSlideshow;