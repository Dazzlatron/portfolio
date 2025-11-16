
        const video = document.querySelector('video');
        
        // Ensure video plays automatically
        video.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
        
        // Remove any potential interactivity
        video.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        // Ensure looping continues
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
  