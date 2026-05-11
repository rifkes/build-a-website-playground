import * as THREE from 'three';

// Simplex noise implementation
function noise(x, y) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  
  x -= Math.floor(x);
  y -= Math.floor(y);
  
  const u = fade(x);
  const v = fade(y);
  
  const A = p[X] + Y;
  const B = p[X + 1] + Y;
  
  return lerp(v, 
    lerp(u,
      grad(p[A], x, y),
      grad(p[B], x - 1, y)
    ),
    lerp(u,
      grad(p[A + 1], x, y - 1),
      grad(p[B + 1], x - 1, y - 1)
    )
  );
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t, a, b) {
  return a + t * (b - a);
}

function grad(hash, x, y) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

// Permutation table
const p = new Array(512);
const permutation = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
  129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,
  49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

for (let i = 0; i < 256; i++) {
  p[i] = permutation[i];
  p[i + 256] = permutation[i];
}

const createEnvMap = () => {
  const size = 512;
  const data = new Uint8Array(size * size * 4);
  const scale = 8; // Scale of the noise
  const octaves = 6; // Number of noise layers
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const stride = (i * size + j) * 4;
      
      // Generate fractal noise
      let noiseVal = 0;
      let amplitude = 1.0;
      let frequency = 1.0;
      let maxValue = 0;
      
      for (let o = 0; o < octaves; o++) {
        const x = (j * frequency * scale) / size;
        const y = (i * frequency * scale) / size;
        noiseVal += noise(x, y) * amplitude;
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2;
      }
      
      // Normalize noise value
      noiseVal = (noiseVal / maxValue + 1) * 0.5;
      
      // Create color based on noise value
      const hue = noiseVal;
      const h = hue * 6;
      const sector = Math.floor(h);
      const remainder = h - sector;
      const p = 0;
      const q = 1 - remainder;
      const t = remainder;

      let r, g, b;
      switch(sector) {
        case 0:
          r = 255; g = t * 255; b = p; break;
        case 1:
          r = q * 255; g = 255; b = p; break;
        case 2:
          r = p; g = 255; b = t * 255; break;
        case 3:
          r = p; g = q * 255; b = 255; break;
        case 4:
          r = t * 255; g = p; b = 255; break;
        default:
          r = 255; g = p; b = q * 255; break;
      }
      
      data[stride] = r;
      data[stride + 1] = g;
      data[stride + 2] = b;
      data[stride + 3] = 255;
    }
  }
  
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.needsUpdate = true;
  return texture;
};

export default createEnvMap;