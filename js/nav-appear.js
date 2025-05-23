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
    navItems.forEach(i => i.classList.remove('selected'));
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
