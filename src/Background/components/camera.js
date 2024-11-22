// Tutorial to understand perspective camera
// https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/opengl-perspective-projection-matrix.html
import { PerspectiveCamera } from 'three'

function createCamera() {
  const PERSPECTIVE = 600
  const fov = 180 * ( 2 * Math.atan( innerHeight / 2 / PERSPECTIVE ) ) / Math.PI
  const camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000)

  camera.position.set( 0, 0, PERSPECTIVE );
  document.body.style.perspective = `${PERSPECTIVE}px`
  return camera;
}

export { createCamera }
