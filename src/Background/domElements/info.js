import { CSS3DObject } from "three/examples/jsm/Addons.js"


function createInfo() {
  const contentNode = document.getElementById('content')

  contentNode.classList.add("bg-background", "w-full", "h-dvh", "transition-opacity", "duration-1000", "z-40")
  const contentDiv = document.createElement('div')
  
  contentDiv.classList.add("relative","w-full", "h-full", "border-2", "border-border", "text-2xl", "flex", "flex-col", "items-start", "gap-2", "p-2")
  
  const title = document.createElement('h1')
  title.classList.add("text-text-primary", "text-2xl", "text-tomorrow")
  title.innerText = "Federico Menegoz"
  const subTitle = document.createElement('h2')
  subTitle.classList.add("text-text-secondary", "text-tomorrow", "text-xs", "font-thin")
  subTitle.innerText = "Full Stack Developer"
  contentNode.appendChild(contentDiv)
  contentDiv.appendChild(title)
  contentDiv.appendChild(subTitle)

  const content3d = new CSS3DObject(contentNode)

  return content3d
}

export { createInfo }