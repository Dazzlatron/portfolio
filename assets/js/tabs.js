const tabs = document.querySelectorAll(".tab");
const highlight = document.querySelector(".highlight");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Update active tab
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Slide highlight
    const index = tab.dataset.index;
    highlight.style.transform = `translateX(${index * 100}%)`;

    // Show matching content
    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(`content-${index}`).classList.add("active");
  });
});