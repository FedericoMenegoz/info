import { Plane, Vector3 } from 'three'

class Resizer {
  constructor(container, camera, renderer, css3dRenderer, cube) {
    // set the initial size
    setSize(container, camera, renderer, css3dRenderer)
    setCubeSize(container, cube)

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer, css3dRenderer)
      setCubeSize(container, camera, cube)
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

const setCubeSize = (container, cube) => {
  const CONTAINER_WIDTH = container.clientWidth
  const CONTAINER_HEIGHT = container.clientHeight
  
  // I dunno how content is defined booooh! TODO understanddddd
  console.log("content:", content)
  const paddingX = parseFloat(window.getComputedStyle(content).paddingLeft);
  const paddingY = parseFloat(window.getComputedStyle(content).paddingBottom);

  // Compute the bounding box
  cube.geometry.computeBoundingBox()
  const boundingBox = cube.geometry.boundingBox
  const currentDepth = boundingBox.max.z - boundingBox.min.z
  const content3dElement = cube.children[0]
  console.log("cube max z: ",cube.geometry.boundingBox.max.z)
  console.log("cube min z: ",cube.geometry.boundingBox.min.z)
  console.log("content3dElement", content3dElement.position.z)
  // Adjust the size

  // Get the size of the bounding box
  const currentWidth = (boundingBox.max.x - boundingBox.min.x)
  const currentHeight = (boundingBox.max.y - boundingBox.min.y)

  const actualWitdh = CONTAINER_WIDTH - paddingX * 2
  const actualHeight = CONTAINER_HEIGHT - paddingY * 2

  const scaleX = actualWitdh / currentWidth
  const scaleY = actualHeight / currentHeight
  cube.scale.set(scaleX, scaleY, scaleX)

  // Put the cube inside the borders of the content div
  cube.position.z -= actualWitdh / 2
  console.log("cube position (x, y, z): ", cube.position)
  content3dElement.position.z = 0
  //cube.material.clippingPlanes = [new Plane(new Vector3(0,0,1), -cube.position.z)]
}

export { Resizer }