// ========================================
// CONSOLIDATED PARALLAX & SCROLLMAGIC JS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize ScrollMagic controller
  var controller = new ScrollMagic.Controller();

  // Function to determine triggerHook based on screen size
  function getTriggerHook() {
    return window.innerWidth < 768 ? 0.9 : 0.85;
  }

  // ========================================
  // PARALLAX ANIMATIONS
  // ========================================

  // Debug: Check if GSAP is working
  gsap.to(".parallax", { opacity: 0, duration: 0.2 });

  // Select all elements with the class 'parallax'
  document.querySelectorAll(".parallax").forEach((element) => {
    // Create a ScrollMagic scene for each element
    new ScrollMagic.Scene({
      triggerElement: element, // Trigger when this element enters viewport
      triggerHook: getTriggerHook(), // Use responsive triggerHook
      reverse: true // Animation only plays once
    })
    .setTween(gsap.fromTo(element, 
      { opacity: 0, y: 150 }, // Start from the CSS initial state
      { opacity: 1, y: -20, duration: 1, ease: "sine.inOut" } // Animate to visible and slightly up
    )) // GSAP animation
    // .addIndicators({ name: "Fade & Slide Up" }) // Debugging indicators (optional)
    .addTo(controller);
  });

  // ========================================
  // FLY-IN ANIMATIONS
  // ========================================

  // Fly-in from right animation
  document.querySelectorAll(".fly-in").forEach((element) => {
    new ScrollMagic.Scene({
      triggerElement: element,
      triggerHook: getTriggerHook(), // Use responsive triggerHook
      reverse: false // Play only once
    })
    .setTween(gsap.fromTo(element, 
      { x: 100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    ))
    // .addIndicators({ name: "Fly-in from right" }) // Optional for debugging
    .addTo(controller);
  });

  // ========================================
  // SEQUENCE ANIMATIONS
  // ========================================

  var section = document.querySelector('.row-1.sequence');

  if (section) {
      var tl = gsap.timeline();

      // Animate first column with a 0.2s delay
      tl.fromTo(".col-about-2", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );

      // Animate second column, staggered after the first
      tl.fromTo(".col-about-1", 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      );

      new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: getTriggerHook(), // Use responsive triggerHook
        reverse: true
      })
      .setTween(tl)
      // .addIndicators({ name: "About Me Columns" })
      .addTo(controller);

      // Animate .about-me-heading when it scrolls into view
      var aboutMeHeading = document.querySelector('.about-me-heading');
      if (aboutMeHeading) {
        gsap.set(aboutMeHeading, { x: 50, opacity: 0 });
        new ScrollMagic.Scene({
          triggerElement: aboutMeHeading,
          triggerHook: getTriggerHook(), // Use responsive triggerHook
          reverse: true
        })
        .setTween(
          gsap.to(aboutMeHeading, { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' })
        )
        // .addIndicators({ name: 'About Me Heading' })
        .addTo(controller);
      }
  }

  // ========================================
  // STAGGERED PHILOSOPHY SECTION
  // ========================================

  const philCols = document.querySelectorAll('.row-2 .phil-col');
  let hasAnimated = false;
  
  if (philCols.length > 0) {
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
  }

  // ========================================
  // FLY-IN-RIGHT ELEMENT ANIMATION
  // ========================================

  // Create the tween for fly-in elements
  const flyInTween = gsap.fromTo(".fly-in-element", 
    { x: 100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
  );

  // Create the ScrollMagic scene for fly-in elements
  const flyInScene = new ScrollMagic.Scene({
      triggerElement: ".trigger", // start animation when this is in view
      triggerHook: getTriggerHook(), // Use responsive triggerHook
      reverse: false // don't reverse animation when scrolling up
    })
    .setTween(flyInTween)
    .addTo(controller);
}); 