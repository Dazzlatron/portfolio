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
  const swipeThreshold = 50; // Minimum px swipe distance
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) > swipeThreshold) {
    if (distance < 0) {
      // Swiped left → next image
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    } else {
      // Swiped right → previous image
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }
  }
}
