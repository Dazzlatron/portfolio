// Initialize ScrollMagic controller
var controller = new ScrollMagic.Controller();

// Debug: Check if GSAP is working
gsap.to(".parallax", { opacity: 0, duration: 0.2 });
console.log("GSAP test: Setting opacity to 0.5 on load");

// Select all elements with the class 'parallax'
document.querySelectorAll(".parallax").forEach((element) => {
  // Create a ScrollMagic scene for each element
  new ScrollMagic.Scene({
    triggerElement: element, // Trigger when this element enters viewport
    triggerHook: 0.70, // Start animation when 85% of element is visible
    reverse: true // Animation only plays once
  })
  .setTween(gsap.to(element, { opacity: 1, y: '-20px', duration: 1, ease: "sine.inOut" })) // GSAP animation
  .addIndicators({ name: "Fade & Slide Up" }) // Debugging indicators (optional)
  .addTo(controller);
});

// Debugging
console.log("ScrollMagic scenes created:", controller);
