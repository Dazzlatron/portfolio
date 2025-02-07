 const canvas = document.getElementById("dotCanvas");
    const ctx = canvas.getContext("2d");
    const heroSection = document.getElementById("hero-section");

    let dots = [];
    const spacing = 12; // Adjusted spacing for better aspect ratio
    const minRadius = 1;
    const maxRadius = 2;
    const hoverRadius = 100;
    let mouseX = -100, mouseY = -100;
    let isMouseMoving = false;

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
                targetSize: minRadius, 
                color: "#E4E4E4", 
                velocity: 0 
            });
        }
    }
}

    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dots.forEach(dot => {
            const distance = Math.hypot(mouseX - dot.x, mouseY - dot.y);
            
            if (isMouseMoving && distance < hoverRadius) {
                let effectStrength = (hoverRadius - distance) / hoverRadius;
                dot.targetSize = minRadius + effectStrength * (maxRadius - minRadius);

                // Color transition from #E4E4E4 to #000000
                let shade = Math.floor(228 - (effectStrength * 190));
                dot.color = `rgb(${shade}, ${shade}, ${shade})`;
            } else {
                dot.targetSize = minRadius;
                dot.color = "#E4E4E4";
            }

            // Smoother easing with extended transition
            let stiffness = 0.1;   // Slower response for a gentle effect
            let damping = 0.8;     // More gradual fade-out

            let force = dot.targetSize - dot.size;
            dot.velocity += force * stiffness;
            dot.velocity *= damping;
            dot.size += dot.velocity;

            ctx.fillStyle = dot.color;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateDots);
    }

    let mouseTimeout;
    heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isMouseMoving = true;
        
        // Reset timer when mouse moves
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    animateDots();