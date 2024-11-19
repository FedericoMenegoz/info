import { PlaneGeometry, Mesh, MeshStandardMaterial } from 'three'


function createPlane() {
  const geometry = new PlaneGeometry(100, 100)
  geometry.rotateY(1.55)
  const material = new MeshStandardMaterial( {
    color: 0xff0000,
    opacity: 0.6,
    transparent: true,
    roughness: 0.3,
    metalness: 0.7,
    envMapIntensity: 0.9
  })
  
  const plane = new Mesh(geometry, material)
  plane.position.x = -45


  return plane
}

export { createPlane }