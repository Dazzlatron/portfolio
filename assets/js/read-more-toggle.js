(function() {
    function initReadMore() {
      // Only run on mobile
      if (window.innerWidth > 768) {
        document.querySelectorAll(".toggle-btn").forEach(btn => btn.remove());
        document.querySelectorAll(".read-more-text").forEach(p => {
          p.style.maxHeight = "none";
          p.classList.remove("open");
        });
        return;
      }
      
      document.querySelectorAll(".read-more-wrapper").forEach(wrapper => {
        const text = wrapper.querySelector(".read-more-text");
        if (!text) return;
        
        // Check if content actually overflows
        const isOverflowing = text.scrollHeight > text.clientHeight;
        
        // Remove existing button if present
        const existingBtn = wrapper.querySelector(".toggle-btn");
        if (existingBtn) existingBtn.remove();
        
        // Only add button if content overflows
        if (!isOverflowing) return;
        
        // Create button
        const btn = document.createElement("span");
        btn.className = "toggle-btn";
        btn.textContent = "Read more";
        
        btn.addEventListener("click", function(e) {
          e.stopPropagation(); // Prevent paragraph click from firing
          if (text.classList.contains("open")) {
            text.classList.remove("open");
            text.style.maxHeight = "1.5em";
            btn.textContent = "Read more";
          } else {
            text.classList.add("open");
            text.style.maxHeight = text.scrollHeight + "px";
            btn.textContent = "Read less";
          }
        });
        
        // Click on paragraph to close when open
        text.addEventListener("click", function() {
          if (text.classList.contains("open")) {
            text.classList.remove("open");
            text.style.maxHeight = "0";
            btn.textContent = "Read more";
          }
        });
        
        wrapper.appendChild(btn);
      });
    }
    
    // Run on load + resize
    window.addEventListener("load", initReadMore);
    window.addEventListener("resize", initReadMore);
  })();