import groq from 'groq';

export const LINK_INTERNAL = groq`
  _key,
  _type,
  title,
  ...reference-> {
    "documentType": _type,
    (_type == "home") => {
      "slug": "/",
    },
		(_type == 'article') => {
			"slug": "/news/" + slug.current,
		},
    (_type == "page") => {
      "slug": "/" + slug.current,
    },
		(_type == 'news') => {
			"slug": "/news/",
		},
  }
`;
