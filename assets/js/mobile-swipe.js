document.addEventListener('DOMContentLoaded', function() {
  var modalImg = document.getElementById('modalImg');
  if (!modalImg) return;

  let touchStartX = 0;
  let touchEndX = 0;

  modalImg.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modalImg.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    const swipeThreshold = 50;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance < 0) {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }
    }
  }
});
