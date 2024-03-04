import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

// Debugger init
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas#webgl');

// Scene
const scene = new THREE.Scene();
// X is red. Y is green. Z is blue.
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Lights
// rays coming from everywhere                    (does not have a direction)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// first_val from the top, second_val from the bottom (shade from everywhere)
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
scene.add(hemisphereLight);

// rays coming parallel from the same direction          (simulates the sun)
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// rays coming from a single point in all directions  (simulates a lighbulb)
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

// rays coming from a rectangular plane     (simulates photoshoot lightings)
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// rays coming from a single point in one direction (simulates a flashlight)
const spotLight = new THREE.SpotLight(0x78ff00, 3.5, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

// &plug debugger
gui
    .add(ambientLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('ambient light intensity');

gui
    .add(hemisphereLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('hemisphere light intensity');

gui
    .add(directionalLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('directional light intensity');

gui
    .add(pointLight, 'intensity')
    .min(0).max(5).step(0.001)
    .name('point light intensity');

gui
    .add(rectAreaLight, 'intensity')
    .min(0).max(15).step(0.001)
    .name('react area light intensity');

gui
    .add(spotLight, 'intensity')
    .min(0).max(10).step(0.001)
    .name('spot light intensity');

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
camera.position.set(1, 1, 2);
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