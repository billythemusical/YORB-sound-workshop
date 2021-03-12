# Positional Audio Workshop in Three.js

This tutorial will introduce you to the basics of positional audio in Three.js.  Most of this material for the first section is based on this tutorial from the [Three.js website](https://threejs.org/examples/webaudio_orientation.html).

If you aren't familiar with the basics of building a scene in Three.js, there are a number of places to get you started.  I've found the following resources to be instructive:
  - [Discover Three.js](https://discoverthreejs.com/book/first-steps/first-scene/)
  - [Three.js Fundamentals](https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html)
  - [Stemkoski's Three.js Examples](https://stemkoski.github.io/Three.js/)
  - [Guillermo Montecinos' Three.js Tutorial](https://github.com/guillemontecinos/itp-residency-2020-2021/blob/master/three-js/tutorials/01-intro-to-threejs/intro-to-threejs.md)

[Here](https://soundmove.space/) is a great example from an ITP alum [Dan Oved](https://www.danioved.com/) of streaming live video and audio with interactive effects in Three.js.


I am also a part of a working group of faculty, residents, students, and alumni who develop and maintain [Yorb](https://yorb.itp.io), an interactive 3D social environment from NYU's ITP program, built using Three.js, among other open source software tools.  

# 2D Stereo vs 3D Positional Audio

Music is usually played through a set of two speakers in a what is called a stereo configuration, with each speaker referred to as the Left and Right, corresponding to each ear of the listener.  Different sound elements can be "panned" between the two speakers which gives the illusion of movement in relation to the listener.  A sound that is played out of the left speaker only will give the listener the perception that the sound is coming from that direction and vice versa with the right.  So here we have a 2-dimensional (2D) sound field.  

  ![Stereo Sound is comprised of two speakers.](/assets/images/stereo-sound-left-right.png)

In reality however, humans have evolved to perceive sound in 3 dimensions (3D) only given 2 ears.  We can hear if a sound is in front or behind us, as well as above or below.  All of the reasons behind exactly how this works are not fully understood, although some are quite simple. For example, a sound source that originates from behind the listener will have slightly less high frequencies.  This is because our outer ear attenuates higher frequencies before they enter our ear canal.

Positional audio, aka Spatial or Spatialized audio, processes a sound placed behind the listener similarly by attenuating the high frequencies.  (For more exotic theory, read Hugo Zuccarelli's 1977 article [Ears Hear By Making Sound](https://books.google.com/books?id=YFjTMckHfuwC&lpg=PA438&ots=HR5y5ziMkE&dq=the%20ears%20hear%20by%20making%20sound%20zuccarelli&pg=PA438#v=onepage&q=the%20ears%20hear%20by%20making%20sound%20zuccarelli&f=false)). There are a number of other things taken into account for sounds that are placed above and below the listener, but they all use some form of equalization, slight signal delay, and panning to achieve their effects.  The efficacy of this approach is pretty good for most simple sounds but not great for a group of complex sounds.  There is also quite a bit of variation in the perception of sound due to anatomical differences (and even [handedness](https://www.youtube.com/watch?v=OiW8gzBGz1A&ab_channel=CaseyConnor)) that are harder to account for.  More work needs to be done still to understand, and therefore replicate, the mechanism by which humans perceive 3D sound.

# Getting Started

## Running a Local Server

Since we're loading local media files and including remote javascript libraries, we must use a slightly more complex server than say, Python's `SimpleHttpServer`.  We recommend using Node.js `http-server`.  You can install Node.js if you need it at the link [here](https://nodejs.org/en/download/).  

Once you have Node.js installed, navigate to this directory using a command line interface (CLI) like the Terminal app - `cd /your/local/path/to/YORB-sound-workshop`.  Then run `npm install` which will install the required packages from our `package.json` list, including `http-server`.

## Examples

This tutorial will give examples of how Three.js leverages the [Audio Spatialization features](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics) like [`3D PannerNode`](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode) that are built into the modern browser.

We add an audio source in the `add-sound.html` file like so:

    <audio loop id="track1" src="sounds/track_1.mp3" type="audio/mpeg" preload="auto" style="display: none"></audio>

In our Javascript code, we access this element and pass it into our Three.js `PositionalAudio` object later.

This document is a work-in-progress, but there are four examples you can choose from:
  - [Add a sound](./public/01-add-sound.html)
  - [More Sounds](./public/02-more-sounds.html)
  - [Using Audio Analysis](./public/03-audio-analysis.html)
  - [Using Animation](./public/04-animation.html)
