import { useSiteGlobals } from '@/utils/SiteGlobalsContext';


export default function Home({  }) {

	const { windowWidth, windowHeight, } = useSiteGlobals();

  return (
		<>
			
		</>
  )
}

export async function getStaticProps() {
	

	return {
		props: {
			data: {},
		},
	};
}
