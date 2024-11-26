import { MeshStandardMaterial } from "three";

function createMaterial() {
  //const texture = getAlphaTExture()
  let color = 0x222222

  const material = new MeshStandardMaterial({
    color: color,
    opacity: 0.3,
    transparent: true,
    roughness: 0.9,
    metalness: 1,
    envMapIntensity: 0.9,
    clipIntersection: true
  });

  window.addEventListener('change-color', () => {
    if (color === 0x222222) {
      color = 0xDDDDDD
    } else {
      color = 0x222222
    }
  })
  return material
}

export { createMaterial };
