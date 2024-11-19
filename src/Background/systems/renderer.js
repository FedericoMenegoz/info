import { WebGLRenderer } from "three";

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true })
    // This is not needed? https://github.com/aframevr/aframe/issues/5546
    //renderer.physicallyCorrectLights = true
    renderer.setClearColor(0x000000, 0);
    renderer.localClippingEnabled = true
    return renderer
}

export { createRenderer }