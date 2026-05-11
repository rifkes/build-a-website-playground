import IframeWidget from '@/components/ActionNetworkWidget';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Head from 'next/head';
import htmlSnippet from '@/components/htmlSnippet';
import { useState } from 'react';

const Layout = (props) => {

	const { siteGlobals, windowHeight, } = useSiteGlobals();

	const [ codeSnippet, setCodeSnippet] = useState(htmlSnippet);

	return (
		<div
			className='w-screen h-screen p-4'
			id='main'
			style={{
				height: `${windowHeight}px`,
			}}
		>
			<Head>
				<title>Website toolkit</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			
			<div className='grid grid-rows-2 landscape:grid-rows-1 landscape:grid-cols-2 gap-4 h-full'>
				<div className='row-span-1 landscape:row-span-auto landscape:col-span-1 h-full'>
					<textarea
						rows={ 20 }
						value={codeSnippet}
						onChange={ (e) => setCodeSnippet(e.target.value) }
						className='rounded-md p-2 w-full h-full font-mono focus:outline-none focus:bg-[lavenderblush] transition-colors duration-300'
						style={{
							fontFamily: 'monospace',
							fontSize: '14px',
							boxShadow: 'inset 0 0 10px 0 rgba(0, 0, 0, 0.25)',
							caretColor: 'hotpink',
						}}
						onKeyDown={(e) => {
							if (e.key == 'Tab') {
								e.preventDefault();
								const t = e.target;
								const start = t.selectionStart;
								const end = t.selectionEnd;

								// set textarea value to: text before caret + tab + text after caret
								t.value = t.value.substring(0, start) +
									"\t" + t.value.substring(end);

								// put caret at right position again
								t.selectionStart = t.selectionEnd = start + 1;
							}
						}}
					/>
				</div>
				<div className='col-span-1 h-full'>
					<IframeWidget codeSnippet={codeSnippet} />
				</div>
			</div>
			
		</div>
	);
}

export default Layout;