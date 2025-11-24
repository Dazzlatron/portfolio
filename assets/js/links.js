document.addEventListener("DOMContentLoaded", function() {
  console.log('links.js: DOMContentLoaded fired');
  
  function isMobile() {
    return window.innerWidth < 768;
  }
  
  if (isMobile()) {
    console.log('links.js: Mobile device detected - click handlers disabled');
    return;
  }
  
  const project1 = document.getElementById("project1");
  console.log('links.js: project1 found:', !!project1);
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

  const project3 = document.getElementById("project3");
  if (project3) {
    project3.style.cursor = "none";
    project3.classList.add('clickable'); // Add this line
    project3.addEventListener("click", function() {
      window.location.href = "pages/form-optimisation.html";
    });
  }

  const project4 = document.getElementById("project4");
  if (project4) {
    project4.style.cursor = "none";
    project4.classList.add('clickable'); // Add this line
    project4.addEventListener("click", function() {
      window.location.href = "pages/costar-website-reskin.html";
    });
  }

  const project5 = document.getElementById("project5");
  if (project5) {
    project5.style.cursor = "none";
    project5.classList.add('clickable'); // Add this line
    project5.addEventListener("click", function() {
      window.location.href = "pages/loopnet-solutions.html";
    });
  }
  
  console.log('links.js: All project links initialized');
});


  


