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

const camera = new THREE.PerspectiveCamera( 100, container.clientWidth / container.clientHeight )
camera.position.set(1, 1, 100)
camera.lookAt( scene.position )

const renderer = new THREE.WebGLRenderer()
renderer.setSize( container.clientWidth, container.clientHeight )
renderer.setClearColor(0x000000, 0)
console.log("width: ",  container.clientWidth, "\nheight: ", container.clientHeight)
renderer.setAnimationLoop( animate )

renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '10'; // Ensure it’s between background and content
container.appendChild( renderer.domElement )

// Load HDR Environment Map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./assets/cannon_1k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping; // Important for reflections
  scene.environment = texture; // Use as environment for reflections
})

const geometry = new THREE.BoxGeometry( 80, 80, 80)
const material = new THREE.MeshStandardMaterial( { 
    color: 0x111111,

    roughness: 0.9,
    metalness: 0.7,

    // roughnessMap: roughnessMap,
    // metalnessMap: metalnessMap,

    // envMap: envMap, // important -- especially for metals!
    envMapIntensity: 0.2
} )
const cube = new THREE.Mesh( geometry, material )
scene.add( cube )
let index = 0

function animate() {

	cube.rotation.z += 0.0005
	cube.rotation.y += 0.0001
	cube.rotation.x += 0.001
    cube.material.metalness = Math.sin(index)
    //cube.material.roughness = Math.sin(Math.tan(index))
    index += 0.01

    camera.rotateOnAxis(new THREE.Vector3(0,0,1), 0.01)

	renderer.render( scene, camera )

}

window.addEventListener('resize', () => {
    renderer.setSize(container.clientWidth, container.clientHeight)
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
  });