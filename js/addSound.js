import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js'
import { PositionalAudioHelper } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/helpers/PositionalAudioHelper.js'

let scene, camera, renderer;

const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );

function init() {

  const overlay = document.getElementById( 'overlay' );
  overlay.remove();

  const container = document.getElementById( 'container' );

  //

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
  camera.position.set( 3, 2, 3 );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xa0a0a0 );
  scene.fog = new THREE.Fog( 0xa0a0a0, 2, 20 );

  //

  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  hemiLight.position.set( 0, 20, 0 );
  scene.add( hemiLight );

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

  // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

  //

  // this plane mesh is our floor
  const floorGeometry = new THREE.PlaneGeometry( 50, 50 )
  const floorMaterial = new THREE.MeshPhongMaterial( { color: 0xc28f4c, depthWrite: false } )
  const floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
  floorMesh.rotation.x = - Math.PI / 2;
  floorMesh.receiveShadow = true;
  scene.add( floorMesh );

  const grid = new THREE.GridHelper( 50, 50, 0x888888, 0x888888 );
  scene.add( grid );

  //

  const listener = new THREE.AudioListener();
  camera.add( listener );

  const audioElement = document.getElementById( 'track1' );
  audioElement.play();

  const positionalAudio = new THREE.PositionalAudio( listener );
  positionalAudio.setMediaElementSource( audioElement );
  positionalAudio.setRefDistance( 1 );
  positionalAudio.setDirectionalCone( 180, 230, 0.1 );

  const helper = new PositionalAudioHelper( positionalAudio, 2 );
  positionalAudio.add( helper );

  scene.add( positionalAudio ); // add the audio to the mesh

  // add an object for a sound to play from
  let sphereGeometry = new THREE.SphereGeometry( 0.25 , 0, 0 );
  let sphereMaterial = new THREE.MeshPhongMaterial( { color: 0x8f34eb } );
  let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  sphere.position.set( 0, 0.25, 0 );
  sphere.rotation.y = - Math.PI;
  sphere.castShadow = true;

  scene.add( sphere ); // add the mesh to the scene

  // sound is damped behind this wall
  const wallGeometry = new THREE.BoxGeometry( 2, 1, 0.1 );
  const wallMaterial = new THREE.MeshBasicMaterial( { color: 0x35d4a4, transparent: true, opacity: 0.5 } );

  const wall = new THREE.Mesh( wallGeometry, wallMaterial );
  wall.position.set( 0, 0.5, - 0.5 );
  scene.add( wall );


  //

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  container.appendChild( renderer.domElement );

  //

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
