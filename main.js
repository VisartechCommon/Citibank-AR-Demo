var scene, camera, renderer;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var loader = new THREE.GLTFLoader();
    loader.load(
        'model/citi_logo_model.gltf',
        function (gltf) {
            var model = gltf.scene;

            model.position.set(0, 0, 0);
            model.scale.set(0.1, 0.1, 0.1);

            scene.add(model);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
}

function animate() {
    requestAnimationFrame(animate);

    scene.rotation.y += 0.005;

    renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

init();

animate();