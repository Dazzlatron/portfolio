document.addEventListener('DOMContentLoaded', function() {
  const scrollEl = document.querySelector('.scroll');
  const aboutMe = document.querySelector('.about-me');

  if (scrollEl && aboutMe) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            scrollEl.classList.add('unstick');
          } else {
            scrollEl.classList.remove('unstick');
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );
    observer.observe(aboutMe);
  }
});