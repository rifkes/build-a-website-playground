import '@/styles/globals.css';
import '@/styles/mux-player.css';
import Layout from './_layout';
import { SiteGlobalsProvider } from '@/utils/SiteGlobalsContext';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
		<SiteGlobalsProvider>
			<Head>
        <Script id="input-detection" strategy="beforeInteractive">
          {`
            document.documentElement.dataset.input =
              window.matchMedia('(hover: none)').matches ? 'touch' : 'mouse'
          `}
        </Script>
      </Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SiteGlobalsProvider>
	);
}
