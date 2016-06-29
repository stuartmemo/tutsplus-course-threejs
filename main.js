'use strict';

var degreesToRadians = function (degrees) {
    return degrees * (Math.PI/180);
}

var dicePositions = {
    1: [ 0, degreesToRadians(270), 0],
    2: [ 0, degreesToRadians(90), 0],
    3: [ degreesToRadians(90), 0, 0],
    4: [ degreesToRadians(270), 0, 0],
    5: [ 0, 0, 0 ],
    6: [ degreesToRadians(180), 0, 0],
};

var createCamera = function () {
    var camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        100
    );

    camera.position.z = 100;

    return camera;
};

var createCube = function () {
    var textureLoader = new THREE.TextureLoader(),
        texture1 = textureLoader.load('textures/1.jpg'),
        texture2 = textureLoader.load('textures/2.jpg'),
        texture3 = textureLoader.load('textures/3.jpg'),
        texture4 = textureLoader.load('textures/4.jpg'),
        texture5 = textureLoader.load('textures/5.jpg'),
        texture6 = textureLoader.load('textures/6.jpg');

    var materials = [
        new THREE.MeshLambertMaterial({ map: texture1 }),
        new THREE.MeshLambertMaterial({ map: texture2 }),
        new THREE.MeshLambertMaterial({ map: texture3 }),
        new THREE.MeshLambertMaterial({ map: texture4 }),
        new THREE.MeshLambertMaterial({ map: texture5 }),
        new THREE.MeshLambertMaterial({ map: texture6 })
    ];

    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshFaceMaterial(materials)
    );

    return cube;
};

var createRenderer = function () {
    var renderer = new THREE.WebGLRenderer({alpha: true});

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('#container').appendChild(renderer.domElement);

    return renderer;
}

var generateResult = function () {
    return Math.floor(Math.random() * 6) + 1;
};

var rollDice = function (cube) {
    var tweens = [];

    for (var i = 0; i < 10; i++) {
        tweens.push(new TWEEN.Tween(cube.rotation).to({
            x: Math.floor(Math.random() * 6.283) + 1,
            y: Math.floor(Math.random() * 6.283) + 1,
            z: Math.floor(Math.random() * 6.283) + 1
        }, 120));

        if (i > 0 && i < 10) {
            tweens[i - 1].chain(tweens[i]);
        }
    }

    var result = generateResult();

    var finalTween = new TWEEN.Tween(cube.rotation).to({
            x: dicePositions[result][0],
            y: dicePositions[result][1],
            z: dicePositions[result][2]
        }, 120);

    tweens[9].chain(finalTween);
    tweens[0].start();
};

// Our drawing loop
var draw = function (renderer, scene, camera, cube) {
    renderer.render(scene, camera);

    window.requestAnimationFrame(function () {
        TWEEN.update();

        draw(renderer, scene, camera, cube);
    });
};

var scene = new THREE.Scene(),
    light = new THREE.PointLight(0xffffff, 1),
    camera = createCamera(),
    renderer = createRenderer(),
    cube = createCube();

light.position.set(0, 0, 50);

scene.add(camera);
scene.add(cube);
scene.add(light);

document.addEventListener('click', function () {
    rollDice(cube);
});

draw(renderer, scene, camera, cube);
