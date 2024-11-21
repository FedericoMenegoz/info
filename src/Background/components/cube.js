import {
  ExtrudeGeometry,
  Mesh,
  Shape,
} from 'three'
import { createMaterial } from './material'

const LIGHT_COLOR = 0xFF0000
const DARK_COLOR = 0x0000FF

function createCube() {  
  const width = 1
  const length = 2
  const shape = new Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0, width)
  shape.lineTo(length, width)
  shape.lineTo(length, 0)
  shape.lineTo(0.0)

  const extrudeSettings = {
    steps: 2,
    depth: 16,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1
  };
  const geometry = new ExtrudeGeometry(shape, extrudeSettings)

  const material = createMaterial()
  const cube = new Mesh(geometry, material)

  cube.tick = (delta) => {}
  return cube
}

export { createCube }