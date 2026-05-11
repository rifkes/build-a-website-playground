import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const MenuMobile = () => {

	const { siteGlobals, menuIsOpen, windowWidth, windowHeight, setMenuIsOpen, } = useSiteGlobals();


	return (
	<AnimatePresence>
		{
			windowWidth < 1024 &&
			(menuIsOpen) &&
			<motion.nav
				initial={{ x: '100%' }}
				animate={{ x: 0 }}
				exit={{ x: '100%' }}
				transition={{ duration: 0.3, ease: 'easeInOut', }}
				className='w-screen xs:w-[320px] h-full fixed top-0 right-0 bg-navy z-[9998]'
				style={{
					height: windowHeight + 'px',
				}}
			>
				<div
					className='w-full h-full flex flex-col justify-center items-center'
					style={{
						maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 40px, rgba(0, 0, 0, 1) 75px)',
						WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 40px, rgba(0, 0, 0, 1) 75px)',
					}}
				>
					<div className='max-h-full overflow-y-auto w-full flex flex-col justify-start items-center gap-12 py-24 overflow-y-auto'>
						{
							siteGlobals?.settingsData?.menu?.map((item, index) => (
								<Link
									href={item?.slug ? item?.slug : item?.url}
									key={index}
									className='font-big text-yellow'
									onClick={() => setMenuIsOpen(false)}
									target={item?.url ? '_blank' : '_self'}
								>
									{item.title}
								</Link>
							))
						}
						
							{
								// console.log(siteGlobals?.settingsData)
								siteGlobals?.settingsData?.menuCta === 'external' || siteGlobals?.settingsData?.menuCta === 'internal' &&
								<Link
									href={siteGlobals?.settingsData?.menuCtaLink?.url ?? siteGlobals?.settingsData?.menuCtaLinkInternal?.slug}
									className='text-navy bg-yellow hover:bg-white active:bg-white transition-colors font-big duration-200 rounded-xs px-2'
								>{siteGlobals?.settingsData?.menuCtaLink?.title ?? siteGlobals?.settingsData?.menuCtaLinkInternal?.title}</Link>
							}
						</div>
					</div>
				</motion.nav>
			}
		</AnimatePresence>
	)
}

export default MenuMobile;