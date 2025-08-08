document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("mobile-tablet-header");
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const hero = document.getElementById("hero-section");
    const links = document.querySelectorAll(".nav-links li");

    console.log('Menu button element:', menuBtn);

    // Check if we're on a project page (not index.html)
    const isProjectPage = window.location.pathname !== '/' && 
                         window.location.pathname !== '/index.html' && 
                         !window.location.pathname.endsWith('index.html');

    function updateHeaderVisibility() {
      const width = window.innerWidth;

      // Always disconnect observer before re-evaluating
      if (window.heroObserver && hero) {
        window.heroObserver.disconnect();
        window.heroObserver = null;
      }

      if (width < 768) {
        header.classList.add("visible");
        header.classList.remove("hidden");
      } else if (width >= 768 && width <= 1180) {
        // For project pages, show header immediately on tablet
        if (isProjectPage) {
          header.classList.add("visible");
          header.classList.remove("hidden");
        } else {
          // Use IntersectionObserver for hero on index.html
          if (hero) {
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
        }
      } else {
        header.classList.remove("visible");
        header.classList.add("hidden");
      }
    }

    window.addEventListener("resize", updateHeaderVisibility);
    updateHeaderVisibility();

    // Toggle Menu
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        console.log('Menu button clicked');
        console.log('Before toggle - menuBtn classes:', menuBtn.classList);
        navLinks.classList.toggle("open");
        menuBtn.classList.toggle("open");
        console.log('After toggle - menuBtn classes:', menuBtn.classList);
        links.forEach(link => {
          link.classList.toggle("fade");
        });
      });
    } else {
      console.error('Menu button not found!');
    }

    // Add click event to each nav link
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Don't close menu if clicking on overview link (dropdown)
        if (link.querySelector('.overview-link')) {
          return;
        }
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
});