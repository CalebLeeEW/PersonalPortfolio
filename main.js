import './style.css'

import * as THREE from 'three';
// Allow you to move around the screen with a mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//call function when the page starts
window.onload = function() {

};

// Scene is a container that hold all your objects, camera and lights
const scene = new THREE.Scene();

// Perspective camera acts a like the human eye
// Accepts 3 arguments 1. Field of view (amount of the world visible based of 360 degrees)
// 2. Aspect ratio base of user browser window
// 3. View frustum (How far can the camera see)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);
camera.position.setX(-3);

// Renderer to rend out the graphics to the scene
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
});

renderer.render(scene, camera);
//Define torus shape diamansions
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//Material that will react to light bouncing off of it
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
//Instantiate torus
const torus = new THREE.Mesh( geometry, material);
//Add a torus into the scene
scene.add(torus);
//PointLight is a light that gets emitted from a single point in all directions. 
//A common use case for this is to replicate the light emitted from a bare lightbulb.
//Add PointLight colour  
const pointLight = new THREE.PointLight(0xffffff);
//Set PointLight position
pointLight.position.set(0, 0, 0)

//AmbientLight- This light globally illuminates all objects in the scene equally
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//Show the position and direction of the light source
const lightHelper = new THREE.PointLightHelper(pointLight)
//Draws a two dimentional grid unto the scene
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

//Listen on dom event on the mouse and update the camera position accordingly
const controls = new OrbitControls(camera, renderer.domElement);

//Function that randomly generate large amount of objects in the scene
// function addStar() {
//     //Define sphere shape diamansions
//     const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//     //Material that will react to light bouncing off of it
//     const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
//     //Instantiate star
//     const star = new THREE.Mesh( geometry, material);
//     //Randomly generate x, y, z values 
//     const [x, y, z] = Array(3).fill().map( () => 
//         //Randomly generate number between -100 to 100
//         THREE.MathUtils.randFloatSpread( 100 )
//     );
//     star.position.set(x, y, z);
//     scene.add(star)
// }
// //Create array of 200 value and for each value add a star
// Array(200).fill().forEach(addStar);

// //Add a texture into the scene background
// // instantiate a loader
// const mountainLoader = new THREE.TextureLoader();
// // load a resource
// mountainLoader.load(
// 	// resource URL
// 	'images/mount_kinabalu.jpg',
// 	// onLoad callback
// 	function ( texture ) {
// 		scene.background = texture;
// 	},
// 	// onError callback
// 	function ( err ) {
// 		console.error( 'background error: ' + err );
// 	}
// );
//For sky box
const materialArray = [];
const texture_ft = new THREE.TextureLoader().load('images/desertdawn_ft.jpg')
const texture_bk = new THREE.TextureLoader().load('images/desertdawn_bk.jpg')
const texture_up = new THREE.TextureLoader().load('images/desertdawn_up.jpg')
const texture_dn = new THREE.TextureLoader().load('images/desertdawn_dn.jpg')
const texture_rt = new THREE.TextureLoader().load('images/desertdawn_rt.jpg')
const texture_lf = new THREE.TextureLoader().load('images/desertdawn_lf.jpg')

materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

for(let i=0; i<6; i++){
  materialArray[i].side = THREE.BackSide;
}

const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
const skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox)

//Create caleb texture
const calebTexture = new THREE.TextureLoader().load('images/caleb.jpg')

//Texture mapping is a method for defining high frequency detail, 
//surface texture, or color information on a computer-generated graphic or 3D model.
//Add calebTexture to the cube faces
const caleb = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: calebTexture })
);
scene.add(caleb);
//Change caleb instance position
caleb.position.z = -5;
caleb.position.x = 2;

// const sunTexture = new THREE.TextureLoader().load('images/sun_surface.jpg');
// const normalTexture = new THREE.TextureLoader().load('images/normal.jpg')
// const sun = new THREE.Mesh(
//     new THREE.SphereGeometry(3, 32, 32),
//     new THREE.MeshStandardMaterial({ 
//         map: sunTexture,
//         normalMap: normalTexture 
//     })
// );
// scene.add(sun);
// //Change sun instance position
// sun.position.z = 15;
// sun.position.setX(-10);

//Cloud Particles
// scene.fog = new THREE.FogExp2(0x11111f, 0.002);
// renderer.setClearColor(scene.fog.color);
// const cloudParticles = []
// let loader = new THREE.TextureLoader();
//       loader.load("smoke.png", function(texture){

//         const cloudGeo = new THREE.PlaneBufferGeometry(500,500);
//         const cloudMaterial = new THREE.MeshLambertMaterial({
//           map: texture,
//           transparent: true
//         });

//         for(let p=0; p<255; p++) {
//           let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
//           cloud.position.set(
//             Math.random()*600 -400,
//             60,
//             Math.random()*500 - 450
//             // Math.random()*800 -400,
//             // 60,
//             // Math.random()*500 - 450
//           );
//           cloud.rotation.x = 1;
//           cloud.rotation.y = -0.12;
//           cloud.rotation.z = Math.random()*90;
//           cloud.material.opacity = 0.6;
//           cloudParticles.push(cloud);
//           scene.add(cloud);
//         }
//         animate();
// });

function moveCamera(){
    //Calculate where the user is currently scroll to
    //Gives us the dimensions of far the user scroll from the top of the webpage
    const t = document.body.getBoundingClientRect().top;
    // cloudParticles.forEach(p => {
    //     p.position.y = t * -0.02;;
    // });
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;

}
//Call this function everytime the user scroll
document.body.onscroll = moveCamera;
moveCamera();

//animation loop that constantly update the screne
function animate() {
    requestAnimationFrame (animate);

    // cloudParticles.forEach(p => {
    //     p.rotation.z -=0.002;
    //   });

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    //sun.rotation.x += 0.005;

    caleb.rotation.y += 0.001;
    caleb.rotation.z += 0.001;

    //controls.update();
    
    // Set render pixle ratio to the screen pixel ratio
    renderer.setPixelRatio(window.devicePixelRatio);

    // Set render size to window size
    renderer.setSize( window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
}

animate();