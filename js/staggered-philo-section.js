document.addEventListener('DOMContentLoaded', function() {
    const philCols = document.querySelectorAll('.row-2 .phil-col');
    let hasAnimated = false;
    
    // Set initial state
    resetAnimation();
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate in when scrolling down
          if (!hasAnimated) {
            animateColumns();
            hasAnimated = true;
          }
        } else {
          // Reset when scrolling back up
          if (hasAnimated && entry.boundingClientRect.top > 0) {
            resetAnimation();
            hasAnimated = false;
          }
        }
      });
    }, {
      rootMargin: '0px 0px -250px 0px',
      threshold: 0.1
    });
  
    // Helper functions
    function animateColumns() {
      philCols.forEach((col, index) => {
        setTimeout(() => {
          col.style.opacity = '1';
          col.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }
    
    function resetAnimation() {
      philCols.forEach((col, index) => {
        setTimeout(() => {
          col.style.opacity = '0';
          col.style.transform = 'translateY(20px)';
        }, index * 200); // Staggered reset
      });
    }
  
    // Observe the row
    const row = document.querySelector('.row-2');
    if (row) observer.observe(row);
  });