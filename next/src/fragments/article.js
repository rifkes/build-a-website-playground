import groq from 'groq';
import { PORTABLE_TEXT } from './utils/portableText';
import { IMAGE } from './utils/image';

export const ARTICLE = groq`
  *[_type == 'article' && slug.current == $slug][0] {
		_createdAt,
		title,
		author,
		(date == null) => {
			'date': _createdAt,
		},
		(date != null) => {
			'date': date,
		},
		'slug': slug.current,
		image {
			${IMAGE}
		},
		categories[]->{
			title,
			'slug': slug.current,
		},
		'slug': slug.current,
		content[] {
			${PORTABLE_TEXT}
		},
		(categories != null) => {
			'relatedArticles': *[
				_type == 'article'
				&& defined(categories)
				&& count(categories) > 0
				&& count(categories[@._ref in *[slug.current == $slug][0].categories[]._ref]) > 0
			] | order(date desc, _createdAt desc) [0..2] {
				title,
				'slug': slug.current,
				author,
				(date == null) => {
					'date': _createdAt,
				},
				categories[]->{
					title,
					'slug': slug.current,
				},
				(date != null) => {
					'date': date,
				},
				image {
					${IMAGE}
				},
			},
		},

		'unrelatedArticles': *[_type == 'article' && slug.current != $slug][0..2] {
			title,
			'slug': slug.current,
			author,
			(date == null) => {
				'date': _createdAt,
			},
			(date != null) => {
				'date': date,
			},
			categories[]->{
				title,
				'slug': slug.current,
			},
			image {
				${IMAGE}
			},
		},
  }
`;