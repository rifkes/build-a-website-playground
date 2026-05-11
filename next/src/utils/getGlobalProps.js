import client from '../hooks/useSanityQuery';
import { SETTINGS } from '@/fragments/settings';

const getGlobalProps = async () => {
	const settingsData = await client.fetch(SETTINGS, {});

  const dataCollections = [
		// { collection: COLLECTIONNAME, key: 'collectionNameData' },
	];
	
  const collectionsObject = {};

  for (let item of dataCollections) {
    const data = await client.fetch(item.collection);
    const dataArray = [];
    if (data?.length > 0) {
      for (let item of data) {
        dataArray.push(item);
      }
    }
    collectionsObject[ item.key ] = dataArray;
	}

  return {
    settingsData,
    ...collectionsObject,
  };
};

export default getGlobalProps;