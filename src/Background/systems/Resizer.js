import { Plane, Vector3 } from 'three'
import { map } from '../util/map'

class Resizer {
  constructor(container, camera, renderer, insideCube, outsideCube) {
    // set the initial size
    setSize(container, camera, renderer)
    setClippingPlanes(container, camera, insideCube, outsideCube)

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer)
      setClippingPlanes(container, camera, insideCube, outsideCube)
    })
  }
}

const setSize = (container, camera, renderer) => {
  const CONTAINER_WIDTH = container.clientWidth
  const CONTAINER_HEIGHT = container.clientHeight
  renderer.setSize(CONTAINER_WIDTH, CONTAINER_HEIGHT)
  const aspect = CONTAINER_WIDTH / CONTAINER_HEIGHT

  // for OrthographicCamera https://discourse.threejs.org/t/solved-how-to-resize-window-correctly-when-using-orthographiccamera/19729
  camera.left = 20 * aspect / -2
  camera.right = 20 * aspect / 2
  camera.top = 20 * aspect / 2
  camera.bottom = 20 * aspect / -2
  // for PerspectiveCamera
  //camera.aspect = aspect
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(window.devicePixelRatio)
}

const setClippingPlanes = (container, camera, insideCube, outsideCube) => {
  const CONTAINER_WIDTH = container.clientWidth
  const CONTAINER_HEIGHT = container.clientHeight

  const content = document.getElementById('content')
  const paddingX = parseFloat(window.getComputedStyle(content).paddingLeft);
  const paddingY = parseFloat(window.getComputedStyle(content).paddingBottom);

  // Mapping the padding to the OrthographicCamera values (default are -1 to 1)
  const widthPaddingInWorldUnits = map(paddingX, 0, CONTAINER_WIDTH, camera.right, camera.left)
  const heightPaddingInWorldUnits = map(paddingY, 0, CONTAINER_HEIGHT, camera.top, camera.bottom)

  // Creating 4 planes to clip the cube
  const clippingPlanes = (sign) => [
    new Vector3(1, 0, 0),
    new Vector3(-1, 0, 0),
    new Vector3(0, 1, 0),
    new Vector3(0, -1, 0)
  ].map((it) => {
    return new Plane(it, (Math.abs(it.x) * widthPaddingInWorldUnits + Math.abs(it.y) * heightPaddingInWorldUnits) * sign)
  })
  insideCube.material.clippingPlanes = clippingPlanes(1)
  outsideCube.material.clippingPlanes = clippingPlanes(-1)
}

export { Resizer }