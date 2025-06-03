document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("mobile-tablet-header");
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");
    const hero = document.getElementById("hero-section");

    function updateHeaderVisibility() {
      const width = window.innerWidth;

      if (width < 768) {
        header.classList.add("visible");
        header.classList.remove("hidden");
        if (window.heroObserver && hero) {
          window.heroObserver.disconnect();
          window.heroObserver = null;
        }
      } else if (width >= 768 && width <= 1024) {
        // Use IntersectionObserver for hero
        if (!window.heroObserver && hero) {
          window.heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) {
                header.classList.add("visible");
                header.classList.remove("hidden");
              } else {
                header.classList.remove("visible");
                header.classList.add("hidden");
              }
            });
          }, { threshold: 0.01 });
          window.heroObserver.observe(hero);
        }
      } else {
        header.classList.remove("visible");
        header.classList.add("hidden");
        if (window.heroObserver && hero) {
          window.heroObserver.disconnect();
          window.heroObserver = null;
        }
      }
    }

    window.addEventListener("resize", updateHeaderVisibility);
    updateHeaderVisibility();

    // Hamburger menu toggle
    if (menuIcon && navLinks) {
      menuIcon.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
    }
});