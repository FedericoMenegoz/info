class Resizer {
  constructor(container, camera, renderer, css3dRenderer, cube, contentDiv) {
    // set the initial size
    setSize(container, camera, renderer, css3dRenderer)
    setCubeSize(container, cube, contentDiv)

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer, css3dRenderer)
      setCubeSize(container, cube, contentDiv)
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

const setCubeSize = (container, cube, contentDiv3d) => {
  console.log(contentDiv3d)
  const contentDiv = contentDiv3d.element
  const paddingX = 24
  const paddingY = 32

  scaleToContainer(container, cube, paddingX, paddingY, contentDiv3d)
  
}

export { Resizer }

function scaleToContainer(container, node, paddingX, paddingY, contentDiv3d) {
  const CONTAINER_WIDTH = container.clientWidth
  const CONTAINER_HEIGHT = container.clientHeight
  // Compute the bounding box
  node.geometry.computeBoundingBox()
  const boundingBox = node.geometry.boundingBox
  const currentDepth = boundingBox.max.z - boundingBox.min.z

  // Get the size of the bounding box
  const currentWidth = (boundingBox.max.x - boundingBox.min.x)
  const currentHeight = (boundingBox.max.y - boundingBox.min.y)

  const actualWitdh = CONTAINER_WIDTH - paddingX * 2
  const actualHeight = CONTAINER_HEIGHT - paddingY * 2

  const scaleX = actualWitdh / currentWidth
  const scaleY = actualHeight / currentHeight
  node.scale.set(scaleX, scaleY, scaleX)
  
  node.position.z -= actualWitdh / 2
  
  contentDiv3d.position.z = currentDepth / 2
  
  // css3d 
  const elementDiv = document.getElementById("content")
  const prova = window.getComputedStyle(elementDiv)
  console.log(prova)
  const currentWidthDiv = (parseInt(prova.width))
  const currentHeightDiv = (parseInt(prova.height))

  const actualWidthDiv = CONTAINER_WIDTH - paddingX * 2
  const actualHeightDiv = CONTAINER_HEIGHT - paddingY * 2

  const scaleXDiv = actualWidthDiv / currentWidthDiv
  const scaleYDiv = actualHeightDiv / currentHeightDiv
  console.log("current: ", currentWidthDiv, currentHeightDiv)
  console.log("current: ", actualWidthDiv, actualHeightDiv)
  contentDiv3d.scale.set(scaleXDiv * 0.15, scaleYDiv * 0.15, 1)

}
