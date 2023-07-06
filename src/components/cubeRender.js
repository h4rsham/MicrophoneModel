import { render } from "@testing-library/react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"; // this is used to load the gltf model
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // this is used to control the camera

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let object;

let controls;

let objToRender = "microphoneGLTF";

const loader = new GLTFLoader();
loader.load(
  `${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // this is used to track the progress of the model loading
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// document.body.appendChild(renderer.domElement);
document.getElementById("3Dmic").appendChild(renderer.domElement);

camera.position.z = objToRender === "microphoneGLTF" ? 5 : 10;

// Lighting for the scene
// const topLight = new THREE.DirectionalLight(0xffffff, 2);
// topLight.position.set(0, 10, 0);
// const bottomLight = new THREE.DirectionalLight(0xffffff, 2);
// bottomLight.position.set(0, -10, 0);
// const backLight = new THREE.DirectionalLight(0xffffff, 2);
// backLight.position.set(0, 0, 10);
// const leftLight = new THREE.DirectionalLight(0xffffff, 2);
// leftLight.position.set(-10, 0, 0);
// const rightLight = new THREE.DirectionalLight(0xffffff, 2);
// rightLight.position.set(10, 0, 0);

// const ambientLight = new THREE.AmbientLight(0xffffff, 2);

// scene.add(bottomLight);
// scene.add(topLight);
// scene.add(leftLight);
// scene.add(rightLight);
// scene.add(ambientLight);

const lightPositions = [
  [15, 15, 15],
  [-15, 15, 15],
  [0, 15, -15],
  [15, -15, -15],
  [-15, -15, -15],
  [30, 0, 0],
  [-30, 0, 0],
  [0, 30, 0],
  [0, -30, 0],
  [0, 0, 30],
  [0, 0, -30],
  [15, 0, 15],
  [-15, 0, 15],
  [15, 0, -15],
  [-15, 0, -15],
];

const lights = [];

lightPositions.forEach((position) => {
  const light = new THREE.DirectionalLight(0xffffff, 0.2);
  light.position.set(position[0], position[1], position[2]);
  lights.push(light);
});

lights.forEach((light) => {
  scene.add(light);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// this is used to make the model look more realistic
renderer.setPixelRatio(window.devicePixelRatio);

if (objToRender === "microphoneGLTF") {
  controls = new OrbitControls(camera, renderer.domElement);
}

export default function Animate() {
  requestAnimationFrame(Animate);
  renderer.render(scene, camera); // this is used to render the scene every time the screen is refreshed
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// export default function Animate() {
//   const loader = new GLTFLoader();
//   loader.load(
//     "/microphoneGLTF/scene.gltf",
//     function (gltf) {
//       scene.add(gltf.scene);
//     },
//     undefined,
//     function (error) {
//       console.error(error);
//     }
//   );
// }

// export default function Animate() {
//   requestAnimationFrame(Animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
