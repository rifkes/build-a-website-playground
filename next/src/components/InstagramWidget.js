'use client';

import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useRef } from 'react';
// import actionNetworkStyles from '@/styles/actionNetworkStyles-prev.js';

const InstagramWidget = (props) => {
  const { windowHeight, windowWidth } = useSiteGlobals();
	const iframeRef = useRef(null);

	const { codeSnippet, } = props?.value;

  useEffect(() => {
		let raf;
		let iframe;

		const setupIframe = () => {
			iframe = iframeRef.current;
			if (iframe) {
				let snippet = `
				${codeSnippet}`;
				var html = `
				<html>
					<head>
						<style>
							html, body {
								margin: 0;
								padding: 0;
								overflow: hidden;
							}
							body {
								display: flex;
								justify-content: center;
								align-items: center;
							}
							.instagram-media {
								margin: 0 auto;
								display: block;
							}
							*::-webkit-scrollbar {
								display: none;
							}
						</style>
					</head>
					<body>
						${snippet}
					</body>
				</html>
			`;
			
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
				const plugin = body.querySelector('.instagram-media');
				if (plugin) {
					const height = plugin.offsetHeight;
					iframe.style.height = `${height + 24}px`;
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
    <div className='w-full relative py-12'>
			<iframe
				title='Instagram post'
				ref={iframeRef}
				className='w-full block'
			/>
    </div>
  );
};

export default InstagramWidget;