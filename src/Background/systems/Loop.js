import { Clock } from "three"

const clock = new Clock()



class Loop {
  constructor(camera, scene, renderer, css3dRenderer, orbitControls) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.css3dRenderer = css3dRenderer
    this.orbitControls = orbitControls
    this.updatables = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()
      this.renderer.render(this.scene, this.camera)
      this.css3dRenderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    const delta = clock.getDelta()

    for (const object of this.updatables) {
      object.tick(delta)
    }
  }
}

export { Loop }