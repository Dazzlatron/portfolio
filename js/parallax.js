document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        projects.forEach(project => {
            const speed = parseFloat(project.getAttribute('data-speed'));
            const offset = 50; // Base offset for all projects
            const translateY = -scrollTop * speed + offset;
            
            project.style.opacity = '1';
            project.style.transform = `translateY(${translateY}px)`;
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case elements are already in view
});
