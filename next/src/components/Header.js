import Link from 'next/link';
import Logo from './Logo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const Header = () => {
	const { pageTopSlideshowForegroundColor, headerColor, setHeaderColor, } = useSiteGlobals();
	const router = useRouter();

	useEffect(() => {
		const detectHeaderColor = () => {
			if (router.pathname === '/') {
				const homePanels = document.querySelectorAll('.home-panel');
				let topPanel = -1;

				for (let i = 0; i < homePanels.length; i++) {
					const { top, bottom } = homePanels[i].getBoundingClientRect();
					if (top <= 0 && bottom >= 20) {
						topPanel = i;
						break;
					}
				}

				if (topPanel === -1) {
					setHeaderColor('var(--color-navy)');
					return;
				}

				if (topPanel % 2 === 0) {
					setHeaderColor('var(--color-navy)');
				} else {
					setHeaderColor('var(--color-yellow)');
				}
			} else if (document.querySelector('.page-top-slideshow')) {
				const pageTopSlideshow = document.querySelector('.page-top-slideshow');
				const { top, bottom, } = pageTopSlideshow.getBoundingClientRect();
				if (top <= 0 && bottom >= 20) {
					setHeaderColor(pageTopSlideshowForegroundColor);
				} else {
					setHeaderColor('var(--color-navy)');
				}
			} else {
				setHeaderColor('var(--color-navy)');
			}
		}

		detectHeaderColor();

		const handleScroll = (e) => {
			detectHeaderColor();
		}

		const scrollContainer = document.querySelector('.scroll-container');
		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener('scroll', handleScroll);
			}
		}
	}, [ router.asPath, router.pathname, pageTopSlideshowForegroundColor, ]);

	return (
		<header
			className='fixed top-0 left-0 z-[9999] flex justify-between w-full p-4 sm:px-8 pointer-events-none h-20 transition-colors duration-200'
			style={{
				// backgroundColor: router.pathname === '/' ? 'transparent' : 'var(--color-pale-yellow)',
				// color: router?.pathname !== '/' ? 'var(--color-navy)' : undefined,
				// fill: router?.pathname !== '/' ? 'var(--color-navy)' : undefined,
				color: headerColor,
				fill: headerColor,
			}}
		>
			<Link
				href='/'
				title='Home'
				className='sm:h-12 block pointer-events-all'
				onClick={() => {
					const scrollContainer = document.querySelector('.scroll-container');
					if (!scrollContainer) return;
					scrollContainer.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
				}}
				style={{
					color: headerColor,
					fill: headerColor,
				}}
			>
				<Logo color={headerColor} />
			</Link>
		</header>
	)
}

export default Header;