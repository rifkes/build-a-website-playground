import lerp from '@/utils/lerp';
import { useMemo } from 'react';

const useEggPoints = ({ numPoints, }) => {
  const points = useMemo(() => {
    const temp = []

		const scale = 0.9;

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2 // Full circle
      const v = Math.random() * 2 - 1 // -1 to 1 for top to bottom

      const u = (v + 1) * Math.PI / 2 // Map v to 0 - π (full vertical)

      // Plump egg shape formula
      let x = Math.cos(theta) * Math.sin(u)
      let z = Math.sin(theta) * Math.sin(u)

      // Make the bottom (v < 0) extra plump
      let y = Math.cos(u)

      // Apply some vertical tapering and bottom plumpness
      const verticalStretch = 0.8
      // const bottomPlumpFactor = v > 0 ? 1.3 : 1.0 // Fatter at bottom

			const bottomPlumpFactor = lerp(1.0, 1.3, v);

      x *= bottomPlumpFactor * 0.6
      z *= bottomPlumpFactor * 0.6
      y *= verticalStretch

      // Lift it slightly so the fat part is centered
      // y -= 0.2

			x *= scale;
			y *= scale;
			z *= scale;

      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [ numPoints ]);

	return points;
}

export default useEggPoints;