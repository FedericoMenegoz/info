import * as THREE from 'three'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

const container = document.getElementById('cube-container')

const scene = new THREE.Scene()
scene.background = null

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Lower the intensity to soften light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Reduce intensity
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const camera = new THREE.PerspectiveCamera(100, container.clientWidth / container.clientHeight)
camera.position.set(1, 1, 50)
camera.lookAt(scene.position)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(container.clientWidth, container.clientHeight)
renderer.setClearColor(0x000000, 0)
console.log("width: ", container.clientWidth, "\nheight: ", container.clientHeight)
renderer.setAnimationLoop(animate)

renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '0'; // Ensure it’s between background and content
container.appendChild(renderer.domElement)

// Load HDR Environment Map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./assets/cannon_1k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping; // Important for reflections
  scene.environment = texture; // Use as environment for reflections
})

const geometry = new THREE.BoxGeometry(30, 30, 30)
const material = new THREE.MeshStandardMaterial({
  color: 0xAAAAAA,
  opacity: 0.3,
  transparent: true,

  roughness: 0.3,
  metalness: 0.7,
  // envMap: envMap, // important -- especially for metals!
  envMapIntensity: 0.9
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
let index = 0

let transitionColor = 0xAAAAAA
let transitioning = false

let isX = true
let isY = false
let isZ = false
renderer.localClippingEnabled = true
function animate() {
  let currentX = cube.scale.x
  let currentY = cube.scale.y
  let currentZ = cube.scale.z

  if (currentX < 1) {
    cube.scale.x = 1
    isX = false
    isY = true 
    index = 0
  }
  if (currentY < 1) {
    cube.scale.y = 1
    isY = false
    isZ = true
    index = 0
  }
  if (currentZ < 1) {
    cube.scale.z = 1
    isZ = false
    isX = true
    index = 0
  }
  cube.rotation.z += 0.0005
  cube.rotation.y += 0.0001
  cube.rotation.x += 0.001
  cube.material.metalness = 1 + Math.sin(index)*0.5
  // cube.material.roughness = Math.sin(index) 
  index += 0.0025

  if (isX) {
    cube.scale.x = 1 + Math.sin(index) * 10
  } else if (isY) {
    cube.scale.y = 1 + Math.sin(index) * 10
  } else if (isZ) {
    cube.scale.z = 1 + Math.sin(index) * 10
  }

  camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.005)
  renderer.render(scene, camera)

  // Handle color transition
  if (transitioning) {
    let currentColor = cube.material.color.getHex()
    if (transitionColor < currentColor) {
      cube.material.color.setHex(currentColor - 0x020202)
    }
    else if (transitionColor > currentColor) {
      cube.material.color.setHex(currentColor + 0x020202)
    } else {
      transitioning = false
    } 
  }

}

window.addEventListener('resize', () => {
  renderer.setSize(container.clientWidth, container.clientHeight)
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
});

document.getElementById("dark-button").addEventListener("click", () => {
  transitioning = true
  transitionColor = 0xA0A0A0
})
document.getElementById("light-button").addEventListener("click", () => {
  transitioning = true
  transitionColor = 0x222222
})