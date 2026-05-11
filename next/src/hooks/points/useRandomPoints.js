
import { useEffect, useMemo, useState } from 'react';

const useRandomPoints = ({ numPoints, src, }) => {

  // Create original points
  const points = useMemo(() => {
		const positions = [];

		for (let i = 0; i < numPoints; i ++) {
			const dirX = Math.random() * 1 < 0.5 ? -1 : 1;
			const dirY = Math.random() * 1 < 0.5 ? -1 : 1;
			const dirZ = Math.random() * 1 < 0.5 ? -1 : 1;

			const x = dirX * Math.random() * 6;
			const y = dirY * Math.random() * 6;
			const z = dirZ * Math.random() * 6;
			positions.push(x, y, z);
		}
		
    return new Float32Array(positions);
  }, [ numPoints, ]);

	return points;
}

export default useRandomPoints;