import {
  BoxGeometry,
  Mesh,
  Vector3,
  Quaternion
} from 'three'
import { createMaterial } from './material'

function createCube(contentDiv) {
  const geometry = new BoxGeometry(100, 100, 100)
  const material = createMaterial()
  const cube = new Mesh(geometry, material)

  // Rotation setup
  const startQuaternion = cube.quaternion.clone() 
  const yAxis = new Vector3(0, 1, 0) 
  const angle = Math.PI / 2
  const endQuaternion = new Quaternion().setFromAxisAngle(yAxis, angle).multiply(startQuaternion)

  // State tracking
  let progress = 1
  const rotationSpeed = 0.01 
  let direction = -1 

  cube.tick = (delta) => {
    if (progress < 1) {
      progress += delta * rotationSpeed 
      progress = Math.min(progress, 1) 

      if (direction === 1) {
        cube.quaternion.slerp(endQuaternion, progress)
      } else {
        cube.quaternion.slerp(startQuaternion, progress)
      }

      // Hide div content when the face go on the side
      if (cube.rotation.y > Math.PI / 4 && direction === 1 ) {
        contentDiv.classList.add('opacity-0')
      } else if (cube.rotation.y < Math.PI / 2.5 && direction === -1) {
        contentDiv.classList.remove('opacity-0')
      }
    }
  }

  document.getElementById('rotate-box').addEventListener('click', () => {
    progress = 0
    direction *= -1
  })

  return cube
}

export { createCube }
