const canvas = document.getElementById("dotCanvas");
const ctx = canvas.getContext("2d");
const heroSection = document.getElementById("hero-section");

let dots = [];
let ripples = [];

const spacing = 12;
const minRadius = 1;
const maxRadius = 1.8;
const rippleRadius = 150;
const rippleDuration = 400;

// ⬇️ Smooth ease-in-out cubic
function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getBaseColor() {
    return document.body.classList.contains('dark-mode') ? "#313131" : "#DADADA";
}

function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
    generateDots();
}

function generateDots() {
    dots = [];
    for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
            dots.push({ 
                x, 
                y,
                size: minRadius,
                opacity: 1,
                color: getBaseColor()
            });
        }
    }
}

function animateDots(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ripples = ripples.filter(r => currentTime - r.time < rippleDuration);

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
        let baseShade, shade;
const isDark = document.body.classList.contains('dark-mode');

if (isDark) {
    baseShade = 49; // darker base
} else {
    baseShade = 226; // lighter base
}
shade = baseShade;

if (closestRipple) {
    const t = 1 - closestDistance / rippleRadius;
    const elapsed = currentTime - closestRipple.time;
    const progress = Math.min(elapsed / rippleDuration, 1);
    const pulse = easeInOutCubic(t * (1 - progress));

    size = minRadius + pulse * (maxRadius - minRadius);
    opacity = 0.6 + 0.4 * pulse;

    if (isDark) {
        // Lighten in dark mode, up to rgb(196, 195, 195)
        shade = baseShade + pulse * (190 - baseShade);
    } else {
        // Darken slightly in light mode
        shade = baseShade - pulse * 120;
    }

    // Clamp between 0–255
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
        ctx.globalAlpha = 1;
    });

    requestAnimationFrame(animateDots);
}

heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        time: performance.now()
    });
});

// Initialize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
requestAnimationFrame(animateDots);
