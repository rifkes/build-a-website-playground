import Link from 'next/link';

const BlockLink = ({ value, className, markType, children }) => {

  return (
    <div className='p-4 text-center'>
      {
        value?.linkType === 'internal' && value.slug ?
          <Link
            className='max-w-textcol inline-block mx-auto !no-underline font-heading bg-yellow p-4 hover:bg-navy hover:text-white transition-colors duration-300 rounded-xs'
            href={value.slug}
          >
							{ value.title }
					</Link>
          :
          <a
            className='max-w-textcol inline-block mx-auto !no-underline font-heading bg-yellow p-4 hover:bg-navy hover:text-white transition-colors duration-300 rounded-xs'
            href={ value.linkExternal ? value.linkExternal : value.email ? `mailto:${value.email}` : undefined}
            target={value.newWindow || value.email ? '_blank' : '_self'}
            rel='noopener noreferrer'
						target='_blank'
          >
						{ value.text }
					</a>
      }
    </div>
  )
};

export default BlockLink;