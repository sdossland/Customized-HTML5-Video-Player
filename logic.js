/**
 * Created by sophia on 3/14/17.
 */
document.addEventListener("DOMContentLoaded", function () {

  const screen = document.querySelector('.videoPlayer');
  const video = document.querySelector('#video');
  const progress = document.querySelector('#progress');
  const controls = document.querySelector('.controls');
  const playControl = document.querySelector('.play');
  const volumeControl = document.querySelector('.volume');
  const playRate = document.querySelector('.playRate');
  const skipButtons = document.querySelectorAll('[data-skip]');

  let playing = true;
  let fullscreen = false;

  //seekable range
  // seekControl.addEventListener('change', function () {
  //   const newTime = video.duration * (seekControl.value / 100);
  //   //set current time equal to new time
  //   video.currentTime = newTime;
  // });

  //updates progress bar
  video.addEventListener('timeupdate', function() {
    const percent = (100 / video.duration) * video.currentTime;
    progress.value = percent;
  }, false);

  //play or pause the video
  function togglePlay() {
    if (playing) {
      video.pause();
      playControl.innerHTML = '&#9658';
    } else {
      video.play();
      playControl.innerHTML = '&#9646&#9646';
    }
    playing = !playing;
  }

  playControl.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);

  //connects volume control to video volume
  volumeControl.addEventListener('change', function () {
    video.volume = volumeControl.value;
  });

  //speed up or slow down the pace of the video
  playRate.addEventListener('change', function () {
    video.playbackRate = playRate.value;
  });

  //skip ahead or backwards set time of video
  function skipTime() {
    video.currentTime += parseFloat(this.dataset.skip); //cannot set current time??
    console.log(video.currentTime);
  }

  skipButtons.forEach(skipBtn => skipBtn.addEventListener('click', skipTime));

  //toggles fullscreen
  function toggleScreenSize() {
    fullscreen = !fullscreen;
    if (fullscreen) {
      screen.style.width = '100vw';
      screen.style.height = '100vh';
    } else {
      screen.style.width = '640px';
      screen.style.height = '360px';
    }
  }

  screen.addEventListener('click', toggleScreenSize);

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27 && fullscreen) {
      toggleScreenSize();
    }
  });

});