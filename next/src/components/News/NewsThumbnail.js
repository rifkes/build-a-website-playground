import { getFormattedDate } from '@/utils/date';
import getImageUrl from '@/utils/getImageUrl';
import Link from 'next/link';

const NewsThumbnail = ({ article, setActiveCategory, constrain = false, }) => {
	if (!article?.slug) return null;

	return (
		<div className='flex flex-col gap-1'>
			<Link
				href={`/news/${article?.slug}`}
				className='bg-navy group relative sm:max-h-[40vh] overflow-hidden'
				title={article?.title}
			>
				<img
					className='w-full h-full object-cover mix-blend-screen saturate-0 relative top-0 left-0 group-hover:opacity-0 transition-opacity duration-300 max-h-[40vh]'
					style={{
						aspectRatio: constrain ? '16/9' : `${article?.image?.width} / ${article?.image?.height}`,
					}}
					src={getImageUrl({ src: article?.image?.url, width: 1000, })}
					alt={article?.image?.alt ?? ''}
				/>
				<img
					className='w-full object-cover top-0 left-0 opacity-0 absolute top-0 left-0 z-2 group-hover:opacity-100 transition-opacity duration-300 max-h-[40vh]'
					style={{
						aspectRatio: `${article?.image?.width} / ${article?.image?.height}`,
					}}
					src={getImageUrl({ src: article?.image?.url, width: 1000, })}
					alt={article?.image?.alt ?? ''}
				/>
			</Link>
			<h3 className='font-subheading text-balance'>
				{
					article?.slug &&
					<Link href={`/news/${article?.slug}`}>{article?.title}</Link>
				}
			</h3>
			{article?.author && <p className='font-body font-bold'>{article?.author}</p>}
			{(article?.date || article?._createdAt) && <p className='font-small'>{getFormattedDate(article?.date || article?._createdAt).formatted}</p>}
			{
				article?.categories?.length > 0 && <div className='flex flex-wrap gap-2'>
				<div className='flex flex-wrap justify-start items-center gap-x-1 gap-y-2 w-full pb-2'>
					{
						article?.categories?.map((category, index) => (
							category.title?.length > 0 &&
							<Link
								key={index}
								href={`/news/?category=${category.slug}`}
								onClick={() => setActiveCategory && setActiveCategory(category.slug)}
								className='font-body !leading-none hover:text-yellow hover:bg-navy transition-colors duration-300 bg-yellow text-navy px-2 py-1 rounded-xs'
							>{category.title}</Link>
						))
					}
				</div>
			</div>
			}
		</div>
	);
};

export default NewsThumbnail;