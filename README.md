# Positional Audio Workshop in Three.js

This tutorial will introduce you to the basics of positional audio in Three.js.  Most of this material for the first section is based on this tutorial from the [Three.js website](https://threejs.org/examples/webaudio_orientation.html).

Music is usually played through a set of two speakers in a what is called a stereo configuration, with each speaker referred to as the Left and Right, corresponding to each ear of the listener.  Different sound elements can be "panned" between the two speakers which gives the illusion of movement in relation to the listener.  A sound that is played out of the left speaker only will give the listener the perception that the sound is coming from that direction and vice versa with the right.  So here we have a 2-dimensional (2D) sound field.  

In reality however, humans have evolved to perceive sound in 3 dimensions (3D).  We can hear if a sound is in front or behind us, as well as above or below.  The reasons behind how this works are varied and not fully understood (For more interesting theories, read Hugo Zuccarelli's 1977 article [Ears Hear By Making Sound](https://books.google.com/books?id=YFjTMckHfuwC&lpg=PA438&ots=HR5y5ziMkE&dq=the%20ears%20hear%20by%20making%20sound%20zuccarelli&pg=PA438#v=onepage&q=the%20ears%20hear%20by%20making%20sound%20zuccarelli&f=false)).  Positional audio, aka Spatial audio,  tries to mimic the characteristics of 3D sound using only a 2D stereo configuration.  For example, for a sound source that originates from behind the listener, the sound will be processed to have slightly less high frequencies, which is because of the way that our outer ear attenuates higher frequencies before they enter our ear canal.  The efficacy of this approach is pretty good and easier to identify with certain types of sounds, but more work needs to be done still to understand and therefore replicate 3D sound using only 2D methods.  

This tutorial will give examples of how Three.js uses the (Positional Audio features)[https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics] like (PannerNode)[https://developer.mozilla.org/en-US/docs/Web/API/PannerNode] that are built into the modern browser.    
