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
  camera.position.set( 8.48, 5.27, 1.17 );

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

  let pos = [[-1, -1], [1, -1], [-1, 1], [1, 1]]
  let spacing = 3;
  for (let i = 1; i < 5; i++) {
    let id = 'track' + i.toString()
    console.log(id)
    let audioElement = document.getElementById(id);
    // audioElement.play(); 

    let positionalAudio = new THREE.PositionalAudio( listener );
    positionalAudio.setMediaElementSource( audioElement );
    positionalAudio.setRefDistance( 1 );

    // add an object for a sound to play from
    let hue = (255/4) * i
    let col = new THREE.Color("hsl(" + hue + ", 100%, 50%)")
    let sphereGeometry = new THREE.SphereGeometry( 0.25 , 0, 0 );
    let sphereMaterial = new THREE.MeshPhongMaterial( { color: col } );
    let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

    let x = pos[i - 1][0] * spacing
    let z = pos[i - 1][1] * spacing
    sphere.position.set( x , 0.25, z );
    sphere.rotation.y = - Math.PI;
    sphere.castShadow = true;

    sphere.add( positionalAudio )
    scene.add( sphere )

    audioElement.play(); // to get rid of the jolty intro

  }


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
