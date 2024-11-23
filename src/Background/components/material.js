import { MeshStandardMaterial, RepeatWrapping, TextureLoader } from "three";

// const getAlphaTExture = () => {
//   const alphaTexture = new TextureLoader().load("assets/concrete_alpha_texture.jpg")
//   alphaTexture.wrapS = RepeatWrapping
//   alphaTexture.wrapT = RepeatWrapping
//   alphaTexture.repeat.set(20, 20)
//   return alphaTexture
// }

function createMaterial() {
  //const texture = getAlphaTExture()
  let color = 0x0000FF

  const material = new MeshStandardMaterial({
    color: color,
    opacity: 0.2,
    transparent: true,
    roughness: 0.3,
    metalness: 1,
    envMapIntensity: 0.9,
    clipIntersection: true
  });


  return material
}

export { createMaterial };
