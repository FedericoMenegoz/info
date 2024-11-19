import { Scene, EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

function createEnvironment(scene) {
  // Load HDR Environment Map
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load('./assets/cannon_1k.hdr', function (texture) {
    texture.mapping = EquirectangularReflectionMapping; // Important for reflections
    scene.environment = texture; // Use as environment for reflections
  });
}

function createScene() {
  const scene = new Scene()
  scene.background = 0x111111
  createEnvironment(scene)
  return scene
}

export { createScene }
