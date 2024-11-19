import { Background } from './Background/Background.js';


// Get a reference to the container element
const container = document.querySelector('#cube-container');

// 1. Create an instance of the World app
const world = new Background(container);

world.start()
