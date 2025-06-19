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

    // Use a different triggerHook for mobile screens
    var triggerHookValue = window.innerWidth < 600 ? 0.4 : 0.7;

    new ScrollMagic.Scene({
      triggerElement: section,
      triggerHook: triggerHookValue,
      reverse: true
    })
    .setTween(tl)
    .addIndicators({ name: "About Me Columns" })
    .addTo(controller);

    // Animate .about-me-heading when it scrolls into view
    var aboutMeHeading = document.querySelector('.about-me-heading');
    if (aboutMeHeading) {
      gsap.set(aboutMeHeading, { x: 50, opacity: 0 });
      new ScrollMagic.Scene({
        triggerElement: aboutMeHeading,
        triggerHook: 0.8,
        reverse: true
      })
      .setTween(
        gsap.to(aboutMeHeading, { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' })
      )
      .addIndicators({ name: 'About Me Heading' })
      .addTo(controller);
    }
  });