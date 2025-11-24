// Import all CSS files so Vite processes them
console.log('Loading CSS files...');

// Function to import CSS files
async function loadCSS() {
  await import('./assets/fonts/fonts.css');
  await import('./assets/css/styles.css');
  await import('./assets/css/style-old.css');
  await import('./assets/css/hero.css');
  await import('./assets/css/parallax.css');
  await import('./assets/css/project-tiles.css');
  await import('./assets/css/dark-mode.css');
  await import('./assets/css/swiper-bundle.min.css');
  await import('./assets/css/swiper-style.css');
  await import('./assets/css/footer.css');
  await import('./assets/css/device-styles.css');
  await import('./assets/css/grid-column-layout.css');
  await import('./assets/css/image-styles.css');
  await import('./assets/css/cursor-effects.css');
  await import('./assets/css/skills-section.css');
  await import('./assets/css/testimonial-slider.css');
  console.log('CSS files imported');
}

// Load CSS on initial load
loadCSS();

// Reload CSS when page is restored from back/forward cache
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    console.log('Page restored from cache, reloading CSS...');
    loadCSS();
  }
});

