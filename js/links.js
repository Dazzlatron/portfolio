document.addEventListener("DOMContentLoaded", function() {
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