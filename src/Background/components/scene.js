import { Scene, EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

function createEnvironment(scene) {
  // Load HDR Environment Map
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load('./assets/cannon_1k.hdr', function (texture) {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture; 
  });
}

function createScene() {
  const scene = new Scene()
  createEnvironment(scene)
  return scene
}

export { createScene }
