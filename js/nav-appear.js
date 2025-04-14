
document.addEventListener("DOMContentLoaded", function () {
    var controller = new ScrollMagic.Controller();

    var heroHeight = document.getElementById("hero-section").offsetHeight;
    var nav = document.getElementById("top-nav");

    new ScrollMagic.Scene({
        triggerElement: "#hero-section",
        triggerHook: 0,
        offset: heroHeight // Nav appears after the hero is fully out of view
    })
    .on("enter", function () {
        nav.classList.add("visible");
    })
    .on("leave", function () {
        nav.classList.remove("visible");
    })
    .addTo(controller);
});