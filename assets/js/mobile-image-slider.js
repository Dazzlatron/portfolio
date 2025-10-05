// Mobile Image Slider for Product Images - Click to Open Modal
class MobileImageSlider {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isDragging = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 4000; // 4 seconds
    this.isModalOpen = false;
    
    this.init();
  }
  
  init() {
    // Only initialize on mobile devices (≤767px)
    if (window.innerWidth <= 767) {
      // Disable any existing popup functionality on mobile
      this.disableExistingPopups();
      this.createModal();
      this.bindEvents();
    }
    
    // Listen for window resize to handle device rotation
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 767 && !this.modal) {
        // Mobile size and no modal exists - create it
        this.disableExistingPopups();
        this.createModal();
        this.bindEvents();
      } else if (window.innerWidth > 767 && this.modal) {
        // Desktop size and modal exists - destroy it
        this.destroy();
        this.enableExistingPopups();
      }
    });
  }
  
  disableExistingPopups() {
    // Disable any existing popup functionality on mobile
    const images = document.querySelectorAll('.four-four-four img');
    images.forEach(img => {
      // Remove onclick attributes
      if (img.hasAttribute('onclick')) {
        img.removeAttribute('onclick');
      }
      
      // Remove any data attributes that might trigger popups
      if (img.hasAttribute('data-popup')) {
        img.removeAttribute('data-popup');
      }
      
      if (img.hasAttribute('data-modal')) {
        img.removeAttribute('data-modal');
      }
      
      // Remove any existing click event listeners
      const newImg = img.cloneNode(true);
      img.parentNode.replaceChild(newImg, img);
    });
  }
  
  enableExistingPopups() {
    // Re-enable existing popup functionality on desktop if needed
    // This is called when switching back to desktop
  }
  
  createModal() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'mobile-slider-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10000;
      display: none;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'mobile-slider-modal-content';
    modalContent.style.cssText = `
      position: relative;
      width: 90%;
      max-width: 500px;
      background: white;
      border-radius: 15px;
      padding: 20px;
      transform: scale(0.8);
      transition: transform 0.3s ease;
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-slider-close';
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      z-index: 10001;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.backgroundColor = '#f0f0f0';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.backgroundColor = 'transparent';
    });
    
    // Create slider wrapper
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'mobile-slider-wrapper';
    sliderWrapper.style.cssText = `
      display: flex;
      transition: transform 0.3s ease-in-out;
      width: 300%;
      height: auto;
      overflow: hidden;
      border-radius: 10px;
    `;
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'mobile-slider-dots';
    dotsContainer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 15px;
    `;
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'mobile-slider-dot';
      dot.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ccc;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
      `;
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    
    // Add slide counter
    const slideCounter = document.createElement('div');
    slideCounter.className = 'mobile-slider-counter';
    slideCounter.innerHTML = `<span class="current-slide">1</span> / <span class="total-slides">${this.totalSlides}</span>`;
    slideCounter.style.cssText = `
      text-align: center;
      margin-top: 10px;
      font-size: 14px;
      color: #666;
      font-family: Arial, sans-serif;
      font-weight: 500;
    `;
    
    // Assemble the modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(sliderWrapper);
    modalContent.appendChild(dotsContainer);
    modalContent.appendChild(slideCounter);
    modal.appendChild(modalContent);
    
    // Add to body
    document.body.appendChild(modal);
    
    // Store references
    this.modal = modal;
    this.modalContent = modalContent;
    this.sliderWrapper = sliderWrapper;
    this.dots = dotsContainer.querySelectorAll('.mobile-slider-dot');
    this.slideCounter = slideCounter;
    
    // Bind close events
    closeBtn.addEventListener('click', () => this.closeModal());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    });
  }
  
  bindEvents() {
    // Find the three images and add click listeners
    const imageContainer = document.querySelector('.four-four-four');
    if (!imageContainer) return;
    
    const col1 = imageContainer.querySelector('.col-1 img');
    const col2 = imageContainer.querySelector('.col-2 img');
    const col3 = imageContainer.querySelector('.col-3 img');
    
    if (col1 && col2 && col3) {
      [col1, col2, col3].forEach((img, index) => {
        img.style.cursor = 'pointer';
        
        // Remove any existing click listeners to prevent conflicts
        const newImg = img.cloneNode(true);
        img.parentNode.replaceChild(newImg, img);
        
        // Add mobile slider class and ensure it works
        newImg.classList.add('mobile-slider-enabled');
        
        // Add our mobile slider click listener
        newImg.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openModal(index);
        });
      });
    }
    
    // Touch events for swipe
    this.sliderWrapper.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.sliderWrapper.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.sliderWrapper.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    
    // Mouse events for desktop testing
    this.sliderWrapper.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.sliderWrapper.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.sliderWrapper.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.sliderWrapper.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
    
    // Pause auto-play on user interaction
    this.sliderWrapper.addEventListener('touchstart', () => this.pauseAutoPlay());
    this.sliderWrapper.addEventListener('mousedown', () => this.pauseAutoPlay());
    
    // Resume auto-play after user interaction
    this.sliderWrapper.addEventListener('touchend', () => this.resumeAutoPlay());
    this.sliderWrapper.addEventListener('mouseup', () => this.resumeAutoPlay());
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }
  
  openModal(startSlide = 0) {
    this.currentSlide = startSlide;
    this.isModalOpen = true;
    
    // Populate slider with images
    this.populateSlider();
    
    // Show modal
    this.modal.style.display = 'flex';
    
    // Animate in
    setTimeout(() => {
      this.modal.style.opacity = '1';
      this.modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Start auto-play
    this.startAutoPlay();
    
    // Update slider position
    this.updateSlider();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    this.isModalOpen = false;
    
    // Animate out
    this.modal.style.opacity = '0';
    this.modalContent.style.transform = 'scale(0.8)';
    
    // Hide modal after animation
    setTimeout(() => {
      this.modal.style.display = 'none';
    }, 300);
    
    // Stop auto-play
    this.pauseAutoPlay();
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  populateSlider() {
    // Clear existing content
    this.sliderWrapper.innerHTML = '';
    
    // Find the three images
    const imageContainer = document.querySelector('.four-four-four');
    if (!imageContainer) return;
    
    const col1 = imageContainer.querySelector('.col-1 img');
    const col2 = imageContainer.querySelector('.col-2 img');
    const col3 = imageContainer.querySelector('.col-3 img');
    
    if (col1 && col2 && col3) {
      // Create slides
      const slide1 = document.createElement('div');
      slide1.className = 'mobile-slider-slide';
      slide1.style.cssText = `
        width: 33.333%;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      `;
      
      const slide2 = document.createElement('div');
      slide2.className = 'mobile-slider-slide';
      slide2.style.cssText = `
        width: 33.333%;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      `;
      
      const slide3 = document.createElement('div');
      slide3.className = 'mobile-slider-slide';
      slide3.style.cssText = `
        width: 33.333%;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      `;
      
      // Clone images
      const img1 = col1.cloneNode(true);
      const img2 = col2.cloneNode(true);
      const img3 = col3.cloneNode(true);
      
      // Style images
      [img1, img2, img3].forEach(img => {
        img.style.cssText = `
          width: 100%;
          height: auto;
          border-radius: 10px;
          max-height: 400px;
          object-fit: contain;
        `;
      });
      
      // Add images to slides
      slide1.appendChild(img1);
      slide2.appendChild(img2);
      slide3.appendChild(img3);
      
      // Add slides to wrapper
      this.sliderWrapper.appendChild(slide1);
      this.sliderWrapper.appendChild(slide2);
      this.sliderWrapper.appendChild(slide3);
    }
  }
  
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.isDragging = true;
  }
  
  handleTouchMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.touchEndX = e.touches[0].clientX;
  }
  
  handleTouchEnd(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.handleSwipe();
  }
  
  handleMouseDown(e) {
    this.touchStartX = e.clientX;
    this.isDragging = true;
    e.preventDefault();
  }
  
  handleMouseMove(e) {
    if (!this.isDragging) return;
    this.touchEndX = e.clientX;
  }
  
  handleMouseUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.handleSwipe();
  }
  
  handleMouseLeave(e) {
    this.isDragging = false;
  }
  
  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && this.currentSlide < this.totalSlides - 1) {
        // Swipe left - next slide
        this.nextSlide();
      } else if (diff < 0 && this.currentSlide > 0) {
        // Swipe right - previous slide
        this.prevSlide();
      }
    }
  }
  
  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlider();
    } else {
      // Loop back to first slide
      this.currentSlide = 0;
      this.updateSlider();
    }
  }
  
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlider();
    } else {
      // Loop to last slide
      this.currentSlide = this.totalSlides - 1;
      this.updateSlider();
    }
  }
  
  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateSlider();
  }
  
  updateSlider() {
    const translateX = -(this.currentSlide * 33.333);
    this.sliderWrapper.style.transform = `translateX(${translateX}%)`;
    
    // Update active dot
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
      if (index === this.currentSlide) {
        dot.style.backgroundColor = 'var(--red-accent, #ff4444)';
        dot.style.transform = 'scale(1.1)';
      } else {
        dot.style.backgroundColor = '#ccc';
        dot.style.transform = 'scale(1)';
      }
    });
    
    // Update slide counter
    if (this.slideCounter) {
      const currentSlideSpan = this.slideCounter.querySelector('.current-slide');
      if (currentSlideSpan) {
        currentSlideSpan.textContent = this.currentSlide + 1;
        currentSlideSpan.style.color = 'var(--red-accent, #ff4444)';
        currentSlideSpan.style.fontWeight = 'bold';
      }
    }
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }
  
  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  resumeAutoPlay() {
    if (!this.autoPlayInterval) {
      this.startAutoPlay();
    }
  }
  
  handleKeyDown(e) {
    // Only handle keys when modal is open
    if (!this.isModalOpen) return;
    
    switch(e.key) {
      case 'Escape':
        e.preventDefault();
        this.closeModal();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextSlide();
        break;
      case 'Home':
        e.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        this.goToSlide(this.totalSlides - 1);
        break;
      case ' ':
        e.preventDefault();
        this.toggleAutoPlay();
        break;
    }
  }
  
  toggleAutoPlay() {
    if (this.autoPlayInterval) {
      this.pauseAutoPlay();
    } else {
      this.resumeAutoPlay();
    }
  }
  
  destroy() {
    this.pauseAutoPlay();
    if (this.modal) {
      this.modal.remove();
    }
  }
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileImageSlider();
});
