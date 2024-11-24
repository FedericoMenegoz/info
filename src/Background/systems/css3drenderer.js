import { CSS3DRenderer } from "three/examples/jsm/Addons.js";

function createCSS3DRender() {
  const infoRenderer = new CSS3DRenderer()
  infoRenderer.setSize(window.innerWidth, window.innerHeight)

  infoRenderer.domElement.style.position = 'absolute'
  infoRenderer.domElement.style.top = 0
  infoRenderer.domElement.style.pointerEvents = 'none'
  document.body.appendChild(infoRenderer.domElement)
  
  return infoRenderer
}

export { createCSS3DRender }