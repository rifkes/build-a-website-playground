import { useMemo } from 'react';
import * as THREE from 'three';
import { shuffle } from 'underscore';

const useTorusKnotPoints = ({ numPoints, }) => {
  const points = useMemo(() => {
    const temp = [];

		const geometry = new THREE.TorusKnotGeometry(0.3, 0.2, Math.sqrt(numPoints) * 2, Math.sqrt(numPoints) / 4, 6, 9);
		const positions = geometry.attributes.position.array;

		for (let i = 0; i < positions.length && i < numPoints * 3; i+=3) {
			temp.push(positions[i], positions[i + 1], positions[i + 2]);
		}

		if (temp.length / 3 < numPoints) {
			for (let i = 0; i < numPoints - temp.length / 3; i++) {
				// const dirX = Math.random() * 1 < 0.5 ? -1 : 1;
				// const dirY = Math.random() * 1 < 0.5 ? -1 : 1;
				// const dirZ = Math.random() * 1 < 0.5 ? -1 : 1;

				// const x = dirX * Math.random() * 120000;
				// const y = dirY * Math.random() * 120000;
				// const z = dirZ * Math.random() * 120000;

				const x = 0;
				const y = 0;
				const z = -10;
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

export default useTorusKnotPoints;
