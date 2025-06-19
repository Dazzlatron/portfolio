// Function to update images based on dark mode state
function updateImagesForDarkMode(isDarkMode) {
    const images = {
        '.top-logo': {
            light: 'img/Logo-animation_rollover.gif',
            dark: 'img/Logo-animation_rollover-dark.gif'
        },
        '.top-nav-logo': {
            light: 'img/Logo-animation_rollover.gif',
            dark: 'img/Logo-animation_rollover-dark.gif'
        },
        '.no-1': {
            light: 'img/0-1.svg',
            dark: 'img/0-1-dark.svg'
        },
        '.no-2': {
            light: 'img/0-2.svg',
            dark: 'img/0-2-dark.svg'
        },
        '.no-3': {
            light: 'img/0-3.svg',
            dark: 'img/0-3-dark.svg'
        },
        '.no-4': {
            light: 'img/0-4.svg',
            dark: 'img/0-4-dark.svg'
        },
        '.no-5': {
            light: 'img/0-5.svg',
            dark: 'img/0-5-dark.svg'
        },
        '.no-6': {
            light: 'img/0-6.svg',
            dark: 'img/0-6-dark.svg'
        },
        '.no-7': {
            light: 'img/0-7.svg',
            dark: 'img/0-7-dark.svg'
        },
        '.creativity-icon': {
            light: 'img/creativity-icon.svg',
            dark: 'img/creativity-icon-dark.svg'
        },
        '.technology-icon': {
            light: 'img/technology-icon.svg',
            dark: 'img/technology-icon-dark.svg'
        },
        '.magic-icon': {
            light: 'img/magic-icon.svg',
            dark: 'img/magic-icon-dark.svg'
        },
        '.plus-icon': {
            light: 'img/red-plus-28.svg',
            dark: 'img/red-plus-28-dark.svg'
        },
        '.equals-icon': {
            light: 'img/red-equal.svg',
            dark: 'img/red-equal-dark.svg'
        },
        '.bottom-logo': {
           light: 'img/Logo-animation_rollover.gif',
            dark: 'img/Logo-animation_rollover-dark.gif'
        }
    };

    // Update each image
    Object.entries(images).forEach(([selector, urls]) => {
        const element = document.querySelector(selector);
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