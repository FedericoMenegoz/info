import { CSS3DObject } from "three/examples/jsm/Addons.js"
import { Vector3, Quaternion, MathUtils } from "three"



function createInfo() {
  const contentNode = document.getElementById('content')

  const content3d = new CSS3DObject(contentNode)


  content3d.position.set(0, 0, 5)
  content3d.rotation.y = 0
  
  return content3d
}

export { createInfo }