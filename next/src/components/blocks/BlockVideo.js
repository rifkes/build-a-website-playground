import ReactPlayer from 'react-player';

const VideoPlayer = ({ value, }) => {

	const { video, } = value;

  return (
    <div
      className='relative w-full h-full overflow-hidden my-12 max-w-textcol mx-auto z-1'
    >
			<div
				className='relative w-full max-w-[1024px]'
			>
				<div className='w-full h-full select-none aspect-video'>
					<ReactPlayer
						style={{
							width: '100%',
							height: '100%',
							zIndex: 1,
						}}
						src={video}
						playsinline={true}
					/>
				</div>
			</div>
    </div>
  )
}

export default VideoPlayer;