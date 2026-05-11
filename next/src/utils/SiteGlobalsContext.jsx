'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const getCookie = (cname) => {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export const SiteGlobalsContext = createContext({
  siteGlobals: {},
  setSiteGlobals: async (siteGlobals) => null,
  windowSize: { width: 1, height: 1 },
  setWindowSize: async (windowSize) => null,
  isTouchscreen: false,
  setIsTouchscreen: async (isTouchscreen) => null,
	windowWidth: 0,
	windowHeight: 0,
	scrollContainer: { current: null, },
	menuIsOpen: false,
	setMenuIsOpen: async (menuIsOpen) => null,
	pageTopSlideshowForegroundColor: 'var(--color-navy)',
	setPageTopSlideshowForegroundColor: async (pageTopSlideshowForegroundColor) => null,
	headerColor: 'var(--color-navy)',
	setHeaderColor: async (headerColor) => null,
});

export const useSiteGlobals = () => useContext(SiteGlobalsContext);

export const SiteGlobalsProvider = ({ children }) => {
  const [ siteGlobals, setSiteGlobals ] = useState({});
  const [ windowSize, setWindowSize ] = useState({ width: 0, height: 0 });
  const [ isTouchscreen, setIsTouchscreen ] = useState(false);
	const scrollContainer = useRef(null);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [pageTopSlideshowForegroundColor, setPageTopSlideshowForegroundColor] = useState('var(--color-navy)');
	const [headerColor, setHeaderColor] = useState('var(--color-navy)');

	useEffect(() => {
		const handleTouch = () => {
			setIsTouchscreen(true);
		}

		const handleMouse = () => {
			setIsTouchscreen(false);
		}

		window.addEventListener('touchstart', handleTouch);
		window.addEventListener('mousedown', handleMouse);

		return () => {
			window.removeEventListener('touchstart', handleTouch);
			window.removeEventListener('mousedown', handleMouse);
		}
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

  return (
    <SiteGlobalsContext.Provider
      value={ {
        siteGlobals, setSiteGlobals,
        windowSize,
        windowWidth: windowSize.width,
        windowHeight: windowSize.height,
        isTouchscreen, setIsTouchscreen,
				scrollContainer,
				menuIsOpen, setMenuIsOpen,
				pageTopSlideshowForegroundColor, setPageTopSlideshowForegroundColor,
				headerColor, setHeaderColor,
      } }
    >{ children }</SiteGlobalsContext.Provider>
  );
}