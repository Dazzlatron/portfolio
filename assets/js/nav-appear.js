document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const sectionAnchors = [
    { id: 'projects', navIndex: 0 },
    { id: 'about-me', navIndex: 1 },
    { id: 'contact', navIndex: 2 }
  ];

  // Scroll to select (improved: closest anchor above viewport top)
  const anchorElements = sectionAnchors.map(a => document.getElementById(a.id));
  let ticking = false;

  function updateNavSelection() {
    let closestIdx = -1;
    let closestDist = -Infinity;
    anchorElements.forEach((anchor, i) => {
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      // Only consider anchors above the top (or at top)
      if (rect.top <= 120 && rect.top > closestDist) {
        closestDist = rect.top;
        closestIdx = i;
      }
    });
    navItems.forEach((item, i) => {
      item.classList.remove('selected');
      // Arrow direction logic
      const arrow = item.querySelector('.arrow-svg');
      if (!arrow) return;
      const anchor = anchorElements[i];
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      arrow.classList.remove('arrow-down', 'arrow-right', 'arrow-up');
      if (rect.top > 120) {
        // Section is below viewport top
        arrow.classList.add('arrow-down');
      } else if (rect.bottom < 120) {
        // Section is above viewport top
        arrow.classList.add('arrow-up');
      } else {
        // Section is in view
        arrow.classList.add('arrow-right');
      }
    });
    if (closestIdx !== -1) {
      navItems[sectionAnchors[closestIdx].navIndex].classList.add('selected');
    }
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateNavSelection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  updateNavSelection();

  // Animate header.center-content as top nav on tablet widths
  const header = document.querySelector('header.center-content');
  const mobileTabletHeader = document.querySelector('#mobile-tablet-header');
  const hero = document.querySelector('.hero');
  
  // Variables for scroll direction detection
  let lastScrollY = window.scrollY;
  let isScrollingDown = false;
  
  function toggleHeaderNav() {
    if (!hero) return;
    
    // Apply on tablet widths (768px - 1180px) and mobile (below 768px)
    if (window.innerWidth <= 1180) {
      // Handle header.center-content (tablet only)
      if (header && window.innerWidth >= 768) {
        if (window.scrollY > hero.offsetHeight) {
          header.classList.add('nav-visible');
        } else {
          header.classList.remove('nav-visible');
        }
      }
      
      // Handle mobile-tablet-header (horizontal nav) - both mobile and tablet
      if (mobileTabletHeader) {
        // Detect scroll direction
        const currentScrollY = window.scrollY;
        isScrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
        
        if (isScrollingDown) {
          // Scrolling DOWN - hide the horizontal nav
          mobileTabletHeader.classList.add('hidden');
        } else {
          // Scrolling UP - show the horizontal nav
          mobileTabletHeader.classList.remove('hidden');
        }
      }
    } else {
      // Outside tablet range - reset states
      if (header) {
        header.classList.remove('nav-visible');
      }
      if (mobileTabletHeader) {
        mobileTabletHeader.classList.remove('hidden');
      }
    }
  }
  
  window.addEventListener('scroll', toggleHeaderNav);
  window.addEventListener('resize', toggleHeaderNav);
  toggleHeaderNav(); // Initial check
});
