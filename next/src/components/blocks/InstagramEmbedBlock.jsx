import InstagramWidget from "../InstagramWidget";

const InstagramEmbedBlock = ({ value, }) => {

	const { url, } = value;

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<InstagramWidget value={ value } />
		</div>
	);
};

export default InstagramEmbedBlock;