import { useEffect, useRef, useState } from 'react';
import { useSiteGlobals } from './SiteGlobalsContext';

const SetGlobalProps = (props) => {

  const { globalData } = props;
	const { setShuffledVideos, setVideoShuffleIndex, siteGlobals, setSiteGlobals } = useSiteGlobals();
	const isInitialised = useRef(false);

  useEffect(() => {
		if (globalData && isInitialised.current === false) {
      setSiteGlobals({
        ...siteGlobals,
        ...globalData,
      });

      if (globalData.videosData) {
        const allVideos = [ ...globalData.videosData ];
        allVideos.sort(() => Math.random() - 0.5);

        setShuffledVideos(allVideos);
        setVideoShuffleIndex(0);
      }

      isInitialised.current = true;
    }
  }, [ globalData, setSiteGlobals, siteGlobals, setShuffledVideos, setVideoShuffleIndex ]);

  return null;
};

export default SetGlobalProps;