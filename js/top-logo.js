let isReplaying = false; // Lock so it doesn't spam replay

function replayLogo(logo) {
  if (logo && !isReplaying) {
    isReplaying = true;
    const src = logo.getAttribute('src');
    setTimeout(() => {
      logo.setAttribute('src', src.split('?')[0] + '?' + new Date().getTime());
      setTimeout(() => {
        isReplaying = false; // Unlock after animation finishes
      }, 1000); // Assume gif animation is under 1 second, adjust if needed
    }, 100);
  }
}

window.addEventListener('load', function() {
  const logos = document.querySelectorAll('.top-logo, .top-nav-logo');

  if (logos.length > 0) {
    // Play once after 0.5s
    setTimeout(() => logos.forEach(replayLogo), 300);

    // Play every 12 seconds
    setInterval(() => logos.forEach(replayLogo), 8000);

    // Play on hover
    logos.forEach(logo => {
      logo.addEventListener('mouseenter', () => replayLogo(logo));
    });

    // Observe body class changes for dark-mode toggle
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          logos.forEach(replayLogo);
        }
      });
    });

    observer.observe(document.body, {
      attributes: true
    });
  }
});