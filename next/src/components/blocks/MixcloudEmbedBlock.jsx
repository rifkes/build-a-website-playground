import ReactPlayer from 'react-player';

const MixcloudEmbedBlock = ({ value, }) => {

	const { url, } = value;

  return (
    <ReactPlayer
			width='100%'
			height='60px'
			url={ url }
		/>
  );
};

export default MixcloudEmbedBlock;