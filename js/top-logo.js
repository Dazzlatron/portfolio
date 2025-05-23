let isReplaying = false; // Lock so it doesn't spam replay

function replayTopLogo() {
  const logo = document.querySelector('.top-logo');
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
  const logo = document.querySelector('.top-logo');

  if (logo) {
    // Play once after 0.5s
    setTimeout(replayTopLogo, 300);

    // Play every 12 seconds
    setInterval(replayTopLogo, 8000);

    // Play on hover
    logo.addEventListener('mouseenter', replayTopLogo);

    // Observe body class changes for dark-mode toggle
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          replayTopLogo();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true
    });
  }
});