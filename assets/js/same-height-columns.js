function setPhilColHeights() {
    const cols = document.querySelectorAll('.phil-col');
    let maxHeight = 0;
    cols.forEach(col => {
      col.style.height = 'auto'; // Reset height
      if (col.offsetHeight > maxHeight) maxHeight = col.offsetHeight;
    });
    cols.forEach(col => col.style.height = maxHeight + 'px');
  }
  
  // Run on load and on resize
  window.addEventListener('load', setPhilColHeights);
  window.addEventListener('resize', setPhilColHeights);