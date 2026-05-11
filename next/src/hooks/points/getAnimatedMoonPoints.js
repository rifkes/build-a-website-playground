// import { shuffle } from 'underscore';
import * as THREE from 'three';

const getAnimatedMoonPoints = ({ numPoints, moonPhase, }) => {

	const temp = [];
	const radius = 0.85;

	// Distribute points evenly: more lat bands = more coverage top-to-bottom

	const fullPoints = Math.max(numPoints, 24000);
	// latitude vertical
	const numLat = Math.round(Math.sqrt(fullPoints));
	// longitude horizontal
	const numLon = Math.round(fullPoints / numLat);

	const positions = [];


	// amount from right hand side (smaller number, closer to rhs)
	const startPercent = moonPhase >= 0.5 ? (moonPhase - 0.5) * 2 : 0;
	// amount to left hand side (larger number, closer to lhs)
	const endPercent = moonPhase >= 0.5 ? 1 : ((moonPhase) * 2);

	// going anti-clockwise
	// * by 0.5 to only create the front hemisphere of the circle
	for (let j = startPercent * numLon * 0.5; j < numLon * endPercent * 0.5; j++) {
		// theta goes from 0 to 2*PI around the equator
		const theta = (j / numLon) * 2 * Math.PI + Math.PI * 2;

		for (let i = 0; i < numLat; i++) {
			// phi goes from 0 (north pole) to PI (south pole)
			const phi = (i / (numLat - 1)) * Math.PI;

			const x = radius * Math.sin(phi) * Math.cos(theta);
			const y = radius * Math.cos(phi);              // vertical axis
			const z = radius * Math.sin(phi) * Math.sin(theta);

			positions.push(...[x, y, z]);
		}
	}

	for (let i = 0; i < positions.length; i++) {
		temp.push(positions[i]);
	}
	
	if (temp.length / 3 < fullPoints) {
		for (let i = temp.length; i < fullPoints * 3; i += 3) {
			const dirX = Math.random() > 0.5 ? 1 : -1;
			const dirY = Math.random() > 0.5 ? 1 : -1;
			const x = dirX * (Math.random() * 5 + 10);
			const y = dirY * (Math.random() * 5 + 10);
			const z = 0;
			temp.push(x, y, z);
		}
	}

	// return new Float32Array(temp);

	let pointsToShuffle = [];

	for (let i = 0; i < temp.length; i += 3) {
		pointsToShuffle.push({
			x: temp[i],
			y: temp[i + 1],
			z: temp[i + 2],
		});
	}


	const shuffle = (arr) => {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
			j = Math.floor(Math.random() * (index + 1));
			x = arr[index];
			arr[index] = arr[j];
			arr[j] = x;
    }
    return arr;
	}

	const shuffled = shuffle(pointsToShuffle);
	
	// const shuffled = [...pointsToShuffle];

	const shuffledPoints = [];

	for (let i = 0; i < shuffled.length; i++) {
		shuffledPoints.push(shuffled[i].x, shuffled[i].y, shuffled[i].z);
	}

	const pointsToReturn = [];
	for (let i = 0; i < shuffledPoints.length; i += 3) {
		pointsToReturn.push(shuffledPoints[i], shuffledPoints[i + 1], shuffledPoints[i + 2]);
	}

	const pointsToReturnVectors = [];

	for (let i = 0; i < pointsToReturn.length; i += 3) {
		pointsToReturnVectors.push(new THREE.Vector3(pointsToReturn[i], pointsToReturn[i + 1], pointsToReturn[i + 2]));
	}

	const points = new Float32Array(pointsToReturn);
		
  return points;
};

export default getAnimatedMoonPoints;
