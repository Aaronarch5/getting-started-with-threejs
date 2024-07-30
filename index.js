import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add damping for smooth control
controls.dampingFactor = 0.25; // Adjust damping factor
controls.enableZoom = true; // Allow zooming
controls.enablePan = true; // Allow panning

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
});

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
scene.add(wireMesh); // Add wireMesh directly to the scene

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500, 1); // Adjust light intensity
scene.add(hemiLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Add a point light for better shading
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    const scale = Math.cos(t * 0.001) * 0.5 + 1; // Adjust scaling factor for better effect
    mesh.scale.setScalar(scale);
    wireMesh.scale.copy(mesh.scale); // Keep the wireframe mesh scaled the same

    controls.update(); // Update controls
    renderer.render(scene, camera);
}

animate();
