
import { useEffect, useMemo, useState } from 'react';

const useDefaultPoints = ({ numPoints, src, }) => {

  // Create original points
  const points = useMemo(() => {
		const positions = [];

		for (let i = 0; i < numPoints; i ++) {
			positions.push(0, 0, 0);
		}
		
    return new Float32Array(positions);
  }, [ numPoints, ]);

	return points;
}

export default useDefaultPoints;