import { createCamera } from './components/camera.js'
import { createCube } from './components/cube.js'
import { createScene } from './components/scene.js'
import { createLights } from './components/lights.js'


import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'
import { createCSS3DRender } from './systems/css3drenderer.js'
import { createOrbitControl } from './systems/orbitControl.js'
import { createInfo } from './domElements/info.js'
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

    //orbitControls = createOrbitControl(camera, renderer.domElement)

    loop = new Loop(camera, scene, renderer, infoRenderer/*, orbitControls*/)
    const contentDiv = createInfo()
    const cube = createCube(contentDiv.element)
    const light = createLights()
    
    cube.add(contentDiv)

    //const axesHelper = new AxesHelper( 100 )

    scene.add(cube, light/*, axesHelper*/)
    loop.updatables.push(cube)

    const resizer = new Resizer(container, camera, renderer, infoRenderer, cube, contentDiv)
    
  }
  start() {
    loop.start()
  }
  stop() {
    loop.stop()
  }
}

export { Background }
