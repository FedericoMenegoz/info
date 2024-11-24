import {
  BoxGeometry,
  Mesh,
  Vector3,
  Quaternion,
  MathUtils
} from 'three'
import { createMaterial } from './material'
import { createInfo } from '../domElements/info'

function createCube() {
  const geometry = new BoxGeometry(10, 10, 10)
  const material = createMaterial()
  const cube = new Mesh(geometry, material)
  const contentDiv = createInfo()

  cube.add(contentDiv)

  // Rotation setup
  const startQuaternion = cube.quaternion.clone() // Initial orientation
  const axis = new Vector3(0, 1, 0) // Y-axis
  const angle = Math.PI / 2 // 90 degrees
  const endQuaternion = new Quaternion().setFromAxisAngle(axis, angle).multiply(startQuaternion)

  // State tracking
  let progress = 1 // Progress from 0 to 1
  const rotationSpeed = 0.01 // Adjust rotation speed (higher = faster)
  let direction = -1 // 1 for forward, -1 for backward
  let previousQuaternion = cube.quaternion.clone()

  cube.tick = (delta) => {
    if (progress < 1) {
      progress += delta * rotationSpeed // Increment progress based on delta
      progress = Math.min(progress, 1) // Clamp progress to 1

      if (direction === 1) {
        cube.quaternion.slerp(endQuaternion, progress)
      } else {
        cube.quaternion.slerp(startQuaternion, progress)
      }

      // Calculate the cube's rotation for CSS transformation
      const rotationY = MathUtils.radToDeg(cube.rotation.y)

      previousQuaternion = cube.quaternion.clone()
    }
  }

  document.getElementById('rotate-box').addEventListener('click', () => {
    progress = 0
    direction *= -1
  })

  return cube
}

export { createCube }
