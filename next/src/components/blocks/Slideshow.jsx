import { useRef, useState } from 'react';
import 'swiper/css';
import { useEffect } from 'react';
import getImageUrl from '@/utils/getImageUrl';
import { LeftArrow, RightArrow } from './SlideshowArrows';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const Slideshow = ({ images, }) => {
	
	const [activeImage, setActiveImage,] = useState(0);
	const slideshowRef = useRef(null);
	const { windowWidth, windowHeight, } = useSiteGlobals();

	useEffect(() => {
		let raf;

		const updateHeight = () => {
			if (slideshowRef.current) {
				const activeImageElement = slideshowRef.current.querySelectorAll('img')[activeImage];
				if (activeImageElement) {
					const bounds = activeImageElement.getBoundingClientRect();
					const height = bounds.height;
					if (height > 0) {
						slideshowRef.current.style.height = `${height}px`;
					} else {
						raf = requestAnimationFrame(updateHeight);
					}
				}
			} else {
				raf = requestAnimationFrame(updateHeight);
			}
		}

		raf = requestAnimationFrame(updateHeight);

		return () => {
			cancelAnimationFrame(raf);
		}
	}, [activeImage, windowWidth, windowHeight,]);

	return (
		<>
			<div
				ref={ slideshowRef }
				className='w-full relative flex items-center'
				style={{
					// height: 'calc-size(fit-content, size)',
					// height: 'min(300px, fit-content)',
					height: '80svh',
					transition: 'height 0.4s ease-in-out',
				}}
			>
				{
					images?.length > 0 &&
					images?.map((image, index) => (
						<div
							key={ index }
							className='top-0 left-0 w-full h-auto absolute flex items-center justify-center'
							style={ {
								opacity: index === activeImage ? 1 : 0,
								pointerEvents: index === activeImage ? 'auto' : 'none',
								position: index === 0 ? 'relative' : 'absolute',
								transition: 'opacity 0.4s ease-in-out',
							} }
						>
							<img
								className='w-auto h-auto sm:max-w-3xl max-h-[60svh] select-none'
								src={ getImageUrl({ src: image?.url, }) } alt={ image?.altText ?? '' }
								onClick={(event) => {
									const e = event?.touches ? event.touches[0] : event;
									let x = e.clientX;
									const bounds = e.target.getBoundingClientRect();
									const width = bounds.width;
									const left = bounds.x;
									
									x = x - left;

									if (x < width / 2) {
										setActiveImage((prev) => (prev - 1 + images.length) % images.length);
									} else {
										setActiveImage((prev) => (prev + 1) % images.length);
									}
								} }
							/>
						</div>
					))
				}
			</div>
			<div className='p-2 flex justify-evenly items-center'>
				<div className=''>
					<button
						aria-label={`Previous image`}
						onClick={ () => setActiveImage((prev) => (prev - 1 + images.length) % images.length) }
						className='glow-lg w-8 h-8 rounded-full p-2 mouse:hover:translate-y-0.5 mouse:hover:translate-x-0.5 mouse:hover:glow-md'
						style={ {
							transition: 'transform 0.2s ease, box-shadow 0.2s ease',
						} }
					>
						<LeftArrow />
					</button>
			</div>
			<div className='font-heading text-2xl'>
				{ activeImage + 1 } / { images.length }
			</div>
				<div className=''>
					<button
						aria-label={`Next image`}
						onClick={ () => setActiveImage((prev) => (prev + 1) % images.length) }
						className='glow-lg w-8 h-8 rounded-full p-2 mouse:hover:translate-y-0.5 mouse:hover:translate-x-0.5 mouse:hover:glow-md'
						style={ {
							transition: 'transform 0.2s ease, box-shadow 0.2s ease',
						} }
					>
						<RightArrow />
					</button>
				</div>
			</div>
		</>
  )
}

export default Slideshow;