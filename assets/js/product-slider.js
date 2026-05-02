
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slider-img"); // all clickable images
  const modal = document.getElementById("imageModal");
  const closeBtn = document.querySelector(".close");
  
  let modalSwiper = null;
  let currentIndex = 0;

  // Check if Swiper is available
  if (typeof Swiper === 'undefined') {
    console.error('Swiper is not loaded. Please check if swiper-bundle.min.js is included.');
    return;
  }

  // Initialize Swiper when modal opens
  const initModalSwiper = () => {
    try {
      if (modalSwiper) {
        modalSwiper.destroy();
      }
      
      // Simple Swiper configuration
      modalSwiper = new Swiper('.modal-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        initialSlide: currentIndex,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        allowTouchMove: true,
        preventClicks: false,
        preventClicksPropagation: false,
        touchRatio: 1,
        grabCursor: true,
        effect: 'slide',
        speed: 400,
      });

      // Add slide change listener
      modalSwiper.on('slideChange', () => {
        currentIndex = modalSwiper.realIndex;
      });
      
    } catch (error) {
      console.error('Error initializing Swiper:', error);
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
      // Destroy swiper when modal closes
      if (modalSwiper) {
        modalSwiper.destroy();
        modalSwiper = null;
      }
    });
  }

  // Show modal with selected image
  const showImage = (index) => {
    currentIndex = index;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Initialize Swiper
    initModalSwiper();
  };

  // Event listeners for each image
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      showImage(index);
    });
  });

  // Close modal when clicking outside image area
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-inner")) {
      modal.style.display = "none";
      document.body.style.overflow = "";
      // Destroy swiper when modal closes
      if (modalSwiper) {
        modalSwiper.destroy();
        modalSwiper = null;
      }
    }
  });

  // Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
      document.body.style.overflow = "";
      // Destroy swiper when modal closes
      if (modalSwiper) {
        modalSwiper.destroy();
        modalSwiper = null;
      }
    }
  });
  
});

