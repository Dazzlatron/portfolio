// Function to update images based on dark mode state
function updateImagesForDarkMode(isDarkMode) {
    // Detect the correct base path based on current location
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '../assets/images/' : 'assets/images/';
    
    const images = {
        '.top-logo': {
            light: basePath + 'Logo-animation_rollover_05.25.gif',
            dark: basePath + 'logo-animation_rollover-dark.gif'
        },
        '.top-nav-logo': {
            light: basePath + 'Logo-animation_rollover_05.25.gif',
            dark: basePath + 'logo-animation_rollover-dark.gif'
        },
        '.no-1': {
            light: basePath + '0-1.svg',
            dark: basePath + '0-1-dark.svg'
        },
        '.no-2': {
            light: basePath + '0-2.svg',
            dark: basePath + '0-2-dark.svg'
        },
        '.no-3': {
            light: basePath + '0-3.svg',
            dark: basePath + '0-3-dark.svg'
        },
        '.no-4': {
            light: basePath + '0-4.svg',
            dark: basePath + '0-4-dark.svg'
        },
        '.no-5': {
            light: basePath + '0-5.svg',
            dark: basePath + '0-5-dark.svg'
        },
        '.no-6': {
            light: basePath + '0-6.svg',
            dark: basePath + '0-6-dark.svg'
        },
        '.no-7': {
            light: basePath + '0-7.svg',
            dark: basePath + '0-7-dark.svg'
        },
        '.creativity-icon': {
            light: basePath + 'Creativity-icon.svg',
            dark: basePath + 'Creativity-icon-dark.svg'
        },
        '.technology-icon': {
            light: basePath + 'Technology-icon.svg',
            dark: basePath + 'Technology-icon-dark.svg'
        },
        '.magic-icon': {
            light: basePath + 'magic-icon.svg',
            dark: basePath + 'magic-icon-dark.svg'
        },
        '.plus-icon': {
            light: basePath + 'red-plus-28.svg',
            dark: basePath + 'red-plus-28-dark.svg'
        },
        '.equals-icon': {
            light: basePath + 'red-equal.svg',
            dark: basePath + 'red-equal-dark.svg'
        },
        '.bottom-logo': {
           light: basePath + 'Logo-animation_rollover.gif',
            dark: basePath + 'Logo-animation_rollover-dark.gif'
        },
        '.circle-prod-1': {
           light: basePath + 'budgie-prod-one.png',
            dark: basePath + 'budgie-prod-one-dark.png'
        },
        '.circle-prod-2': {
           light: basePath + 'budgie-prod-two.png',
            dark: basePath + 'budgie-prod-two-dark.png'
        },
        '.circle-prod-3': {
           light: basePath + 'budgie-prod-three.png',
            dark: basePath + 'budgie-prod-three-dark.png'
        },
        '.affinity-map': {
           light: basePath + 'affinity_map_budgie.png',
            dark: basePath + 'affinity_map_budgie_dark.png'
        },
        '.quote-icon': {
            light: basePath + 'quotation-2.svg',
             dark: basePath + 'quotation-2-dark.svg'
         }
    };

    // Update each image
    Object.entries(images).forEach(([selector, urls]) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element) {
                element.src = isDarkMode ? urls.dark : urls.light;
                if (selector === '.top-logo' || selector === '.top-nav-logo') {
                    element.style.opacity = 1;
                    if (typeof replayLogo === 'function') {
                        replayLogo(element);
                    }
                }
            }
        });
    });
}

// Listen for dark mode changes
const darkModeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isDarkMode = document.body.classList.contains('dark-mode');
            updateImagesForDarkMode(isDarkMode);
        }
    });
});

// Start observing the body element for class changes
darkModeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
});

// Initial check
updateImagesForDarkMode(document.body.classList.contains('dark-mode')); 