document.addEventListener('DOMContentLoaded', function() {
  const scrollElement = document.querySelector('.scroll');
  const aboutMeSection = document.querySelector('.about-me');

  window.addEventListener('scroll', function() {
    const aboutMeTop = aboutMeSection.getBoundingClientRect().top;
    if (aboutMeTop <= 80) {
      scrollElement.style.position = 'static';
      scrollElement.style.opacity = '0';
    } else {
      scrollElement.style.position = 'sticky';
      scrollElement.style.opacity = '1';
    }
  });
});