import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useMemo, useState } from 'react';
import NewsThumbnail from './NewsThumbnail';
import { AnimatePresence, motion } from 'framer-motion';
import CrossIcon from '../CrossIcon';

const NewsFeed = ({ newsFeed, page = 1, setPage, pagination = false, }) => {
	
	const { windowWidth, } = useSiteGlobals();

	const columnCount = useMemo(() => {
		if (windowWidth < 500) {
			return 1;
		} else if (windowWidth < 768) {
			return 2;
		} else if (windowWidth < 1200) {
			return 3;
		} else if (windowWidth < 1920) {
			return 4;
		} else {
			return 5;
		}
	}, [windowWidth, ]);

	const [pageNavIsVisible, setPageNavIsVisible] = useState(true);
	const [activeCategory, setActiveCategory] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const category = urlParams.get('category');
		if (category && setActiveCategory) {
			setActiveCategory(category);
		}
		const search = urlParams.get('search');
		if (search) {
			setSearchQuery(search);
		}
	}, []);

	useEffect(() => {
		const url = new URL(window.location.href);
		if (activeCategory) {
			url.searchParams.set('category', activeCategory);
		} else {
			url.searchParams.delete('category');
		}
		if (searchQuery?.length > 0) {
			url.searchParams.set('search', searchQuery);
		} else {
			url.searchParams.delete('search');
		}
		window.history.pushState({}, '', url.toString());
	}, [activeCategory, searchQuery,]);

	const articlesPerPage = 24;

	const newsFeedFiltered = useMemo(() => {
		
		let filteredNewsFeed = [];

		if (activeCategory) {
			for (let i = 0; i < newsFeed?.length; i++) {
				for (let j = 0; j < newsFeed[i]?.categories?.length; j++) {
					if (newsFeed[i]?.categories[j]?.slug === activeCategory) {
						filteredNewsFeed.push({...newsFeed[i]});
					}
				}
			}
		} else {
			filteredNewsFeed = [...newsFeed];
		}
		
		const filteredNewsFeedCopy = [...filteredNewsFeed];

		// regexp to replace all punctuation with spaces
		const searchQueryFormatted = searchQuery?.replace(/[^\w\s]/g, ' ').toLowerCase();
		const searchQueryFormatted2 = searchQuery?.replace(/[^\w\s]/g, '').toLowerCase();

		if (searchQuery?.length > 0) {
			const filteredNewsFeedLength = filteredNewsFeed?.length;
			for (let i = filteredNewsFeedLength - 1; i >= 0; i--) {
				let item = filteredNewsFeedCopy[i];
				let isIncluded = false;
				const titleFormatted = item?.title?.replace(/[^\w\s]/g, ' ').toLowerCase();
				const titleFormatted2 = item?.title?.replace(/[^\w\s]/g, '').toLowerCase();
				const authorFormatted = item?.author?.replace(/[^\w\s]/g, ' ').toLowerCase();
				const authorFormatted2 = item?.author?.replace(/[^\w\s]/g, '').toLowerCase();
				if (titleFormatted?.includes(searchQueryFormatted) || titleFormatted2?.includes(searchQueryFormatted2)) {
					isIncluded = true;
				}
				if (authorFormatted?.includes(searchQueryFormatted) || authorFormatted2?.includes(searchQueryFormatted2)) {
					isIncluded = true;
				}
				if (!isIncluded) {
					filteredNewsFeedCopy.splice(i, 1);
				}
			}
		}

		// return filteredNewsFeedCopy;

		return [
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
			...filteredNewsFeedCopy,
		]
	}, [newsFeed, activeCategory, searchQuery,]);

	const numberOfPages = useMemo(() => {
		return Math.ceil(newsFeedFiltered?.length / articlesPerPage);
	}, [articlesPerPage, newsFeedFiltered,]);

	const newsFeedPaginated = useMemo(() => {
		const start = (page - 1) * articlesPerPage;
		const end = start + articlesPerPage;
		
		const array = [];

		for (let i = start; i < end; i++) {
			if (newsFeedFiltered?.length > i) {
				array.push(newsFeedFiltered[i]);
			}
		}

		return array;
	}, [page, articlesPerPage, newsFeedFiltered,]);

	const columns = useMemo(() => {
		const paginatedNewsFeedCopy = [...newsFeedPaginated];
		const array = [];
		for (let i = 0; i < columnCount; i++) {
			array.push([]);
		}
		for (let i = 0; i < paginatedNewsFeedCopy?.length; i++) {
			array[i % columnCount].push({ ...paginatedNewsFeedCopy[i] });
		}

		return array;
	}, [columnCount, newsFeedFiltered, newsFeedPaginated,]);

	
	const categories = useMemo(() => {
		let categories = [];
		let alreadyAdded = [];

		for (let i = 0; i < newsFeed?.length; i++) {
			for (let j = 0; j < newsFeed[i]?.categories?.length; j++) {
				if (!categories.includes(newsFeed[i]?.categories[j]) && !alreadyAdded.includes(newsFeed[i]?.categories[j].slug)) {
					categories.push(newsFeed[i]?.categories[j]);
					alreadyAdded.push(newsFeed[i]?.categories[j].slug);
				}
			}
		}

		categories = [...new Set(categories)];
		return categories;
	}, [newsFeed,]);

	useEffect(() => {
		const newsFeedNav = document.querySelector('.news-feed-nav');
		const newsFeedTop = document.querySelector('.news-feed-top');
		const scrollContainer = document.querySelector('.scroll-container');

		if (newsFeedNav) {
			scrollContainer.scrollTo({
				top: newsFeedTop.offsetTop,
				behavior: 'instant',
			});
		}
	}, [searchQuery, activeCategory,]);

	return (
		<>
			<div className='news-feed-top snap-start' />
			<div className='sticky top-14 sm:top-16 left-0 w-full z-[9] -mb-14 sm:-mb-16 news-feed-nav snap-end'>
				<div className='pt-14 sm:pt-16 bg-white -translate-y-14 sm:-translate-y-16 px-4 sm:px-8 xs:grid xs:grid-cols-2'>
					<div className='col-span-1'>
						<h1 className='font-heading my-4'>News Feed</h1>
						<AnimatePresence>
						{
							categories?.length > 0 &&
							pageNavIsVisible &&
							<motion.nav
								initial={{ opacity: 0, }}
								animate={{ opacity: 1, }}
								exit={{ opacity: 0, }}
								transition={{ duration: 0.3, }}
							>
								<div className='relative w-full border-b border-navy pb-2 max-w-md h-10 mb-2'>
									<input
										type='text'
										placeholder='Search'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='w-full p-2 border-0 outline-none'
									/>
									<div className='absolute h-full top-0 right-0 flex items-center justify-end pr-2'>
										<svg
											width='25'
											height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'
											className='stroke-navy h-4 w-auto overflow-visible'
											strokeWidth={ 2 }
										>
											<path d='M14.501 0.5C19.8949 0.5 24.2061 4.56252 24.2061 9.5C24.2061 14.4375 19.8949 18.5 14.501 18.5C9.10722 18.4998 4.79688 14.4373 4.79688 9.5C4.79688 4.56266 9.10722 0.500223 14.501 0.5Z'/>
											<line y1='-0.5' x2='10.2731' y2='-0.5' transform='matrix(-0.731922 0.681388 -0.731922 -0.681388 7.51904 16)'/>
										</svg>
									</div>
								</div>
								<div className='flex flex-wrap justify-start items-center gap-x-1 gap-y-2 w-full pb-2'>
									{
										categories?.map((category, index) => (
											category.title?.length > 0 &&
											<button
												key={index}
												onClick={() => setActiveCategory && setActiveCategory(category.slug)}
													className='font-body !leading-none hover:text-yellow hover:bg-navy transition-colors duration-300 bg-yellow text-navy px-2 py-1 rounded-xs cursor-pointer'
													style={{
														backgroundColor: activeCategory === category.slug ? 'var(--color-navy)' : undefined,
														color: activeCategory === category.slug ? 'var(--color-yellow)' : undefined,
													}}
											>{category.title}</button>
										))
											}
											{
												(searchQuery?.length > 0 || activeCategory) &&
												<button
													onClick={() => {
														setActiveCategory(null)
														setSearchQuery('')
													}}
													className='font-body !leading-none hover:text-yellow hover:bg-navy transition-colors duration-300 bg-yellow text-navy px-2 py-1 rounded-xs'
												>clear</button>
											}
								</div>
							</motion.nav>
						}
						</AnimatePresence>
					</div>
					{
						<div className='flex items-center justify-start xs:justify-end xs:items-end w-full col-span-1'>
							<button
								aria-label={`${pageNavIsVisible ? 'Hide' : 'Show'} search and filter settings`}
								onClick={() => setPageNavIsVisible(!pageNavIsVisible)}
								className='flex items-center justify-start xs:justify-end gap-2 z-[9999] group mb-2'
							>
								<span className='font-body h-6 underline group-hover:text-yellow'>search and filter</span>
								<CrossIcon isActive={pageNavIsVisible} />
							</button>
						</div>
					}
				</div>
			</div>
			<div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-4 sm:gap-8 sm:p-8'>
			{ columns.map((column, index) => (
				<div key={index + '_' + column?.length} className='col-span-1 flex flex-col gap-8'>
					{ column?.map((item, index) => (
						<div key={index + '_' + item?.slug}>
							<NewsThumbnail article={item} setActiveCategory={setActiveCategory} />
						</div>
					)) }
				</div>
			))}
			</div>
			{
				pagination &&
				<div className='flex items-center justify-center gap-4'>
					{
							numberOfPages > 1 &&
							<div className='flex flex-col items-center justify-center gap-2 my-4'>
								<div className='flex items-center justify-center gap-4'>
								{
									Array(numberOfPages).fill(0).map((_, index) => (
										<button
											key={index}
											onClick={() => setPage(index + 1)}
											disabled={page === index + 1}
											className='font-body !leading-none hover:text-yellow hover:bg-navy disabled:!text-navy/50 disabled:!bg-light-grey disabled:cursor-default transition-colors duration-300 bg-yellow text-navy w-6 h-6 flex items-center justify-center px-2 py-1 rounded-full cursor-pointer'
											style={{
												backgroundColor: page === index + 1 ? 'var(--color-navy)' : undefined,
												color: page === index + 1 ? 'var(--color-yellow)' : undefined,
											}}
										>{index + 1}</button>
									))
								}
							</div>
							<div className='flex items-center justify-center gap-4'>
								<button
									onClick={() => setPage(page - 1)}
									disabled={page === 1}
									className='font-body !leading-none hover:text-yellow disabled:!text-navy/50 disabled:!bg-light-grey disabled:cursor-default hover:bg-navy transition-colors duration-300 bg-yellow text-navy flex items-center justify-center px-2 py-1 rounded-xs cursor-pointer'
									style={{
										backgroundColor: page === 1 ? 'var(--color-navy)' : undefined,
										color: page === 1 ? 'var(--color-yellow)' : undefined,
									}}
								>Previous</button>
								<button
									onClick={() => setPage(page + 1)}
									disabled={page === numberOfPages}
									className='font-body !leading-none hover:text-yellow hover:bg-navy disabled:!text-navy/50 disabled:!bg-light-grey disabled:cursor-default transition-colors duration-300 bg-yellow text-navy flex items-center justify-center px-2 py-1 rounded-xs cursor-pointer'
									style={{
										backgroundColor: page === numberOfPages ? 'var(--color-navy)' : undefined,
										color: page === numberOfPages ? 'var(--color-yellow)' : undefined,
									}}
								>Next</button>
							</div>
						</div>
					}
				</div>
			}
		</>
	);
};

export default NewsFeed;