// Tutorial to understand perspective camera
// https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/opengl-perspective-projection-matrix.html
import { PerspectiveCamera } from 'three'

function createCamera() {
  const PERSPECTIVE = 800
  const fov = 180 * ( 2 * Math.atan( innerHeight / 2 / PERSPECTIVE ) ) / Math.PI
  
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)

  camera.position.set( 0, 0, 800 );
  document.body.style.perspective = `${PERSPECTIVE}px`
  return camera;
}

export { createCamera }
