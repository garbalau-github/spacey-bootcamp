import '../css/style.css';
import * as THREE from 'three';

// Global Variables
const TORUS_COLOR = 0xff6347;
const STAR_COLOR = 0xffffff;

// Create scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas-background'),
});

// Controls
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// Draw
renderer.render(scene, camera);

// Background
const isBackground = false; // (optional)
const spaceTexture = new THREE.TextureLoader().load('/images/space.jpg');
if (isBackground) {
  scene.background = spaceTexture;
}

// Create Torus
const geometry = new THREE.TorusGeometry(10, 2, 40, 100);
const material = new THREE.MeshStandardMaterial({
  color: TORUS_COLOR,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

// Setup Lights
const pointLight = new THREE.PointLight(STAR_COLOR);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(STAR_COLOR);

// Create Stars
const createStarObject = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: STAR_COLOR });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(600).fill().forEach(createStarObject);

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
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

// Move Camera (on scroll)
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  javascript.rotation.z += 0.01;
  javascript.rotation.x += 0.01;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
};

// Animation Loop
const animateScene = () => {
  requestAnimationFrame(animateScene);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  javascript.rotation.x += 0.001;
  javascript.rotation.y += 0.001;
  javascript.rotation.z += 0.001;
  moon.rotation.x += 0.0001;
  renderer.render(scene, camera);
};

// Call our functions
document.body.onscroll = moveCamera;
moveCamera();
animateScene();

// Additional Positioning
moon.position.z = 30;
moon.position.setX(-10);
javascript.position.z = -5;
javascript.position.x = 2;

// Add objects to the scene
scene.add(torus);
scene.add(pointLight);
scene.add(ambientLight);
scene.add(javascript);
scene.add(moon);
