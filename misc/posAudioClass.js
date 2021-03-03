class PosAudio {
  constructor(fileName, audioElement, listener, mesh) {
    this.fileName = fileName
    this.element = audioElement
    this.listener = listener
    this.mesh = mesh
  }

  attachSound() {
    let positionalAudio = new THREE.PositionalAudio( this.listener );
    positionalAudio.setMediaElementSource( this.element );
    positionalAudio.setRefDistance( 1 );
    return positionalAudio // we'll add this to our scene
  }
}
