
  const sound = document.getElementById('hover-sound');
  const target = document.querySelector('.hover-target');

  target.addEventListener('mouseenter', () => {
    // Rewind to start and play
    sound.currentTime = 0;
    sound.play();
  });
