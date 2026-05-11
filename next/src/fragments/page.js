import groq from 'groq';
import { PORTABLE_TEXT } from './utils/portableText';
import { IMAGE } from './utils/image';

export const PAGE = groq`
  *[_type == 'page' && slug.current == $slug][0] {
		title,
		'slug': slug.current,
		topSlideshow[] {
			${IMAGE}
		},
		content[] {
			${PORTABLE_TEXT}
		},
  }
`;