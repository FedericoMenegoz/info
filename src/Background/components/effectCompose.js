import { Vector2, WebGLRenderTarget, HalfFloatType, RGBAFormat } from "three"
import { UnrealBloomPass, RenderPass } from "three/examples/jsm/Addons.js"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"

const params = {
  threshold: 0,
  strength: 1,
  radius: 0,
  exposure: 1
}

function createEffectCompose(renderer, scene, camera) {
  const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
    type: HalfFloatType,
    format: RGBAFormat
  })
  target.samples = 8

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 0.4, 1, 2); // strength, radius ,threshold

  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  return composer
}

export { createEffectCompose }