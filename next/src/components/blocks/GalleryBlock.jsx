import Slideshow from './Slideshow';
import Carousel from './Carousel';

const GalleryBlock = ({ value, }) => {

	const { type, gallery, } = value;

	if (type === 'slideshow') {
		return <Slideshow images={ gallery } />
	} else if (type === 'carousel') {
		return <Carousel images={ gallery } />
	}
	return '';
};

export default GalleryBlock