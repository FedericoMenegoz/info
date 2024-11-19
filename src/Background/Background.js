import { createCamera } from './components/camera.js'
import { createCube } from './components/cube.js'
import { createScene } from './components/scene.js'
import { createLights } from './components/lights.js'
import { createPlane } from './components/plane.js'

import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'
import { createEffectCompose } from './components/effectCompose.js'


// These variables are module-scoped: we cannot access them
// from outside the module
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
    const insideCube = createCube(false)
    const outsideCube = createCube(true)
    const light = createLights()
    scene.add(insideCube, outsideCube, light)
    loop.updatables.push(insideCube, outsideCube)

    const resizer = new Resizer(container, camera, renderer, insideCube, outsideCube)
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
