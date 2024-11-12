const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000); // Aspect ratio set to 1 for initial setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Set max width and calculate height based on aspect ratio
const maxWidth = 500; // Desired max width in pixels
const aspectRatio = camera.aspect; // Original aspect ratio (default to 1 for initialization)
renderer.setSize(maxWidth, maxWidth / aspectRatio); // Set width in pixels, height calculated to maintain aspect ratio
const container = document.getElementById('3dphone');
container.style.width = `${maxWidth}px`; // Apply max width to container for responsiveness
container.appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 0);

// Load the 3D model
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

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Set initial camera position for better framing of the model
camera.position.set(0, 1, 12);

window.addEventListener('resize', () => {
  const width = Math.min(maxWidth, window.innerWidth);
  const height = width / aspectRatio;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// CSS for the container
container.style.position = "relative";
container.style.overflow = "hidden";
container.style.objectFit = "contain";
container.style.maxWidth = `${maxWidth}px`; // Prevents exceeding max width on large screens
