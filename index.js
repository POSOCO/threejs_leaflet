/**
 * Created by Nagasudhir on 2/24/2017.
 */

// creating the tile layers
var osmTileLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {id: 'map'});
var mapStackTileLayer = L.tileLayer("http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png", {id: 'map'});

// initialising the map and its global variable
var leafletMap = L.map('map').setView([21.14599216495789, 76.343994140625], 6);

// adding tile layer to the map
mapStackTileLayer.addTo(leafletMap);

//Three js stuff
var container = document.getElementById('maskCanvas');
var scene = new THREE.Scene();
var viewSize = 10;
var aspectRatio = container.clientWidth / container.clientHeight;
var camera = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2, viewSize / 2, viewSize / -2, -100, 100);
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor(0x000000, 0); // the default
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

var planeGeometry = new THREE.PlaneGeometry(viewSize*aspectRatio, viewSize);
var planeMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff, specular: 0x111111, shininess: 50});
planeMaterial.transparent = true;
planeMaterial.opacity = 0.5;
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

var c1 = 0xaa5500;
var decay = 2;
var intensity = 1.0;
var distance = 1000;
var sphere = new THREE.SphereGeometry(0.05, 16, 8);
var light1 = new THREE.PointLight(c1, intensity, distance, decay);
scene.add(light1);

light1.position.x = 0;
light1.position.y = 0;
light1.position.z = 1;

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;

var render = function () {
    requestAnimationFrame(render);

    if (light1.position.x > 10) {
        light1.position.x = -11;
    }
    light1.translateX(0.05);

    renderer.render(scene, camera);
};

render();