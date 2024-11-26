const PADDINGX = 24
const PADDINGY = 32
class Resizer {
  constructor(container, camera, renderer, css3dRenderer, cube, contentDiv) {
    // set the initial size
    setSize(container, camera, renderer, css3dRenderer)
    fitDivToCube(container, cube, contentDiv)
    scaleToContainer(container, cube, PADDINGX, PADDINGY)

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer, css3dRenderer)
      scaleToContainer(container, cube, PADDINGX, PADDINGY)
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

export { Resizer }

function scaleToContainer(container, node, paddingX, paddingY) {
  const CONTAINER_WIDTH = container.clientWidth
  const CONTAINER_HEIGHT = container.clientHeight
  // Compute the bounding box of the cube
  node.geometry.computeBoundingBox()
  const boundingBox = node.geometry.boundingBox
  const currentWidth = (boundingBox.max.x - boundingBox.min.x)
  const currentHeight = (boundingBox.max.y - boundingBox.min.y)

  // Fit the cube correctly in the screen
  const actualWidth = CONTAINER_WIDTH - paddingX * 2
  const actualHeight = CONTAINER_HEIGHT - paddingY * 2
  const scaleX = actualWidth / currentWidth
  const scaleY = actualHeight / currentHeight
  node.scale.set(scaleX, scaleY, scaleX)
  node.position.z = -actualWidth / 2

}

function fitDivToCube(container, node, contentDiv3d) {
  const CONTAINER_WIDTH = container.clientWidth
  const CONTAINER_HEIGHT = container.clientHeight
  // Compute the bounding box of the cube
  node.geometry.computeBoundingBox()
  const boundingBox = node.geometry.boundingBox
  const currentDepth = boundingBox.max.z - boundingBox.min.z
  const currentWidth = (boundingBox.max.x - boundingBox.min.x)
  const currentHeight = (boundingBox.max.y - boundingBox.min.y)

  // Put the infoDiv into the face of the cube
  contentDiv3d.position.z = currentDepth / 2

  // Fit the div into the cube face
  const elementDiv = document.getElementById("content")
  const prova = window.getComputedStyle(elementDiv)
  const currentWidthDiv = (parseInt(prova.width))
  const currentHeightDiv = (parseInt(prova.height))

  const scaleXDiv = currentWidth / currentWidthDiv
  const scaleYDiv = currentHeight / currentHeightDiv
  contentDiv3d.scale.set(scaleXDiv, scaleYDiv, 1)
}