document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const sectionAnchors = [
    { id: 'projects', navIndex: 0 },
    { id: 'about-me', navIndex: 1 },
    { id: 'contact', navIndex: 2 }
  ];

  // Click to select
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navItems.forEach(i => i.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

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

  // Animate header.center-content as top nav on iPad widths
  const header = document.querySelector('header.center-content');
  const hero = document.querySelector('.hero');
  function toggleHeaderNav() {
    if (!header || !hero) return;
    // Only apply on iPad widths
    if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      if (window.scrollY > hero.offsetHeight) {
        header.classList.add('nav-visible');
      } else {
        header.classList.remove('nav-visible');
      }
    } else {
      header.classList.remove('nav-visible');
    }
  }
  window.addEventListener('scroll', toggleHeaderNav);
  window.addEventListener('resize', toggleHeaderNav);
  toggleHeaderNav(); // Initial check
});
