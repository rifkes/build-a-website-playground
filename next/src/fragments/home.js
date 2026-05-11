import groq from 'groq';
import { PORTABLE_TEXT } from './utils/portableText';
import { IMAGE } from './utils/image';
import { LINK_EXTERNAL } from './utils/linkExternal';
import { LINK_INTERNAL } from './utils/linkInternal';

export const HOME = groq`
  *[_type == 'home'][0] {
		introScreens[] {
			text,
			image {
				${IMAGE}
			},
			ctaType,
			(ctaType == 'external') => {
				ctaLink {
					${LINK_EXTERNAL}
				},
			},
			(ctaType == 'internal') => {
				ctaLinkInternal {
					${LINK_INTERNAL}
				},
			},
		},
		showNewsFeed,
		(showNewsFeed == true) => {
			'newsFeed': *[_type == 'article'] | order(date desc, _createdAt desc) [0..12] {
				_createdAt,
				title,
				(date == null) => {
					'date': _createdAt,
				},
				(date != null) => {
					'date': date,
				},
				image {
					${IMAGE}
				},
				content[] {
					${PORTABLE_TEXT}
				},
				'slug': slug.current,
				author,
				categories[]->{
					title,
					'slug': slug.current,
				},
			},
		},
  }
`;