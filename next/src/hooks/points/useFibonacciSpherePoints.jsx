import { useMemo } from 'react';
import * as THREE from 'three';
import { shuffle } from 'underscore';

const useMoonPoints = ({ numPoints, }) => {
  const points = useMemo(() => {
		const temp = [];
		


		// const geometry = new THREE.SphereGeometry(0.3, Math.sqrt(numPoints) * 0.5, Math.sqrt(numPoints) * 0.5, Math.sqrt(numPoints) * 0.5);
		// const positions = geometry.attributes.position.array;
		
		const fibSphere = (i, radius) => {
			const k = i + .5;

			const phi = Math.acos(1 - 2 * k / numPoints);
			const theta = Math.PI * (1 + Math.sqrt(5)) * k;

			const x = Math.cos(theta) * Math.sin(phi) * radius;
			const y = Math.sin(theta) * Math.sin(phi) * radius;
			const z = Math.cos(phi) * radius;

			return [x, y, z];
		}

		// for (let i = 0; i < positions.length && i < numPoints * 3; i += 3) {
		// 	if (positions[i + 2] >= 0) {
		// 		temp.push(positions[i], positions[i + 1], positions[i + 2]);
		// 	}
		// }

		for (let i = 0; i < numPoints; i++) {
			temp.push(...fibSphere(i, 0.3));
		}
		
		if (temp.length / 3 < numPoints) {
			for (let i = temp.length; i < numPoints * 3; i += 3) {
				// const dirX = Math.random() * 1 < 0.5 ? -1 : 1;
				// const dirY = Math.random() * 1 < 0.5 ? -1 : 1;
				// const dirZ = Math.random() * 1 < 0.5 ? -1 : 1;

				// const x = dirX * Math.random() * 120000;
				// const y = dirY * Math.random() * 120000;
				// const z = dirZ * Math.random() * 120000;



				const x = 0;
				const y = 0;
				const z = 10;
				temp.push(x, y, z);
			}
		}

		return new Float32Array(temp);

		// randomisation of order of points

		let pointsToShuffle = [];

		for (let i = 0; i < temp.length; i += 3) {
			pointsToShuffle.push({
				x: temp[i],
				y: temp[i + 1],
				z: temp[i + 2],
			});
		}

		const shuffled = shuffle(pointsToShuffle);

		const shuffledPoints = [];

		for (let i = 0; i < shuffled.length; i++) {
			shuffledPoints.push(shuffled[i].x, shuffled[i].y, shuffled[i].z);
		}

    // return new Float32Array(shuffledPoints);
  }, [ numPoints, ]);

  return points;
};

export default useMoonPoints;
