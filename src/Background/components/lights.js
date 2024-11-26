/**
 * Directional light is like the sun it will shine 
 * from light.position to light.target.position and 
 * default is (0,0,0) to (0,0,0)
 */
import { DirectionalLight } from "three"

function createLights(color = 'white') {

    const intensity = 0.2
    const light = new DirectionalLight(color, intensity) 

    light.position.set(400, 0, 800) // light is shining from (400, 0, 800) to (0, 0, 0)
    
    return light
}

export { createLights }