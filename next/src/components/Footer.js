import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Link from 'next/link';
import SocialMediaIcon from './SocialMediaIcon';

const Footer = () => {

	const { siteGlobals, } = useSiteGlobals();

	return (
		<footer className='bg-navy text-white p-4 sm:p-8'>
		<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
			<nav className='col-span-2 sm:col-span-1 columns-2'>
				{
					siteGlobals?.settingsData?.footerMenu?.map((item, index) => (
						<div
							key={index}
							className='block w-full pr-4 text-pretty mb-4'
						>
							{
								item?.slug ?
									<Link
										className='font-body font-bold'
										href={item?.slug}
									>
										{item?.title}
									</Link>
									:
									<a
										className='font-body font-bold'
										href={item?.url || `mailto:${item?.email}`}
										target='_blank'
										rel='noopener noreferrer'
									>
										{item?.title ?? item?.email}
									</a>
							}
						</div>
					))
				}
			</nav>
			<ul className='col-span-2 sm:col-span-1 gap-y-4'>
				{
					siteGlobals?.settingsData?.footerEmailLinks?.map((item, index) => (
						<li
							key={index}
							className='block w-full pr-4 text-pretty mb-4'
						>
							<a
								className='font-body'
								href={`mailto:${item?.email}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								{item?.email}
							</a>
						</li>
					))
				}
				</ul>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-4'>
				<p className='font-small mt-8 col-span-1 sm:col-span-3'>{siteGlobals?.settingsData?.footerCopyrightText}{
					siteGlobals?.settingsData?.footerLegalLinks?.map((item, index) => (
						<span key={index}> | {item?.slug ?
								<Link href={item?.slug} className='underline'>
									{item?.title}
								</Link>
								:
								<a href={item?.url || `mailto:${item?.email}`}>
									{item?.title ?? item?.email}
								</a>
							}
						</span>
					))
				}
				</p>
				<ul className='col-span-2 sm:col-span-1 h-full flex justify-end items-end gap-2'>
					{
						siteGlobals?.settingsData?.footerSocialLinks?.map((item, index) => (
							<li key={index} className='block'>
								<a href={item?.url} target='_blank' rel='noopener noreferrer' className='fill-white hover:fill-yellow social-link' title={item?.type}>
									<SocialMediaIcon
										type={item?.type}
										color='#fff'
									/>
								</a>
							</li>
						))
					}
				</ul>
			</div>
		</footer>
	)
}

export default Footer;