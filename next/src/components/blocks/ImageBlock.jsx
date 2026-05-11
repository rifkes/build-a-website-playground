const ImageBlock = ({ value, }) => {

	const { image, fullWidth, caption, } = value;

  return (
    <div className={`${fullWidth ? 'sm:w-full' : 'w-1/2 max-sm:w-full max-sm:px-2' } mx-auto`}>
			<img src={ image?.url } alt={ caption } className='w-full h-auto' />
			{ caption && <p>{ caption }</p> }
    </div>
  );
};

export default ImageBlock