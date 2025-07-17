
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slider-img"); // all clickable images
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".slider-nav.left");
  const nextBtn = document.querySelector(".slider-nav.right");

  let currentIndex = 0;
  
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  }
  // Show modal with clicked image
  const showImage = (index) => {
    const img = images[index];
    const largeSrc = img.getAttribute("data-large") || img.src;
    modalImg.src = largeSrc;
    currentIndex = index;
    modal.style.display = "flex"; // Use flex to center
    document.body.style.overflow = "hidden"; // Disable background scroll
  };

  // Event listeners for each image
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      showImage(index);
    });
  });

  // Close modal with close button
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scroll
  });

  // Close modal when clicking outside image area
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-inner")) {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scroll
    }
  });

  // Navigate left
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering modal close
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  // Navigate right
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  // Optional: Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

