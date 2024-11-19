import { OrthographicCamera } from 'three'

function createCamera() {
  const camera = new OrthographicCamera()

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 100);
  
  return camera;
}

export { createCamera }
