import groq from 'groq';
import { PORTABLE_TEXT } from './utils/portableText';
import { IMAGE } from './utils/image';

export const NEWS = groq`
  *[_type == 'article']|order(date desc)[] {
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
	}
`;