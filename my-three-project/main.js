var scene = new THREE.Scene();

var degreesToRadians = function (degrees) {
    return degrees * (Math.PI / 180);
};

var createCamera = function () {
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    return camera;
};

var createRenderer = function () {
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('#container').appendChild(renderer.domElement);

    return renderer;
};

var createLight = function () {
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 0, 50);

    return light;
};

var createCube = function () {
    var geometry = new THREE.BoxGeometry(20, 20, 20),
        material = new THREE.MeshNormalMaterial(),
        mesh = new THREE.Mesh(geometry, material);

    return mesh;
};

var draw = function (scene, camera, cube) {
    window.requestAnimationFrame(function () {
        cube.rotation.y = cube.rotation.y + 0.01;
        renderer.render(scene, camera);
        draw(scene, camera, cube);
    });
};

var camera = createCamera(),
    renderer = createRenderer(),
    light = createLight(),
    cube = createCube();

scene.add(light);
scene.add(camera);
scene.add(cube);

draw(scene, camera, cube);
