import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

const useGenerateGeometry = ({ width, height, segmentsX, segmentsY, elevation, }) => {

	const { siteGlobals, } = useSiteGlobals();
	const [ geometry, setGeometry, ] = useState(null);

  // Generate vertices manually for PlaneGeometry
  useEffect(() => {
		const image = document.createElement('img');

		const generateGeometry = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			canvas.width = segmentsX;
			canvas.height = segmentsY;
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			const sizeX = width;
			const sizeY = height;

			const planeGeometry = new THREE.PlaneGeometry(sizeX, sizeY, segmentsX, segmentsY);
			const positionArray = planeGeometry.attributes.position.array;

			// const geometry = new THREE.BufferGeometry();
			const geometry = new THREE.PlaneGeometry(sizeX, sizeY, segmentsX, segmentsY);
			
			const pointsX = segmentsX + 1;
			const coords = new Float32Array(positionArray.length);
			geometry.setAttribute('position', new THREE.BufferAttribute(coords, 3));

			// const coords = positionArray;

			const segmentXSize = sizeX / segmentsX;
			const segmentYSize = sizeY / segmentsY;

			for (let i = 0; i < positionArray.length; i += 3) {
				// find the index of the vertex in the geometry
				// divide by 3 because each vertex has 3 coordinates
				const coordIndex = i / 3;

				// find the x and y coordinates of the vertex
				// these will be used to find the corresponding pixel in the image data
				const x = coordIndex % pointsX;
				const y = Math.floor(coordIndex / pointsX);
				coords[ i ] = x;
				coords[ i + 1 ] = y;

				// find the corresponding pixel in the image data
				// use the red channel value to determine the height of the vertex
				// divide by 255 to get a value between 0 and 1
				// each pixel is 4 values (rgba) so multiply by 4
				const correspondingImageDataIndex = Math.floor((canvas.width - coords[ i ]) + (canvas.height - coords[ i + 1 ]) * canvas.width) * 4;

				if (typeof imageData.data[ correspondingImageDataIndex ] === 'number') {
					coords[ i + 2 ] = imageData.data[ correspondingImageDataIndex ] / 255 * -elevation;
				}
			}

			for (let i = 0; i < coords.length; i+=3) {
				if (typeof coords[ i ] !== 'number') {
					// console.log('coords[ i ]:', coords[ i ]);
				}
			}

			for (let i = 0; i < coords.length; i+=3) {
				coords[ i ] *= segmentXSize;
				coords[ i + 1 ] *= segmentYSize;
				coords[ i ] -= (segmentsX / 2) * segmentXSize;
				coords[ i + 1 ] -= (segmentsY / 2) * segmentYSize;
			}

			geometry.setAttribute('position', new THREE.BufferAttribute(coords, 3));
			geometry.rotateX(Math.PI * -0.5);
			geometry.rotateZ(Math.PI);
			
			geometry.attributes.position.needsUpdate = true;

			// compute normals so shading works properly
			geometry.computeVertexNormals();

			setGeometry(geometry);
		}

		image.addEventListener('load', generateGeometry);
		image.src = siteGlobals?.homeData?.scene?.ground;
		
  }, [ siteGlobals?.homeData?.scene?.ground, width, height, elevation, segmentsX, segmentsY ]);

	return geometry;
}

export default useGenerateGeometry;