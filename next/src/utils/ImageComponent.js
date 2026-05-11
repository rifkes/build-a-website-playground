import { useMemo } from 'react';
import getImageUrl from './getImageUrl';

const ImageComponent = ({ src, alt, className, handleLoad, stylesPreload, stylesLoaded, width, height, quality, }) => {

	const [ loaded, setLoaded, ] = useState(false);

	const url = useMemo(() => {
		return getImageUrl({ src, width, height, quality, });
	}, [ src, width, height, quality, ]);

	return (
		<img
			src={ url }
			alt={ alt }
			className={ className }
			onLoad={ () => {
				setLoaded(true); 
				typeof handleLoad === 'function' && handleLoad();
			} }
			style={ loaded ? stylesLoaded : stylesPreload }
		/>
	);
}

export default ImageComponent;