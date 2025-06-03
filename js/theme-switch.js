document.addEventListener('DOMContentLoaded', function() {
    const themeSwitches = document.querySelectorAll('.theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Handle theme switch click for all toggles
    themeSwitches.forEach(themeSwitch => {
      themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Save the theme preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
      });
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addListener(function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}); 