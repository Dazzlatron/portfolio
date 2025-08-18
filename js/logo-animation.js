document.addEventListener("DOMContentLoaded", function() {
    const logo = document.querySelector('.hero-logo');
    
    function animateLogo() {
        // Remove the class first to reset the animation
        logo.classList.remove('animate-logo');
        // Force a reflow
        void logo.offsetWidth;
        // Add the class back to start the animation
        logo.classList.add('animate-logo');
    }

    // Initial animation
    animateLogo();

    // Set up the interval for repeating the animation
    setInterval(animateLogo, 10000); // 10 seconds
}); 