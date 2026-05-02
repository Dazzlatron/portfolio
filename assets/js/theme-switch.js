document.addEventListener('DOMContentLoaded', function() {
    const themeSwitches = document.querySelectorAll('.theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference, default to dark if none
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || 'dark'; // Default to dark
    
    // Apply the theme (dark is default, only remove if explicitly light)
    if (currentTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
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
    
    // Listen for system theme changes (only if user hasn't set a preference)
    prefersDarkScheme.addListener(function(e) {
        if (!localStorage.getItem('theme')) {
            // Default to dark even if system prefers light
            document.body.classList.add('dark-mode');
        }
    });
}); 