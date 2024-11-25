import { CSS3DObject } from "three/examples/jsm/Addons.js"
import { Vector3, Quaternion, MathUtils } from "three"



function createInfo() {
  const contentNode = document.getElementById('content')
  contentNode.setAttribute("id", "content")
  contentNode.classList.add("bg-red-400", "p-8", "w-full", "h-dvh")
  const contentDiv = document.createElement('div')

  contentNode.classList.add("relative", "bg-purple", "border-2", "border-border", "text-2xl", "flex", "flex-col", "items-start", "gap-2", "p-2")
  contentNode.classList.add("gap-2", "p-10", "text-sm")
  
  const title = document.createElement('h1')
  title.innerText = "Non so progettare i box."

  contentNode.appendChild(contentDiv)
  contentDiv.appendChild(title)

  const content3d = new CSS3DObject(contentNode)


  return content3d
}

export { createInfo }