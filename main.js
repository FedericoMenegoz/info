import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const container = document.getElementById('container');

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 500);

// 3. WebGL Renderer (for 3D objects)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// 4. CSS3DRenderer (for DOM elements in 3D space)
const css3dRenderer = new CSS3DRenderer();
css3dRenderer.setSize(window.innerWidth, window.innerHeight);
css3dRenderer.domElement.style.position = 'absolute';
css3dRenderer.domElement.style.top = 0;
container.appendChild(css3dRenderer.domElement);

const light = new THREE.DirectionalLight('white')
light.position.set(0,0,1000)
light.lookAt(new THREE.Vector3(0,0,0))

// 5. Cube
const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: false });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube, light);

// 6. CSS3DObject
const div = document.getElementById('content');
div.className = 'css3d-object';
div.textContent = 'CSS3D Object';

const cssObject = new CSS3DObject(div);
cssObject.position.set(0, 0, 50); // Slightly above the cube
cube.add(cssObject);

// 7. Animate
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube and CSS3DObject
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  css3dRenderer.render(scene, camera);
}

scaleToContainer();
animate();

// 8. Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  css3dRenderer.setSize(window.innerWidth, window.innerHeight);
});




function scaleToContainer() {
  // Compute the bounding box
  cube.geometry.computeBoundingBox()
  const boundingBox = cube.geometry.boundingBox
  const currentDepth = boundingBox.max.z - boundingBox.min.z

  // Get the size of the bounding box
  const currentWidth = (boundingBox.max.x - boundingBox.min.x)
  const currentHeight = (boundingBox.max.y - boundingBox.min.y)
    
  // css3d 
  const prova = window.getComputedStyle(div)
  console.log(prova)
  const currentWidthDiv = (parseInt(prova.width))
  const currentHeightDiv = (parseInt(prova.height))

  const scaleXDiv = currentWidth / currentWidthDiv
  const scaleYDiv = currentHeight / currentHeightDiv
  console.log("current: ", currentWidthDiv, currentHeightDiv)
  cssObject.scale.set(scaleXDiv, scaleYDiv, 1)

}