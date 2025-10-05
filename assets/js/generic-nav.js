document.addEventListener('DOMContentLoaded', function() {
  // Only run if we're on a page with the side navigation
  const sideNav = document.querySelector('.side-nav');
  if (!sideNav) return;

  const navItems = document.querySelectorAll('.nav-item');
  if (navItems.length === 0) return;

  // Automatically detect sections by looking at nav item hrefs
  const sectionAnchors = [];
  navItems.forEach((item, index) => {
    const link = item.querySelector('a');
    if (link && link.getAttribute('href')) {
      const href = link.getAttribute('href');
      const sectionId = href.replace('#', '');
      sectionAnchors.push({ id: sectionId, navIndex: index });
    }
  });

  if (sectionAnchors.length === 0) return;

  // Get anchor elements
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
}); 