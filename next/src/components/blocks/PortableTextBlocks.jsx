import { PortableText } from '@portabletext/react';
import ListBlock from './BlockList';
import LinkAnnotation from '../annotations/LinkAnnotation';
import BlockLink from './BlockLink';
import blockImage from './BlockImage';
import BlockDropdown from './BlockDropdown';
import BlockFAQ from './BlockFAQ';
import BlockCopyAndPaste from './BlockCopyAndPaste';
import BlockGallery from './BlockGallery';
import BlockVideo from './BlockVideo';
import ActionNetworkWidget from '../ActionNetworkWidget';
import ImageAndQuoteBlock from './ImageAndQuoteBlock';
import GalleryBlock from './GalleryBlock';
import InstagramEmbedBlock from './InstagramEmbedBlock';
import VideoEmbedBlock from './VideoEmbedBlock';
import PullQuoteBlock from './PullQuoteBlock';

export const portableTextComponents = {
  // Lists
	list: ListBlock,
	block: {
		h1: ({ children }) => <h1 className='rich-text-h1 font-heading'>{children}</h1>,
		h2: ({ children }) => <h2 className='rich-text-h2 font-heading'>{children}</h2>,
		h3: ({ children }) => <h3 className='rich-text-h3 font-subheading'>{children}</h3>,
		p: ({ children }) => <p className='rich-text-p font-body'>{children}</p>,
		large: ({ children }) => <p className='rich-text-large font-huge'>{children}</p>,
		small: ({ children }) => <small className='rich-text-small font-small'>{children}</small>,
		normal: ({ children }) => <p className='rich-text-normal font-body'>{children}</p>,
	},
  // Marks
  marks: {
    annotationLinkEmail: LinkAnnotation,
    annotationLinkExternal: LinkAnnotation,
    annotationLinkInternal: LinkAnnotation,
  },
	types: {
		blockLink: BlockLink,
		blockImage: blockImage,
		blockDropdown: BlockDropdown,
		// blockGallery: BlockGallery,
		blockFaq: BlockFAQ,
		blockVideo: BlockVideo,
		blockCopyAndPaste: BlockCopyAndPaste,

		blockGallery: GalleryBlock,
		imageAndQuoteBlock: ImageAndQuoteBlock,
		instagramEmbedBlock: InstagramEmbedBlock,
		videoEmbedBlock: VideoEmbedBlock,
		pullQuoteBlock: PullQuoteBlock,
		blockActionNetworkWidget: (props) => <ActionNetworkWidget {...props} />,
	},
}

export default function PortableTextBlocks({ value }) {
  if (!value) return null;
  return (
    <PortableText
      value={ value }
      components={ portableTextComponents }
    />
  );
}
