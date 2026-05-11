import Link from 'next/link';
import BlockLink from './BlockLink';

const BlockCTA = ({ value, className, markType, children }) => {

  return (
		<div className='p-4 text-center'
		style={{ backgroundColor: value.backgroundColor, }}
		>	
			<span className='block text-body font-body'>{ value.text }</span>
      <BlockLink value={value} />
    </div>
  )
};

export default BlockLink;