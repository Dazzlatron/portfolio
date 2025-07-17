document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const sectionAnchors = [
    { id: 'project-overview', navIndex: 0 },
    { id: 'discovery', navIndex: 1 },
    { id: 'definition', navIndex: 2 },
    { id: 'ideation', navIndex: 3 },
    { id: 'design', navIndex: 4 }
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
}); 