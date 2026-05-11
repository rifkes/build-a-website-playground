import ReactPlayer from 'react-player';

const VideoEmbedBlock = ({ value, }) => {

	const { url, fullWidth, caption, } = value;

  return (
		<div className={ `w-full ${ !fullWidth ? 'max-w-3xl' : '' } mx-auto aspect-video` }>
			<ReactPlayer
				width='100%'
				height='100%'
				url={ url }
			/>
			{ caption && <p className='mx-auto max-w-3xl text-center font-heading text-pretty'>{ caption }</p> }
		</div>
  );
};

export default VideoEmbedBlock