document.addEventListener("DOMContentLoaded", function () {
    const zoomableImages = document.querySelectorAll(".zoomable");
    
    zoomableImages.forEach(function(image) {
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
        zoomContainer.style.zIndex = '9999';
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
        closeButton.innerHTML = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '20px';
        closeButton.style.right = '20px';
        closeButton.style.background = 'rgba(255, 255, 255, 0.2)';
        closeButton.style.border = 'none';
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '30px';
        closeButton.style.width = '50px';
        closeButton.style.height = '50px';
        closeButton.style.borderRadius = '50%';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '10000';
        closeButton.style.transition = 'background 0.3s ease';
        
        closeButton.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        closeButton.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        // Add elements to container
        zoomContainer.appendChild(zoomedImage);
        zoomContainer.appendChild(closeButton);
        document.body.appendChild(zoomContainer);
        
        // Click to zoom
        image.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isZoomed) {
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
            zoomedImage.style.transform = 'scale(2) translate(0, 0)';
            zoomedImage.style.cursor = 'grab';
        }
        
        // Open zoom
        function openZoom() {
            isZoomed = true;
            zoomContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Center the image initially
            const containerRect = zoomContainer.getBoundingClientRect();
            const imageRect = zoomedImage.getBoundingClientRect();
            
            translateX = (containerRect.width - imageRect.width) / 2;
            translateY = (containerRect.height - imageRect.height) / 2;
            
            lastTranslateX = translateX;
            lastTranslateY = translateY;
            
            zoomedImage.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
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
                
                zoomedImage.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
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
                
                zoomedImage.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
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
        
        // Update zoomed image when dark mode changes (for images that have dark mode variants)
        const darkModeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && isZoomed) {
                    // Check if this image has a dark mode variant and update accordingly
                    if (image.classList.contains('affinity-map')) {
                        const isDarkMode = document.body.classList.contains('dark-mode');
                        zoomedImage.src = isDarkMode ? 'img/affinity_map_budgie_dark.png' : 'img/affinity_map_budgie.png';
                    }
                    // Add more image types here as needed
                    // else if (image.classList.contains('flow-chart')) {
                    //     const isDarkMode = document.body.classList.contains('dark-mode');
                    //     zoomedImage.src = isDarkMode ? 'img/flow-chart-dark.png' : 'img/flow-chart.png';
                    // }
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