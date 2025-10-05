document.addEventListener("DOMContentLoaded", function () {
    console.log("Zoomable image script loaded");
    const zoomableImages = document.querySelectorAll(".zoomable");
    console.log("Found zoomable images:", zoomableImages.length);
    
    zoomableImages.forEach(function(image) {
        console.log("Setting up zoomable image:", image.src);
        // Add magnify icon for mobile/tablet devices
        if (window.innerWidth <= 1024) {
            const magnifyIcon = document.createElement('div');
            magnifyIcon.style.position = 'absolute';
            magnifyIcon.style.bottom = '50%';
            magnifyIcon.style.right = '50%';
            magnifyIcon.style.transform = 'translate(50%, 50%)';
            magnifyIcon.style.width = '60px';
            magnifyIcon.style.height = '60px';
            magnifyIcon.style.backgroundSize = 'contain';
            magnifyIcon.style.backgroundRepeat = 'no-repeat';
            magnifyIcon.style.backgroundPosition = 'center';
            magnifyIcon.style.pointerEvents = 'none';
            magnifyIcon.style.zIndex = '999';
            magnifyIcon.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.07))';
            
            // Function to update icon based on dark mode
            function updateMagnifyIcon() {
                const isDarkMode = document.body.classList.contains('dark-mode');
                magnifyIcon.style.backgroundImage = isDarkMode 
                    ? 'url("../images/magnify-icon-dark.svg")' 
                    : 'url("../images/magnify-icon.svg")';
            }
            
            // Set initial icon
            updateMagnifyIcon();
            
            // Insert the icon into the image's parent container
            if (image.parentNode) {
                image.parentNode.style.position = 'relative';
                image.parentNode.appendChild(magnifyIcon);
            }
            
            // Listen for dark mode changes
            const darkModeObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        updateMagnifyIcon();
                    }
                });
            });
            
            // Start observing the body element for class changes
            darkModeObserver.observe(document.body, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
        let isZoomed = false;
        let isDragging = false;
        let startX, startY, translateX = 0, translateY = 0;
        let lastTranslateX = 0, lastTranslateY = 0;
        
        // Create zoom container
        const zoomContainer = document.createElement('div');
        zoomContainer.className = 'zoom-container';
        zoomContainer.style.display = 'none';
        zoomContainer.style.position = 'fixed';
        zoomContainer.style.top = '0';
        zoomContainer.style.left = '0';
        zoomContainer.style.width = '100%';
        zoomContainer.style.height = '100%';
        zoomContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        zoomContainer.style.zIndex = '10000';
        zoomContainer.style.cursor = 'grab';
        
        
        // Create zoomed image
        const zoomedImage = document.createElement('img');
        zoomedImage.src = image.src;
        zoomedImage.style.position = 'absolute';
        zoomedImage.style.maxWidth = '50vw';
        zoomedImage.style.maxHeight = 'none';
        zoomedImage.style.transform = 'scale(1.5)';
        zoomedImage.style.transformOrigin = 'center';
        zoomedImage.style.transition = 'transform 0.3s ease';
        zoomedImage.style.cursor = 'grab';
        zoomedImage.style.top = '20px';
        
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'close';
        closeButton.innerHTML = '×';
        closeButton.setAttribute('aria-label', 'Close zoomed image');
        
        // Add elements to container
        zoomContainer.appendChild(zoomedImage);
        zoomContainer.appendChild(closeButton);
        document.body.appendChild(zoomContainer);
        
        // Click to zoom
        image.addEventListener('click', function(e) {
            console.log("Zoomable image clicked:", image.src);
            e.preventDefault();
            if (!isZoomed) {
                console.log("Opening zoom for:", image.src);
                openZoom();
            }
        });
        
        // Close zoom
        function closeZoom() {
            isZoomed = false;
            isDragging = false;
            zoomContainer.style.display = 'none';
            document.body.style.overflow = '';
            translateX = 0;
            translateY = 0;
            lastTranslateX = 0;
            lastTranslateY = 0;
            zoomedImage.style.top = '20px';
            zoomedImage.style.left = '';
            zoomedImage.style.transform = 'translate(-50%, -50%) scale(2)';
            zoomedImage.style.cursor = 'grab';
        }
        
        // Open zoom
        function openZoom() {
            console.log("openZoom function called");
            isZoomed = true;
            zoomContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log("Zoom container display set to block");
            
            // Always try to load the dark mode variant for better visibility on dark background
            const originalSrc = image.src;
            const darkModeSrc = originalSrc.replace('.png', '_dark.png').replace('.jpg', '_dark.jpg').replace('.jpeg', '_dark.jpeg');
            
            // Try to load the dark mode variant if it exists
            const img = new Image();
            img.onload = function() {
                zoomedImage.src = darkModeSrc;
            };
            img.onerror = function() {
                // Dark mode variant doesn't exist, keep original
                zoomedImage.src = originalSrc;
            };
            img.src = darkModeSrc;
            
            // Center the image initially
            const containerRect = zoomContainer.getBoundingClientRect();
            const imageRect = zoomedImage.getBoundingClientRect();
            
            // Calculate center position
            translateX = (containerRect.width - imageRect.width) / 2;
            translateY = (containerRect.height - imageRect.height) / 2;
            
            lastTranslateX = translateX;
            lastTranslateY = translateY;
            
            // Center the image both horizontally and vertically
            zoomedImage.style.top = '50%';
            zoomedImage.style.left = '50%';
            zoomedImage.style.transform = 'translate(-50%, -50%) scale(2)';
        }
        
        // Mouse events for dragging
        zoomedImage.addEventListener('mousedown', function(e) {
            if (isZoomed) {
                isDragging = true;
                startX = e.clientX - translateX;
                startY = e.clientY - translateY;
                zoomedImage.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isZoomed && isDragging) {
                translateX = e.clientX - startX;
                translateY = e.clientY - startY;
                
                // Add boundaries to prevent dragging too far
                const containerRect = zoomContainer.getBoundingClientRect();
                const imageRect = zoomedImage.getBoundingClientRect();
                const maxX = containerRect.width - imageRect.width / 2;
                const maxY = containerRect.height - imageRect.height / 2;
                const minX = -imageRect.width / 2;
                const minY = -imageRect.height / 2;
                
                translateX = Math.max(minX, Math.min(maxX, translateX));
                translateY = Math.max(minY, Math.min(maxY, translateY));
                
                zoomedImage.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(2)`;
                lastTranslateX = translateX;
                lastTranslateY = translateY;
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isZoomed) {
                isDragging = false;
                zoomedImage.style.cursor = 'grab';
            }
        });
        
        // Close events
        closeButton.addEventListener('click', closeZoom);
        zoomContainer.addEventListener('click', function(e) {
            if (e.target === zoomContainer) {
                closeZoom();
            }
        });
        
        // Keyboard events
        document.addEventListener('keydown', function(e) {
            if (isZoomed && e.key === 'Escape') {
                closeZoom();
            }
        });
        
        // Touch events for mobile
        zoomedImage.addEventListener('touchstart', function(e) {
            if (isZoomed) {
                isDragging = true;
                const touch = e.touches[0];
                startX = touch.clientX - translateX;
                startY = touch.clientY - translateY;
                zoomedImage.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });
        
        document.addEventListener('touchmove', function(e) {
            if (isZoomed && isDragging) {
                const touch = e.touches[0];
                translateX = touch.clientX - startX;
                translateY = touch.clientY - startY;
                
                // Add boundaries
                const containerRect = zoomContainer.getBoundingClientRect();
                const imageRect = zoomedImage.getBoundingClientRect();
                const maxX = containerRect.width - imageRect.width / 2;
                const maxY = containerRect.height - imageRect.height / 2;
                const minX = -imageRect.width / 2;
                const minY = -imageRect.height / 2;
                
                translateX = Math.max(minX, Math.min(maxX, translateX));
                translateY = Math.max(minY, Math.min(maxY, translateY));
                
                zoomedImage.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(2)`;
                lastTranslateX = translateX;
                lastTranslateY = translateY;
                e.preventDefault();
            }
        });
        
        document.addEventListener('touchend', function() {
            if (isZoomed) {
                isDragging = false;
                zoomedImage.style.cursor = 'grab';
            }
        });
        
        // Always use dark mode variant when zoomed for better visibility on dark background
        const darkModeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && isZoomed) {
                    const originalSrc = image.src;
                    const darkModeSrc = originalSrc.replace('.png', '_dark.png').replace('.jpg', '_dark.jpg').replace('.jpeg', '_dark.jpeg');
                    
                    // Always try to load dark mode variant for better visibility
                    const img = new Image();
                    img.onload = function() {
                        zoomedImage.src = darkModeSrc;
                    };
                    img.onerror = function() {
                        // Dark mode variant doesn't exist, keep original
                        zoomedImage.src = originalSrc;
                    };
                    img.src = darkModeSrc;
                }
            });
        });
        
        // Start observing the body element for class changes
        darkModeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
});