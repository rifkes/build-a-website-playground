import { useEffect, useState } from 'react';
import BlockDropdown from '../blocks/BlockDropdown';

const BlockFAQ = ({ value, index, length, }) => {
	
	const [ search, setSearch ] = useState('');
	const [ filter, setFilter ] = useState('');
	const [ tags, setTags ] = useState([]);

	const [filteredFaq, setFilteredFaq] = useState([]);
	
	useEffect(() => {
		const allTags = value?.faq?.map((item) => item?.tags).filter(Boolean).flat();
		const uniqueTags = [ ...new Set(allTags) ];
		setTags(uniqueTags);
		// setTags(['test', 'test2', 'test3']);
	}, [ value?.faq, ]);

	useEffect(() => {
		setFilteredFaq(value?.faq);
	}, [ value?.faq ]);

	useEffect(() => {
		if (search?.length > 0 || filter?.length > 0) {
			const filteredFaq = [];
			for (let item of value?.faq) {
				let isIncluded = false;

				if (search?.length > 0) {
					const searchFormatted = search?.replace(/[^\w\s]/g, ' ').toLowerCase().trim();
					const searchFormatted2 = search?.replace(/[^\w\s]/g, '').toLowerCase().trim();
					const questionFormatted = item?.question?.replace(/[^\w\s]/g, ' ').toLowerCase().trim();
					const questionFormatted2 = item?.question?.replace(/[^\w\s]/g, '').toLowerCase().trim();
					if (questionFormatted?.includes(searchFormatted) || questionFormatted2?.includes(searchFormatted2)) {
						isIncluded = true;
					}
				} else {
					isIncluded = true;
				}

				if (filter?.length > 0) {
					let isTagIncluded = false;
					if (item?.tags?.length > 0) {
						for (let tag of item?.tags) {
							if (tag?.toLowerCase() === filter?.toLowerCase()) {
								isTagIncluded = true;
								break;
							}
						}
					}
					if (!isTagIncluded) {
						isIncluded = false;
					}
				}
				if (isIncluded) {
					filteredFaq.push(item);
				}
			}
			setFilteredFaq(filteredFaq);
		} else {
			setFilteredFaq(value?.faq);
		}
	}, [ search, value?.faq, ]);

	return (
		<div className='px-4 sm:px-8'>
			<div className='flex flex-col gap-4 w-full max-w-textcol mx-auto'>
				<div className='max-xs:mt-2'>
					<form
						className='w-full'
						onSubmit={ (e) => {
							e.preventDefault();
						} }
					>
						<input
							type='text'
							onChange={ (e) => setSearch(e.target.value) }
							value={ search }
							className='w-full border-b border-navy border-b-2 block font-big outline-none placeholder:text-navy'
							placeholder='Search'
						/>
					</form>
				</div>
				<div className='flex items-start justify-start flex-wrap gap-1'>
					{
						tags?.length > 0 &&
						tags?.map((tag, index) => (
							<label
								key={ index }
								className={ `relative font-body !leading-none transition-colors duration-300 px-2 py-1 rounded-xs cursor-pointer ${ filter?.toLowerCase() === tag?.toLowerCase() ? 'bg-navy text-yellow hover:text-white hover:bg-navy' : 'bg-yellow text-navy hover:bg-navy hover:text-white' } transition-colors duration-300` }
							>
								<input
									type='checkbox'
									checked={ filter?.toLowerCase() === tag?.toLowerCase() }
									onChange={ (e) => {
										if (e.target.checked) {
											setFilter(tag);
										}
									} }
									className='opacity-0 absolute w-full h-full z-10 cursor-pointer' />
								{ tag }
							</label>
						))
					}
					{
						(filter?.length > 0 || search?.length > 0) &&
						<button 
							aria-label={`Clear search and filter`}
							className={ `font-body cursor-pointer !leading-none transition-colors duration-300 px-2 py-1 rounded-xs bg-navy text-yellow hover:text-white hover:bg-navy` }
							onClick={ () => {
								setFilter('');
								setSearch('');
							} }
						>clear</button>
					}
				</div>
			</div>
			<div className='flex flex-col  gap-4'>
				{
					filteredFaq?.map((item, index) => (
						<div
							key={index}
							className='mt-4 max-w-textcol mx-auto w-full'
						>
							<BlockDropdown
								value={ {
									heading: item?.question,
									content: item?.answer,
								} }
							/>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default BlockFAQ;