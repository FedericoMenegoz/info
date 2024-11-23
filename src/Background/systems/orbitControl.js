import { OrbitControls } from "three/examples/jsm/Addons.js";

function createOrbitControl(camera, rendererDomElement) {

  const orbitControls = new OrbitControls(camera, rendererDomElement)
  orbitControls.update()

  return orbitControls
}

export { createOrbitControl }