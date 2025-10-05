let cursor, cursorCore, cursorRing;
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let particles = [];

// Initialize cursor elements
function initCursorElements() {
    cursor = document.querySelector('.cursor');
    cursorCore = document.querySelector('.cursor-core');
    cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursor) {
        console.warn('Cursor element not found');
        return false;
    }
    return true;
}

// Watch for dark mode changes and apply to cursor
function updateCursorTheme() {
    if (!cursor) return;
    
    console.log('Checking dark mode...', document.body.classList.contains('dark-mode'));
    if (document.body.classList.contains('dark-mode')) {
        cursor.classList.add('darkmode');
        console.log('Added darkmode to cursor');
    } else {
        cursor.classList.remove('darkmode');
        console.log('Removed darkmode from cursor');
    }
}

// Initialize when DOM is ready
function initializeCursorEffects() {
    if (initCursorElements()) {
        // Watch for class changes on body
        const observer = new MutationObserver(function(mutations) {
            console.log('Body class changed');
            updateCursorTheme();
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        
        // Run on load and check multiple times
        updateCursorTheme();
        setTimeout(updateCursorTheme, 100);
        setTimeout(updateCursorTheme, 500);
        
        // Initial setup
        updateInteractiveElements();
        
        // Re-scan for new elements periodically (for dynamically added content)
        setInterval(updateInteractiveElements, 1000);
        
        // Start animation
        animate();
    } else {
        // Retry after a short delay
        setTimeout(initializeCursorEffects, 100);
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCursorEffects);
} else {
    initializeCursorEffects();
}

// Smooth cursor movement
function animate() {
    if (!cursor) return;
    
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
   
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
   
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
   
    requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Hover effects - dynamically detect all interactive elements
const processedElements = new Set();

function updateInteractiveElements() {
    if (!cursor) return;
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], [role="tab"], .tab, .theme-switch, .to-top-icon, input[type="button"], input[type="submit"], .clickable, [onclick]');
    interactiveElements.forEach(el => {
        // Only add listeners if not already processed
        if (!processedElements.has(el)) {
            processedElements.add(el);
           
            el.addEventListener('mouseenter', () => {
                if (cursor) cursor.classList.add('hover-expand');
            });
           
            el.addEventListener('mouseleave', () => {
                if (cursor) cursor.classList.remove('hover-expand');
            });
        }
    });
}

// Also check what's under the cursor in real-time (catches nested elements)
document.addEventListener('mouseover', (e) => {
    if (!cursor) return;
    
    const target = e.target;
    // Check if the element or any parent is interactive
    const isInteractive = target.closest('a, button, [role="button"], [role="tab"], .tab, .theme-switch, .to-top-icon, input[type="button"], input[type="submit"], .clickable, [onclick]');
    
    if (isInteractive) {
        cursor.classList.add('hover-expand');
    } else {
        cursor.classList.remove('hover-expand');
    }
});
