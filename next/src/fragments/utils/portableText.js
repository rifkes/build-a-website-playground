import groq from 'groq';
import {MARK_DEFS} from './markDefs';
import { IMAGE } from './image';
import { PORTABLE_TEXT_MINI } from './portableTextMini';

export const PORTABLE_TEXT = groq`
  ...,
  _type,
  markDefs[] {
    ${MARK_DEFS}
  },
	(_type == 'blockImage') => {
		image {
			percentageWidthMobile,
			percentageWidthDesktop,
			caption,
			alt,
			${IMAGE}
		}
	},
	(_type == 'blockGallery') => {
		gallery[] {
			percentageWidthMobile,
			percentageWidthDesktop,
			caption,
			alt,
			${IMAGE}
		},
	},
	(_type == 'blockVideo') => {
		url,
	},
	(_type == 'blockCopyAndPaste') => {
		type,
		(type == 'single line') => {
			string,
		},
		(type != 'single line') => {
			text,
		},
	},
	(_type == 'blockFaq') => {
		faq[] {
			question,
			answer[] {
				${PORTABLE_TEXT_MINI}
			},
			tags[] {
				tag,
			},
		},
	},
	(_type == 'pullQuoteBlock') => {
		_type,
		text,
		backgroundColor,
	},
	(_type == 'imageAndQuoteBlock') => {
		image {
			alt,
			${IMAGE}
		},
		text,
		textSize,
	},
`;
