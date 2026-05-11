import { A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { LeftArrow, RightArrow } from './SlideshowArrows';
import { useRef, useState } from 'react';

const CarouselControls = ({ activeIndex, length, swiperRef, }) => {

	return (
		<div className='p-2 flex justify-evenly items-center'>
			<div className=''>
				<button
					aria-label={`Previous image`}
					onClick={ () => swiperRef.current.slidePrev() }
					className='glow-lg w-8 h-8 rounded-full p-2 mouse:hover:translate-y-0.5 mouse:hover:translate-x-0.5 mouse:hover:glow-md'
					style={ {
						transition: 'transform 0.2s ease, box-shadow 0.2s ease',
					} }
				>
					<LeftArrow />
				</button>
		</div>
		<div className='font-heading text-2xl'>
			{ activeIndex + 1 } / { length }
		</div>
			<div className=''>
				<button
					aria-label={`Next image`}
					onClick={ () => swiperRef.current.slideNext() }
					className='glow-lg w-8 h-8 rounded-full p-2 mouse:hover:translate-y-0.5 mouse:hover:translate-x-0.5 mouse:hover:glow-md'
					style={ {
						transition: 'transform 0.2s ease, box-shadow 0.2s ease',
					} }
				>
					<RightArrow />
				</button>
			</div>
		</div>
	)
}

const Carousel = ({ images, slidesPerView = 3, }) => {

	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef(null);

  return (
		<div style={ { width: '100%', aspectRatio: '16/9', } }>
			<Swiper
				onSwiper={(swiper) => swiperRef.current = swiper}
				modules={ [ Autoplay, A11y ] }
				spaceBetween={ 0 }
				slidesPerView={ slidesPerView }
				loop={ true }
				fadeEffect={{ crossFade: true }}
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
			>
				{
					images?.length > 0 &&
					images?.map((image, index) => (
						<SwiperSlide key={ index } style={ { width: '100%', height: '100%', } }>
							<div style={ { aspectRatio: '9/16', } }>
								<img style={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block', } } src={ image?.url } alt={ image?.altText } />
							</div>
						</SwiperSlide>
					))
				}
			</Swiper>
			<CarouselControls activeIndex={ activeIndex } length={ images?.length } swiperRef={ swiperRef } />
		</div>
  )
}

export default Carousel;