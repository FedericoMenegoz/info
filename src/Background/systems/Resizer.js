import { Plane, Vector3 } from 'three'

class Resizer {
  constructor(container, camera, renderer, css3dRenderer) {
    // set the initial size
    setSize(container, camera, renderer, css3dRenderer)
    //setCubeSize(container, camera, cube)

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer, css3dRenderer)
      //setCubeSize(container, camera, cube)
    })
  }
}

const setSize = (container, camera, renderer, css3dRenderer) => {
  const CONTAINER_WIDTH = container.clientWidth
  const CONTAINER_HEIGHT = container.clientHeight
  renderer.setSize(CONTAINER_WIDTH, CONTAINER_HEIGHT)
  const aspect = CONTAINER_WIDTH / CONTAINER_HEIGHT

  // for OrthographicCamera https://discourse.threejs.org/t/solved-how-to-resize-window-correctly-when-using-orthographiccamera/19729
  // camera.left = 20 * aspect / -2
  // camera.right = 20 * aspect / 2
  // camera.top = 20 * aspect / 2
  // camera.bottom = 20 * aspect / -2
  // for PerspectiveCamera
  camera.aspect = aspect
  camera.updateProjectionMatrix()
  css3dRenderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}

const setCubeSize = (container, camera, cube) => {
  const CONTAINER_WIDTH = container.clientWidth
  const CONTAINER_HEIGHT = container.clientHeight

  const content = document.getElementById('content')
  const paddingX = parseFloat(window.getComputedStyle(content).paddingLeft);
  const paddingY = parseFloat(window.getComputedStyle(content).paddingBottom);


  // Compute the bounding box
  cube.geometry.computeBoundingBox()
  const boundingBox = cube.geometry.boundingBox
  const currentDepth = boundingBox.max.z - boundingBox.min.z
  

  // Adjust the size

  // Get the size of the bounding box
  const currentWidth = (boundingBox.max.x - boundingBox.min.x)
  const currentHeight = (boundingBox.max.y - boundingBox.min.y)

  const actualWitdh = CONTAINER_WIDTH - paddingX * 2
  const actualHeight = CONTAINER_HEIGHT - paddingY * 2

  const scaleX = actualWitdh / currentWidth
  const scaleY = actualHeight / currentHeight
  console.log(scaleX, scaleY)
  cube.scale.set(scaleX, scaleY, scaleX)
  // Put the cube inside the borders of the content div
  console.log(cube.position.z)
  cube.position.z -= actualWitdh / 2
  console.log(cube.position.z)

  cube.material.clippingPlanes = [new Plane(new Vector3(0,0,1), -cube.position.z)]


}

export { Resizer }