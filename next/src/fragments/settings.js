import groq from 'groq';
import { LINK_EXTERNAL } from './utils/linkExternal';
import { LINK_EMAIL } from './utils/linkEmail';
import { LINK_INTERNAL } from './utils/linkInternal';

export const SETTINGS = groq`
  *[_type == 'settings'][0] {
		menu[] {
			_type,
			(_type == 'linkInternal') => {
				${ LINK_INTERNAL }
			},
			(_type == 'linkEmail') => {
				${ LINK_EMAIL }
			},
			(_type == 'linkExternal') => {
				${ LINK_EXTERNAL }
			},
		},
		menuCta,
		(menuCta == 'external') => {
			menuCtaLink {
				title,
				url,
			},
		},
		(menuCta == 'internal') => {
			menuCtaLinkInternal {
				${ LINK_INTERNAL }
			},
		},
		footerMenu[] {
			_type,
			(_type == 'linkInternal') => {
				${ LINK_INTERNAL }
			},
			(_type == 'linkEmail') => {
				${ LINK_EMAIL }
			},
			(_type == 'linkExternal') => {
				${ LINK_EXTERNAL }
			},
		},
		footerCopyrightText,
		footerLegalLinks[] {
			_type,
			(_type == 'linkInternal') => {
				${ LINK_INTERNAL }
			},
			(_type == 'linkEmail') => {
				${ LINK_EMAIL }
			},
			(_type == 'linkExternal') => {
				${ LINK_EXTERNAL }
			},
		},
		footerEmailLinks[] {
			${ LINK_EMAIL }
		},
		footerSocialLinks[] {
			_type,
			type,
			url,
		},
		seoTags[],
		seoImage {
			'url': asset->url,
		},
		seoDescription,
		gaMeasurementId,
		cookieConsentText,
  }
`;