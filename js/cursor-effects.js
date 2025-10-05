const cursor = document.querySelector('.cursor');
const cursorCore = document.querySelector('.cursor-core');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let particles = [];

// Watch for dark mode changes and apply to cursor
function updateCursorTheme() {
    console.log('Checking dark mode...', document.body.classList.contains('dark-mode'));
    if (document.body.classList.contains('dark-mode')) {
        cursor.classList.add('darkmode');
        console.log('Added darkmode to cursor');
    } else {
        cursor.classList.remove('darkmode');
        console.log('Removed darkmode from cursor');
    }
}

// Run on load and check multiple times
updateCursorTheme();
setTimeout(updateCursorTheme, 100);
setTimeout(updateCursorTheme, 500);

// Watch for class changes on body
const observer = new MutationObserver(function(mutations) {
    console.log('Body class changed');
    updateCursorTheme();
});
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

// Smooth cursor movement
function animate() {
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
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input[type="button"], input[type="submit"], .clickable');
    interactiveElements.forEach(el => {
        // Only add listeners if not already processed
        if (!processedElements.has(el)) {
            processedElements.add(el);
            
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-expand');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-expand');
            });
        }
    });
}

// Initial setup
updateInteractiveElements();

// Re-scan for new elements periodically (for dynamically added content)
setInterval(updateInteractiveElements, 1000);

animate();