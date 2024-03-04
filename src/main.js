import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

// Debugger inir
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas#webgl');

// Scene
const scene = new THREE.Scene();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

// Window
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Rendere
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock    = new THREE.Clock();
const animLoop = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // rotate objects
    sphere.rotation.y = 0.1 * elapsedTime;
    cube.rotation.y   = 0.1 * elapsedTime;
    torus.rotation.y  = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    cube.rotation.x   = 0.15 * elapsedTime;
    torus.rotation.x  = 0.15 * elapsedTime;

    // enable damping
    controls.update();

    // call animLoop again on the next frame
    renderer.render(scene, camera);
    window.requestAnimationFrame(animLoop);
}

animLoop();