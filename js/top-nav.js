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

           if (width < 1180) {
       // For mobile and tablet (below 1180px), always show header
       header.classList.remove("hidden");
     } else {
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

    // Handle mobile submenu dropdowns
    const overviewLinks = document.querySelectorAll('.overview-link');
    overviewLinks.forEach(overviewLink => {
      overviewLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle the active class on the overview link
        overviewLink.classList.toggle('active');
        
        // Find the associated submenu
        const submenu = overviewLink.closest('li').querySelector('.t-submenu');
        if (submenu) {
          // Toggle the open class on the submenu
          submenu.classList.toggle('open');
        }
        
        // Close other open submenus
        overviewLinks.forEach(otherLink => {
          if (otherLink !== overviewLink) {
            otherLink.classList.remove('active');
            const otherSubmenu = otherLink.closest('li').querySelector('.t-submenu');
            if (otherSubmenu) {
              otherSubmenu.classList.remove('open');
            }
          }
        });
      });
    });

        // Mobile header behavior - same as tablet (768-1180)
    // No complex scroll logic needed, just show/hide based on viewport
    const mobileHeader = document.getElementById('mobile-tablet-header');
    const mobileNavLinks = document.querySelector('.nav-links');

    if (mobileHeader) {
      // Mobile header behaves exactly like tablet - always visible below 1180px
      // The updateHeaderVisibility() function already handles this
      
      // Only handle mobile navigation menu closing on scroll
      window.addEventListener('scroll', () => {
        // Close mobile navigation menu when scrolling
        if (mobileNavLinks && mobileNavLinks.classList.contains('open')) {
          mobileNavLinks.classList.remove('open');
        }
        // Reset hamburger button state
        if (menuBtn && menuBtn.classList.contains('open')) {
          menuBtn.classList.remove('open');
        }
      });
    }
});