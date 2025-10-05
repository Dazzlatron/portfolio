// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("dotCanvas");
    const heroSection = document.getElementById("hero-section");
    
    // Check if elements exist
    if (!canvas || !heroSection) {
        console.log('Dots background: Canvas or hero section not found');
        return;
    }
    
    const ctx = canvas.getContext("2d");

let dots = [];
let ripples = [];
let animating = false;

const spacing = 12;
const minRadius = 1;
const maxRadius = 1.6;
const rippleRadius = 150;
const rippleDuration = 400;

// Check if we're on the budgie.html page
const isBudgiePage = window.location.pathname.includes('budgie.html');

// Color configuration
const colors = {
    light: {
        base: "#D5D5D5",
        baseShade: 205,
        targetShade: 85  // Darkened value for ripple in light mode
    },
    dark: {
        base: "#3d3d3d",
        baseShade: 52,
        targetShade: 196  // Lightened value for ripple in dark mode
    }
};

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getCurrentColorScheme() {
    return document.body.classList.contains('dark-mode') ? colors.dark : colors.light;
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function drawStaticDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colorScheme = getCurrentColorScheme();
    
    dots.forEach(dot => {
        ctx.globalAlpha = dot.opacity;
        ctx.fillStyle = colorScheme.base; // Use the base color directly
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, minRadius, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
}

function generateDots() {
    dots = [];
    const colorScheme = getCurrentColorScheme();
    
    for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
            dots.push({ 
                x, 
                y,
                size: minRadius,
                opacity: 1,
                color: colorScheme.base // Set initial color from scheme
            });
        }
    }
    drawStaticDots();
}

function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
    generateDots();
}

function animateDots(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ripples = ripples.filter(r => currentTime - r.time < rippleDuration);
    const colorScheme = getCurrentColorScheme();

    dots.forEach(dot => {
        let closestRipple = null;
        let closestDistance = Infinity;

        ripples.forEach(ripple => {
            const dx = ripple.x - dot.x;
            const dy = ripple.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < rippleRadius && distance < closestDistance) {
                closestDistance = distance;
                closestRipple = ripple;
            }
        });

        let size = minRadius;
        let opacity = 1;
        let shade = colorScheme.baseShade;

        if (closestRipple) {
            const t = 1 - closestDistance / rippleRadius;
            const elapsed = currentTime - closestRipple.time;
            const progress = Math.min(elapsed / rippleDuration, 1);
            const pulse = easeInOutCubic(t * (1 - progress));

            size = minRadius + pulse * (maxRadius - minRadius);
            opacity = 0.6 + 0.4 * pulse;
            shade = colorScheme.baseShade + pulse * (colorScheme.targetShade - colorScheme.baseShade);
            shade = Math.max(0, Math.min(255, Math.round(shade)));
        }

        dot.size = size;
        dot.opacity = opacity;
        dot.color = `rgb(${shade}, ${shade}, ${shade})`;

        ctx.globalAlpha = dot.opacity;
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });

    if (ripples.length > 0) {
        requestAnimationFrame(animateDots);
    } else {
        animating = false;
        drawStaticDots();
    }
}

    // Handle color scheme changes
    const observer = new MutationObserver(() => {
        generateDots();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 100));

    // Only add ripple animation on large screens AND not on budgie.html page
    if (window.innerWidth >= 1200 && !isBudgiePage) {
        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();
            ripples.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                time: performance.now()
            });
            if (!animating) {
                animating = true;
                requestAnimationFrame(animateDots);
            }
        });
    }
});