import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const container = document.getElementById('container');

// Scene
const scene = new THREE.Scene();

// 2. Camera
const PERSPECTIVE = 800
const fov = 180 * (2 * Math.atan(innerHeight / 2 / PERSPECTIVE)) / Math.PI
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, PERSPECTIVE);
document.body.style.perspective = `${PERSPECTIVE}px`

// WebGL Renderer 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// CSS3DRenderer 
const css3dRenderer = new CSS3DRenderer();
css3dRenderer.setSize(window.innerWidth, window.innerHeight);
css3dRenderer.domElement.style.position = 'absolute';
css3dRenderer.domElement.style.top = 0;
container.appendChild(css3dRenderer.domElement);

// Light
const light = new THREE.DirectionalLight('white')
light.position.set(0, 0, 1000)
light.lookAt(new THREE.Vector3(0, 0, 0))

// Cube
const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: false });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube, light);

// CSS3DObject
const div = document.getElementById('content');
div.className = 'css3d-object';
div.textContent = 'CSS3D Object';

const cssObject = new CSS3DObject(div);
cssObject.position.set(0, 0, 50); // Slightly above the cube
cube.add(cssObject);

renderer.setAnimationLoop(animate)
// Animate
function animate() {
  // Rotate the cube and CSS3DObject
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  css3dRenderer.render(scene, camera);
}

fitCSS3DObjectToCube();
scaleToContainer();
animate();

//  Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
  
  css3dRenderer.setSize(container.clientWidth, container.clientHeight);
  scaleToContainer()
});




function scaleToContainer(first) {
  
  // Compute the bounding box
  cube.geometry.computeBoundingBox()
  const boundingBox = cube.geometry.boundingBox

  // Get the size of the bounding box
  const currentWidth = (boundingBox.max.x - boundingBox.min.x)
  const currentHeight = (boundingBox.max.y - boundingBox.min.y)

  const paddingY = 36
  const paddingX = 24
  const wantedWidth = container.clientWidth - paddingX * 2
  const wantedHeight = container.clientHeight - paddingY * 2

  const scaleXBox = wantedWidth / currentWidth
  const scaleYBox = wantedHeight / currentHeight
  

  //cube.position.z = -wantedWidth / 2
  console.log(cube.position.z)
  cube.scale.set(scaleXBox, scaleYBox, 1)

}
function fitCSS3DObjectToCube() {

  // Compute the bounding box
  cube.geometry.computeBoundingBox()
  const boundingBox = cube.geometry.boundingBox

  // Get the size of the bounding box
  const currentWidth = (boundingBox.max.x - boundingBox.min.x)
  const currentHeight = (boundingBox.max.y - boundingBox.min.y)

  // css3d 
  const prova = window.getComputedStyle(div)
  const currentWidthDiv = (parseInt(prova.width))
  const currentHeightDiv = (parseInt(prova.height))

  // Fit the css3dOBject into the cube
  const scaleXDiv = currentWidth / currentWidthDiv
  const scaleYDiv = currentHeight / currentHeightDiv
  cssObject.scale.set(scaleXDiv, scaleYDiv, 1)
}