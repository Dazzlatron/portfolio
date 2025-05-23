const svg = document.getElementById('logo-wave');
    const rects = svg.querySelectorAll('rect');
  
    function playWave() {
      rects.forEach(rect => {
        // Remove any previous animation
        rect.style.animation = 'none';
        rect.offsetHeight; // force reflow
  
        // Random delay within 0.5s
        const delay = Math.random() * 0.5;
  
        // Set the animation
        rect.style.animation = `pop 0.5s ease-in-out ${delay}s 1`;
  
        // Cleanup after animation finishes (delay + 0.5s duration)
        setTimeout(() => {
          rect.style.animation = 'none';
        }, (delay + 0.9) * 1000);
      });
    }
  
    // Repeat every 8 seconds
    setInterval(playWave, 24000);
  
    // Trigger on page load
    playWave();
  
    // Trigger on hover
    svg.addEventListener('mouseenter', playWave);