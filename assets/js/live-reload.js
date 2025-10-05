// Conservative Live Reload for Development
// This script will only refresh when files actually change
// Only active in development mode

(function() {
    'use strict';
    
    // Only run in development (when not in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        
        console.log('🚀 Live reload enabled for development');
        
        let lastModified = {};
        let isChecking = false;
        
        // Function to force a hard refresh
        function forceRefresh() {
            console.log('🔄 File change detected, refreshing page...');
            window.location.reload(true);
        }
        
        // Function to check if files have changed
        function checkForChanges() {
            if (isChecking) return; // Prevent multiple simultaneous checks
            isChecking = true;
            
            const filesToCheck = [
                '/css/styles.css',
                '/css/device-styles.css',
                '/js/mobile-image-slider.js',
                '/budgie.html',
                '/index.html'
            ];
            
            let hasChanges = false;
            let checkedFiles = 0;
            
            filesToCheck.forEach(file => {
                fetch(file + '?t=' + Date.now(), { 
                    method: 'HEAD',
                    cache: 'no-cache'
                })
                .then(response => {
                    if (response.ok) {
                        const lastModifiedHeader = response.headers.get('last-modified');
                        if (lastModifiedHeader) {
                            const currentModified = new Date(lastModifiedHeader).getTime();
                            
                            if (lastModified[file] && lastModified[file] < currentModified) {
                                console.log('File changed:', file);
                                hasChanges = true;
                            }
                            
                            lastModified[file] = currentModified;
                        }
                    }
                })
                .catch(error => {
                    // Silently ignore errors
                })
                .finally(() => {
                    checkedFiles++;
                    
                    // Only refresh after all files have been checked
                    if (checkedFiles === filesToCheck.length) {
                        isChecking = false;
                        
                        if (hasChanges) {
                            // Wait a moment to avoid rapid refreshes
                            setTimeout(forceRefresh, 500);
                        }
                    }
                });
            });
        }
        
        // Check for changes every 5 seconds (much less frequent)
        setInterval(checkForChanges, 5000);
        
        // Add a manual refresh button for testing
        const refreshBtn = document.createElement('button');
        refreshBtn.innerHTML = '🔄 Manual Refresh';
        refreshBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        refreshBtn.addEventListener('click', forceRefresh);
        document.body.appendChild(refreshBtn);
        
        // Add a status indicator
        const statusDiv = document.createElement('div');
        statusDiv.innerHTML = '🟢 Live reload active (conservative)';
        statusDiv.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            z-index: 10000;
            background: #28a745;
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 12px;
            font-family: monospace;
        `;
        document.body.appendChild(statusDiv);
        
        console.log('✅ Conservative live reload setup complete');
    }
})();
