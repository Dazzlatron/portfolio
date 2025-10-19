document.addEventListener("DOMContentLoaded", function() {
  function isMobile() {
    return window.innerWidth < 768;
  }
  
  if (isMobile()) {
    console.log('links.js: Mobile device detected - click handlers disabled');
    return;
  }
  
  const project1 = document.getElementById("project1");
  if (project1) {
    project1.style.cursor = "none";
    project1.classList.add('clickable'); // Add this line
    project1.addEventListener("click", function() {
      window.location.href = "pages/budgie.html";
    });
  }
  
  const project2 = document.getElementById("project2");
  if (project2) {
    project2.style.cursor = "none";
    project2.classList.add('clickable'); // Add this line
    project2.addEventListener("click", function() {
      window.location.href = "pages/funds-campaign.html";
    });
  }
});

