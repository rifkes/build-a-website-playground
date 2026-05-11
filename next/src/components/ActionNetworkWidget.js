'use client';

import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useRef } from 'react';

const IframeWidget = ({ codeSnippet, }) => {
  const { windowHeight, windowWidth } = useSiteGlobals();

	const iframeRef = useRef(null);

  useEffect(() => {
		let raf;
		let iframe;

		const setupIframe = () => {
			iframe = iframeRef.current;
			if (iframe) {
				var html = codeSnippet;
				
			if (iframe?.contentWindow?.document) {
				iframe.contentWindow.document.open();
				iframe.contentWindow.document.write(html);
				iframe.contentWindow.document.close();
			}

			} else {
				raf = requestAnimationFrame(setupIframe);
			}
		}

		setupIframe();

		return () => {
			if (iframe?.contentWindow?.document) {
				iframe.contentWindow.document.open();
				iframe.contentWindow.document.write('');
				iframe.contentWindow.document.close();
			}
			cancelAnimationFrame(raf);
		}
  }, [ codeSnippet, ]);

	useEffect(() => {
		let raf;
		const iframe = iframeRef.current;

		const updateHeight = () => {
			const body = iframe?.contentWindow?.document?.body;
			if (body) {
				const plugin = body.querySelector('div');
				if (plugin) {
					const height = plugin.offsetHeight;
					// iframe.style.height = `${height}px`;
				}
			}
			raf = requestAnimationFrame(updateHeight);
		}

		updateHeight();

		return () => {
			cancelAnimationFrame(raf);
		}
	}, [ windowWidth, windowHeight, ]);

  return (
		<iframe
			title='HTML'
			ref={iframeRef}
			className='w-full h-full block rounded-md'
			style={{
				boxShadow: 'inset 0 0 10px 0 rgba(0, 0, 0, 0.25)',
				height: '100%',
			}}
		/>
  );
};

export default IframeWidget;