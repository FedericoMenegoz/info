import { CSS3DObject } from "three/examples/jsm/Addons.js"



function createInfo() {
  const content = document.createElement('div')
  content.style.color = 'white'
  content.style.backgroundColor = 'red'
  const title = document.createElement('h1')
  title.textContent = "Prova del nove!"
  content.appendChild(title)
  

  const content3d = new CSS3DObject(content)
  console.log(content.matrixWorld)

  content3d.position.set(0,0,5)
  content3d.rotation.y = (Math.PI / 2)
  return content3d
}

export { createInfo }