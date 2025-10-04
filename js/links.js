document.addEventListener("DOMContentLoaded", function() {
  // Check if device is mobile (screen width less than 768px)
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Skip all functionality on mobile
  if (isMobile()) {
    console.log('links.js: Mobile device detected - click handlers disabled');
    return;
  }

  const project1 = document.getElementById("project1");

  // make cursor a pointer
  if (project1) {
    project1.style.cursor = "pointer";
    project1.addEventListener("click", function() {
      window.location.href = "budgie.html";
    });
  }

  const project2 = document.getElementById("project2");

  // make cursor a pointer
  if (project2) {
    project2.style.cursor = "pointer";
    project2.addEventListener("click", function() {
      window.location.href = "funds-campaign.html";
    });
  }
});