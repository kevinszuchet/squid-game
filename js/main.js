const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer should be the size of our window.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xb7c3f3, 1)

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

camera.position.z = 5;

const loader = new THREE.GLTFLoader();

class Doll {
  constructor() {
    loader.load("../models/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(.4, .4, .4);
      gltf.scene.position.set(0, -1, 0);
      this.doll = gltf.scene;
    });
  }

  lookBackward() {
    gsap.to(this.doll.rotation, { y: -3.15, duration: .45 });
  }

  lookForward() {
    gsap.to(this.doll.rotation, { y: 0, duration: .45 });
  }
}

// global
const startPosition = 3;
const endPosition = -startPosition;

function createCube(size, positionX, rotationY = 0, color = 0xfbc851) {
  const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
  const material = new THREE.MeshBasicMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(positionX, 0, 0);
  cube.rotation.set(0, rotationY, 0);
  scene.add(cube);
  return cube;
}

function createTrack() {
  createCube({ w: startPosition * 2 + .2, h: 1.5, d: 1 }, 0, 0, 0xe5a716).position.z = -1;
  createCube({ w: .2, h: 1.5, d: 1}, startPosition, -.35);
  createCube({ w: .2, h: 1.5, d: 1}, endPosition, .35);
}

createTrack();

let doll = new Doll();
setTimeout(() => {
  doll.lookBackward();
}, 1000)

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
} 

animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}