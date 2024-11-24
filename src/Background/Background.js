import { createCamera } from './components/camera.js'
import { createCube } from './components/cube.js'
import { createScene } from './components/scene.js'
import { createLights } from './components/lights.js'


import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'
import { createCSS3DRender } from './systems/css3drenderer.js'
import { createOrbitControl } from './systems/orbitControl.js'

import { AxesHelper } from 'three'

let camera
let renderer
let scene
let loop
let infoRenderer
let orbitControls

class Background {
  constructor(container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    infoRenderer = createCSS3DRender()
    container.append(renderer.domElement)

    orbitControls = createOrbitControl(camera, renderer.domElement)

    loop = new Loop(camera, scene, renderer, infoRenderer, orbitControls)
    const cube = createCube(camera, renderer)

    const light = createLights()

    // Axes
    const axesHelper = new AxesHelper( 20 )

    scene.add(cube, light, axesHelper)
    loop.updatables.push(cube)

    const resizer = new Resizer(container, camera, renderer, infoRenderer, cube)
    
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
