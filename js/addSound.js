// importing these scripts from the web keeps us from having to include them locally
// but also necessitates us using a local server
import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js'
import { PositionalAudioHelper } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/helpers/PositionalAudioHelper.js'

// the three basic elements of a Three.js scene
let scene, camera, renderer;

// we have to start any audio with a user interaction
const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );  // "when the button is clicked, run the init callback function"

function init() {

  const overlay = document.getElementById( 'overlay' ); // get the overlay div
  overlay.remove(); // remove the overlay div

  const container = document.getElementById( 'container' ); // for rendering our scene later in 2D

  // a note on colors: Three.js can take a number of different color types, but HEX is preferred it seems
  // https://threejs.org/docs/#api/en/math/Color

  // boiler plate - here we make a new camera to view the scene
  //  you can read more about Perspective Camera here - https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
  camera.position.set( 3, 2, 3 );  // our starting view position

  // boiler plate - a scene to hold all the objects we create
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xa0a0a0 ); // background color
  scene.fog = new THREE.Fog( 0xa0a0a0, 2, 20 ); // fog is interesting, try commenting it out

  // boiler plate - now we add lights to the scene
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  hemiLight.position.set( 0, 20, 0 ); // this will be overhead
  scene.add( hemiLight );

  // boiler plate - this light will determined the shadow that we see on our objects
  const dirLight = new THREE.DirectionalLight( 0xffffff );
  dirLight.position.set( 5, 5, 0 );
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 1;
  dirLight.shadow.camera.bottom = - 1;
  dirLight.shadow.camera.left = - 1;
  dirLight.shadow.camera.right = 1;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 20;
  scene.add( dirLight );

  // this mesh plane is our floor
  const floorGeometry = new THREE.PlaneGeometry( 50, 50 )
  const floorMaterial = new THREE.MeshPhongMaterial( { color: 0xc28f4c, depthWrite: false } )
  const floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
  floorMesh.rotation.x = - Math.PI / 2;
  floorMesh.receiveShadow = true; // to show the shadow from our objects
  scene.add( floorMesh );

  // helping us percieve the 3D layout of the space we're creating
  const grid = new THREE.GridHelper( 50, 50, 0x888888, 0x888888 );
  scene.add( grid );

  // make an object which we will play the sound from
  let sphereGeometry = new THREE.SphereGeometry( 0.25 , 0, 0 );
  let sphereMaterial = new THREE.MeshPhongMaterial( { color: 0x8f34eb } );
  let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  sphere.position.set( 0, 0.25, 0 );
  sphere.rotation.y = - Math.PI;
  sphere.castShadow = true;

  scene.add( sphere ); // add the mesh to the scene

  // // sound is damped behind this wall
  // const wallGeometry = new THREE.BoxGeometry( 2, 1, 0.1 );
  // const wallMaterial = new THREE.MeshBasicMaterial( { color: 0x35d4a4, transparent: true, opacity: 0.5 } );
  //
  // const wall = new THREE.Mesh( wallGeometry, wallMaterial );
  // wall.position.set( 0, 0.5, - 0.5 );
  // scene.add( wall );

          /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          >>>>>>>!! AUDIO STUFF !!>>>>>>>>
          >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

  // AudioListenter is like the camera for audio,
  // it is where we will be listening from relative to
  // the 3D position of the other objects in the scene
  const listener = new THREE.AudioListener();
  // we add the listener to our camera
  // which links the listener position with the camera position
  camera.add( listener );

  // grabbing our audio element
  const audioElement = document.getElementById( 'track1' );

  // creating our audio object and passing in the listener as our destination
  const positionalAudio = new THREE.PositionalAudio( listener );
  // passing in our audio element as the source
  positionalAudio.setMediaElementSource( audioElement );
  audioElement.play();
  // RefDistance determines how far away from the source we must be before the sound
  // starts to decrease in volume
  // there is also .setRollOffFactor which we can play with
  positionalAudio.setRefDistance( 1 );
  // determines how the audio will respond in relation to the angle of the listener
  positionalAudio.setDirectionalCone( 180, 230, 0.1 );

  // to visualize the directional cone above
  const helper = new PositionalAudioHelper( positionalAudio, 2 );
  // we add it to our positionalAudio object to link their positions
  positionalAudio.add( helper );

  // we add the audio to the sphere to link their positions
  sphere.add( positionalAudio )

  // boiler plate - setting up rendering from 3D to 2D
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  container.appendChild( renderer.domElement );

  // boiler plate - setting up the basic controls for navigation
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( 0, 0.1, 0 );
  controls.update();
  controls.minDistance = 0.5;
  controls.maxDistance = 10;
  controls.maxPolarAngle = 0.5 * Math.PI;

  //

  window.addEventListener( 'resize', onWindowResize );

  animate();

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );
  renderer.render( scene, camera );

}
