import { createCamera } from './components/camera.js'
import { createCube } from './components/cube.js'
import { createScene } from './components/scene.js'
import { createLights } from './components/lights.js'
import { createPlane } from './components/plane.js'

import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'

let camera
let renderer
let scene
let loop

class Background {
  constructor(container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    container.append(renderer.domElement)

    loop = new Loop(camera, scene, renderer)
    const cube = createCube(camera, renderer)

    const light = createLights()
    scene.add(cube, light)
    loop.updatables.push(cube)

    const resizer = new Resizer(container, camera, renderer, cube)
    
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera)
  }
}

export { Background }

const rotate = (cube) => {
  console.log("rotating")
  cube.rotation.y += Math.PI
}