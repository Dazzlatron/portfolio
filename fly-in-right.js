// Init controller
const controller = new ScrollMagic.Controller();

// Create the tween
const tween = gsap.fromTo(".fly-in-element", 
  { x: 100, opacity: 0 }, 
  { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
);

// Create the ScrollMagic scene
const scene = new ScrollMagic.Scene({
    triggerElement: ".trigger", // start animation when this is in view
    triggerHook: 0.8, // 0 (top of viewport) to 1 (bottom)
    reverse: false // don't reverse animation when scrolling up
  })
  .setTween(tween)
  .addTo(controller);
