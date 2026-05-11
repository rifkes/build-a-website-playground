import client from '@/hooks/useSanityQuery';
import groq from 'groq';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
	}

  const secret = process.env.SANITY_REVALIDATE_SECRET;
	const sanitySecret = req?.headers['x-sanity-secret'] || req?.body?.secret || req?.query?.secret;
	
	const { _type, external, slug } = req.body;

  if (sanitySecret !== secret) {
    return res.status(401).json({ message: 'Invalid secret' });
	}

	const slugs = new Set(['/',]);

	if (_type === 'page' && slug.current) {
		slugs.add(`/${slug.current}`);
	}

	if (_type === 'article' && slug.current) {
		slugs.add(`/news/${slug.current}`);
	}

	if (_type === 'settings') {
		const allSlugs = await client.fetch(groq`*[_type == 'page'][].slug.current`);
		allSlugs.forEach((slug) => {
			slugs.add(`/${slug}`);
		});
		const allArticleSlugs = await client.fetch(groq`*[_type == 'article'][].slug.current`);
		allArticleSlugs.forEach((slug) => {
			slugs.add(`/news/${slug}`);
		});
	}

	try {
    const results = await Promise.allSettled(
      [...slugs].map((route) => res.revalidate(route))
    );

    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length) {
      console.warn('Some paths failed:', failed);
    }

    return res.json({ revalidated: true, paths: [...slugs] });
  } catch (error) {
    console.error('Revalidation failed:', error);
    return res.status(500).json({ message: 'Error during revalidation', error: error.message });
  }
}
