document.addEventListener("DOMContentLoaded", function () {
    var controller = new ScrollMagic.Controller();
    var section = document.querySelector('.row-1.sequence');

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
      triggerHook: 0.7,
      reverse: true
    })
    .setTween(tl)
    .addIndicators({ name: "About Me Columns" })
    .addTo(controller);
  });