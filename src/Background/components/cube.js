import {
  BoxGeometry,
  Mesh,
} from 'three'
import { createMaterial } from './material'

const LIGHT_COLOR = 0xFF0000
const DARK_COLOR = 0x0000FF

function createCube(outside) {
  const geometry = new BoxGeometry(5, 5, 5, 10, 10, 10)
  const material = createMaterial(outside)
  const cube = new Mesh(geometry, material)

  let isX = true;
  let isY = false;
  let isZ = false;

  cube.transitioning = false
  cube.transitionColor = LIGHT_COLOR
  let index = 0
  let sign = 1

  window.addEventListener("change-color", () => {
    if (cube.material.wireframe == true) {
      cube.material.wireframe = false
    } else {
      cube.material.wireframe = true
    }
    cube.transitioning = true
  })
  cube.tick = (delta) => {
    const MAX_STRETCH = 10
    cube.rotation.z += 0.1 * delta
    cube.rotation.y += Math.sin(0.1 * delta)
    cube.rotation.x += 0.1 * delta
    cube.material.metalness = 0.5 + Math.sin(index) * delta
    // Handle scaling
    if (isX) {
      cube.scale.x += 1 * delta * sign;
    } else if (isY) {
      cube.scale.y += 1 * delta * sign;
    } else if (isZ) {
      cube.scale.z += 1 * delta * sign;
    }

    if (cube.scale.x < 1) {
      cube.scale.x = 1
      isX = false
      isY = true
      index = 0
      sign = 1
      console.log("from x to y")
    }
    if (cube.scale.y < 1) {
      cube.scale.y = 1;
      isY = false;
      isZ = true;
      index = 0;
      sign = 1
      console.log("from y to z")
    }
    if (cube.scale.z < 1) {
      cube.scale.z = 1;
      isZ = false;
      isX = true;
      index = 0;
      sign = 1
      console.log("from z to x")
    }
    if (cube.scale.x > MAX_STRETCH || cube.scale.y > MAX_STRETCH || cube.scale.z > MAX_STRETCH) {
      sign = -1
    }

    // Handle color transition
    if (cube.transitioning && outside) {
      let currentColor = cube.material.color.getHex();
      if (cube.transitionColor < currentColor) {
        cube.material.color.setHex(currentColor - 0x010000 + 0x000001);
      } else if (cube.transitionColor > currentColor) {
        cube.material.color.setHex(currentColor + 0x010000 - 0x000001);
      } else {
        console.log("Transition is over current: ", currentColor)
        cube.transitionColor = currentColor == DARK_COLOR ? LIGHT_COLOR : DARK_COLOR
        cube.transitioning = false;
      }
    }
    index = (index + 1) % 2 * Math.PI
  }

  return cube
}

export { createCube }