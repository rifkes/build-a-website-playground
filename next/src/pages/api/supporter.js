import client from '@/hooks/useSanityQuery';
import { projectId } from '@/sanity.config';
import groq from 'groq';

export default async function handler(req, res) {
	// const body = JSON.parse(req.body);

	const url = req.url;

	if (url?.indexOf('?event=seedPurchase') > -1) {

		try {
			const doc = await client.fetch(groq`*[_type == 'supporters'][0] {
				_id,
				supporters[],
			}`);

			if (doc) {
				const supporters = doc.supporters || [];
				const newSupporters = [
					...supporters,
					{
						timestamp: new Date().getTime(),
						_key: 'supporter_' + new Date().getTime(),
					},
				];

				const mutations = [{
					patch: {
						id: doc._id,
						set: {
							supporters: newSupporters,
						},
					}
				}];

				const response = await fetch(
					`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/production`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${process.env.SANITY_UPDATE_API_KEY}`,
						},
						body: JSON.stringify({ mutations, })
					}
				);

				if (!response?.ok) {
					throw new Error(`Sanity API responded with status: ${response.status}`);
				}

				return res.status(200).send(JSON.stringify({ message: supporters, }));

			} else {
				return res.status(500).send(JSON.stringify({ message: 'whoops', error, }));
			}
			
		} catch (error) {
			return res.status(500).send(JSON.stringify({ message: 'no data, project id' + projectId }));
		}
	}
}