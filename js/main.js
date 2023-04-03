import * as THREE from 'three';
import { getRandomColor } from './utils/getRandomColor.js';
import { LIGHT_COLOR } from './constants/index.js';

const contents = document.querySelector('#contents');
const loader = document.querySelector('#load');
const canvas = document.querySelector('#canvas-background');
const button = document.querySelector('#toggle-space');

// Background Setup
let isBackground = false;
const spaceTexture = new THREE.TextureLoader().load('/images/space.jpg');

// Button Event Listener (toggle background)
button.addEventListener('click', () => {
  isBackground = !isBackground;
  if (isBackground) {
    scene.background = spaceTexture;
  } else {
    scene.background = null;
  }
});

document.onreadystatechange = () => {
  if (document.readyState == 'interactive') {
    contents.style.visibility = 'hidden';
  }
  if (document.readyState == 'complete') {
    setTimeout(() => {
      loader.style.visibility = 'hidden';
      contents.style.visibility = 'visible';
    }, 500);
  }
};

// Create scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

// Controls
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// Draw
renderer.render(scene, camera);

// Create Torus
const geometry = new THREE.TorusGeometry(15, 2, 20, 100);
const material = new THREE.MeshStandardMaterial({
  color: getRandomColor(),
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

// Setup Lights
const pointLight = new THREE.PointLight(LIGHT_COLOR);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(LIGHT_COLOR);

// Create Stars
const createStarObject = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: getRandomColor(),
  });
  const star = new THREE.Mesh(geometry, material);

  const numOfValues = 3;
  const rangeOfValues = 175;

  const randomValues = Array(numOfValues)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(rangeOfValues));

  const [x, y, z] = randomValues;

  star.position.set(x, y, z);
  scene.add(star);
};

// JavaScript Object
const javascriptTexture = new THREE.TextureLoader().load(
  './images/javascript.png'
);
const javascript = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ map: javascriptTexture })
);

// Moon Object
const moonTexture = new THREE.TextureLoader().load('./images/moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 50, 50),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

// Move Camera (on scroll)
const moveCamera = () => {
  // Get the top of the page
  const topOfThePage = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.005;
  javascript.rotation.z += 0.01;
  javascript.rotation.x += 0.01;
  camera.position.z = topOfThePage * -0.011;
  camera.position.x = topOfThePage * -0.0002;
  camera.rotation.y = topOfThePage * -0.0002;
};

// Animation Loop
const animateScene = () => {
  requestAnimationFrame(animateScene);
  torus.rotation.x += 0.003;
  torus.rotation.y += 0.003;
  torus.rotation.z += 0.003;
  javascript.rotation.x += 0.001;
  javascript.rotation.y += 0.001;
  javascript.rotation.z += 0.001;
  moon.rotation.x += 0.005;
  renderer.render(scene, camera);
};

// Additional Positioning
torus.position.z = 0;
moon.position.z = 40;
moon.position.setX(-10);
javascript.position.z = -5;
javascript.position.x = 2;

// Add objects to the scene
scene.add(torus);
scene.add(pointLight);
scene.add(ambientLight);
scene.add(javascript);
scene.add(moon);

// Call our functions
document.body.onscroll = moveCamera;
moveCamera();
animateScene();

// Create stars
Array(1500)
  .fill()
  .forEach(() => createStarObject());
