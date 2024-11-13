const maxWidth = 500; // Desired max width in pixels

// Set up Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Attach renderer to #3dphone container and set dynamic size
const container = document.getElementById('3dphone');
container.style.width = `${maxWidth}px`; // Set the container max width
container.style.height = `${maxWidth}px`; // Ensures initial square aspect
container.appendChild(renderer.domElement);

function resizeRenderer() {
  const width = container.clientWidth;
  const height = width / camera.aspect;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// Initial render size
resizeRenderer();

// Load and position the 3D model
const loader = new THREE.GLTFLoader();
loader.load(
  '/3d/scene.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(60, 60, 60);
    scene.add(model);

    model.rotation.y = Math.PI / 8;

    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the model:", error);
  }
);

// Brighter Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Camera position
camera.position.set(0, 1, 12);

// Responsive resizing
window.addEventListener('resize', resizeRenderer);
