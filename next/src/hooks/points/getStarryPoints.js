const getStarryPoints = ({ numPoints, width, height, pointsInUse, }) => {

	const positions = [];
	const aspect = width / height;

	for (let i = 0; i < numPoints * 3; i++) {

		const dirX = Math.random() * 1 < 0.5 ? -1 : 1;
		const dirY = Math.random() * 1 < 0.5 ? -1 : 1;

		let x = dirX * Math.random() * aspect;
		let y = dirY * Math.random();

		if (i / 3 < pointsInUse.length) {
			x *= 0.75;
			y *= 0.75;
		}

		const z = dirY * Math.random();
		positions.push(x, y, z);
	}
		
	const points = new Float32Array(positions);

	return points;
}

export default getStarryPoints;