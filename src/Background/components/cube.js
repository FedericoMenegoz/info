import {
  BoxGeometry,
  Mesh,
  Vector3,
  Quaternion,
  MathUtils
} from 'three'
import { createMaterial } from './material'

function createCube(camera, renderer) {
  const geometry = new BoxGeometry(100, 100, 100)
  const material = createMaterial()
  const cube = new Mesh(geometry, material)
  const contentDiv = document.getElementById('content-div')

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

      // Get the position of the cube's center in world coordinates
      const worldPosition = new Vector3()
      cube.getWorldPosition(worldPosition)
      console.log(worldPosition)

      // Project the world position into normalized device coordinates (NDC)
      camera.updateMatrixWorld()
      const screenPosition = worldPosition.clone().project(camera)

      // Map the NDC (-1 to 1) to screen space (pixels)
      const widthHalf = renderer.domElement.clientWidth / 2
      const x = screenPosition.x * widthHalf + widthHalf

      // Calculate the cube's rotation for CSS transformation
      const rotationY = MathUtils.radToDeg(cube.rotation.y)

      // Apply the computed position and rotation to the contentDiv
      contentDiv.style.transform = `translate3d(${x}px, 0, ${y}px) rotateY(${rotationY}deg)`

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
