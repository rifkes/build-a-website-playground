import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuDesktop = () => {
	const { siteGlobals, headerColor, } = useSiteGlobals();
	const router = useRouter();

	return (
		<nav className='fixed right-4 sm:right-8 top-4 sm:top-8 flex flex-row items-start gap-2 justify-end z-[9999] pl-[240px] pointer-events-none'>
		<div className='flex flex-wrap flex-row items-center gap-2 gap-y-2 justify-end'>
			{
				siteGlobals?.settingsData?.menu?.map((item, index) => (
					<Link
						href={item?.slug ?? item?.url}
						key={index}
						className={`font-body font-bold px-2 transition-colors duration-200 rounded-xs menu-button menu-button-${router.pathname !== '/' ? headerColor === 'var(--color-navy)' ? 'bg-navy' : 'bg-yellow' : headerColor === 'var(--color-navy)' ? 'fg-navy' : 'fg-yellow' } pointer-events-all`}
						style={{
							// color: headerColor,
							// color: router.pathname === '/' ? headerColor : 
							// headerColor === 'var(--color-navy)' ? 'var(--color-yellow)' : 'var(--color-navy)',
							backgroundColor: router.pathname === item?.slug ? 'white' : undefined,
							color: router.pathname === item?.slug ? 'var(--color-navy)' : undefined,
							// color: router.pathname === '/' ? headerColor : undefined,
						}}
					>
						{item.title}
					</Link>
				))
			}
			</div>
			{
				// console.log(siteGlobals?.settingsData)
				siteGlobals?.settingsData?.menuCta === 'external' || siteGlobals?.settingsData?.menuCta === 'internal' &&
				<Link
					href={siteGlobals?.settingsData?.menuCtaLink?.url ?? siteGlobals?.settingsData?.menuCtaLinkInternal?.slug}
					className={`text-yellow bg-navy hover:text-background active:text-background hover:bg-foreground active:bg-foreground transition-colors font-body font-bold duration-200 rounded-xs px-2 menu-button-bg-${headerColor === 'var(--color-navy)' ? 'navy' : 'yellow'} pointer-events-all`}
					style={{
						backgroundColor: headerColor,
						color: headerColor === 'var(--color-navy)' ? 'var(--color-yellow)' : 'var(--color-navy)',
						// backgroundColor: router.pathname === '/' ? headerColor : undefined,
						// color: router.pathname === '/' ? headerColor === 'var(--color-navy)' ? 'var(--color-yellow)' : 'var(--color-navy)' : undefined,
					}}
				>{siteGlobals?.settingsData?.menuCtaLink?.title ?? siteGlobals?.settingsData?.menuCtaLinkInternal?.title}</Link>
			}
		</nav>
	)
}

export default MenuDesktop;