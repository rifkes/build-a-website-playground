const shuffle = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const createImagePoints = ({ numPoints, img, invert, }) => {

	let imageData, imageWidth, imageHeight;
	
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const aspectRatio = img.naturalWidth / img.naturalHeight;
	const portrait = aspectRatio <= 1;
	let scale = 0.8;
	
	if (canvas.width * canvas.height > numPoints) {
		if (!portrait) {
			canvas.height = Math.sqrt(numPoints / aspectRatio);
			canvas.width = canvas.height * aspectRatio;
		} else {
			canvas.width = Math.sqrt(numPoints * aspectRatio);
			canvas.height = canvas.width / aspectRatio;
		}
	}

	scale = aspectRatio * 0.6;

	// canvas.width = img.width;
	// canvas.height = img.height;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	imageWidth = canvas.width;
	imageHeight = canvas.height;

	const positions = [];

	for (let i = 0; i < imageWidth * imageHeight * 4; i += 4) {
		const index = i / 4;
		let x = (index % imageWidth) / imageWidth * 2 - 0.5;
		let y = Math.floor(index / imageWidth) / imageHeight * 2 - 0.5;
		const color = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3]) / 4;
		const brightness = invert ? 1 - (color / 255) : (color / 255);
		if (brightness > 0.5) {
			positions.push((x - 0.5) * scale, (-y + 0.5) * scale, brightness * 0.1 - 0.1);
		}
	}

	if (positions.length / 3 < numPoints) {
		for (let i = 0; i < numPoints - positions.length / 3; i++) {
			// const dirX = Math.random() * 1 < 0.5 ? -1 : 1;
			// const dirY = Math.random() * 1 < 0.5 ? -1 : 1;
			// const dirZ = Math.random() * 1 < 0.5 ? -1 : 1;
			// const dirZ = 1;

			// const x = dirX * Math.random() * 12;
			// const y = dirY * Math.random() * 12;
			// const z = dirZ * Math.random() * 12;
			const x = 0;
			const y = 0;
			const z = 10;
			positions.push(x, y, z);
		}
	}

	const positionArrayOfObjects = [];

	for (let i = 0; i < positions.length; i+=3) {
		positionArrayOfObjects.push({
			x: positions[i],
			y: positions[i + 1],
			z: positions[i + 2],
		});
	}

	shuffle(positionArrayOfObjects);

	const shuffledPositions = [];

	for (let i = 0; i < positionArrayOfObjects.length; i++) {
		shuffledPositions.push(positionArrayOfObjects[i].x, positionArrayOfObjects[i].y, positionArrayOfObjects[i].z);
	}
	
	return new Float32Array(shuffledPositions);
}

export default createImagePoints;