// Minimal JavaScript for enhanced user experience

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for any anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add keyboard navigation support
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'A') {
                    // Let the default behavior handle the link
                    return;
                }
                e.preventDefault();
                this.click();
            }
        });
    });

    // Simple focus management for better accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    // Add focus indicators for keyboard users
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.setAttribute('data-focus-visible', 'true');
        });

        element.addEventListener('blur', function() {
            this.removeAttribute('data-focus-visible');
        });

        // Only show focus ring for keyboard users
        element.addEventListener('mousedown', function() {
            this.setAttribute('data-mouse-focus', 'true');
        });

        element.addEventListener('keydown', function() {
            this.removeAttribute('data-mouse-focus');
        });
    });

    // Simple print functionality
    function handlePrint() {
        // Clean up any interactive elements for print
        const interactiveElements = document.querySelectorAll('[data-focus-visible]');
        interactiveElements.forEach(el => {
            el.removeAttribute('data-focus-visible');
        });
    }

    // Listen for print events
    window.addEventListener('beforeprint', handlePrint);

    // Simple utility to copy email to clipboard when clicked
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default, let email client open
            const email = this.href.replace('mailto:', '');
            
            // Try to copy to clipboard as additional convenience
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).catch(() => {
                    // Silently fail - not critical functionality
                });
            }
        });
    });

    // Copy phone number to clipboard when clicked
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const phone = this.textContent.trim();
            
            // Try to copy to clipboard as additional convenience
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(phone).catch(() => {
                    // Silently fail - not critical functionality
                });
            }
        });
    });

    // Add subtle loading state
    document.body.classList.add('loaded');
});

// Handle external links - ensure they open in new tab
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.getAttribute('target') === '_blank') {
        // Add security attributes dynamically
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Simple error handling for any potential issues
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // Fail gracefully - don't show error to user for this simple site
});

// Performance optimization: reduce scroll events
let ticking = false;

function handleScroll() {
    // Placeholder for any future scroll-based functionality
    // Currently not needed for this minimal design
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

// Add CSS class for JavaScript-enabled styling
document.documentElement.classList.add('js-enabled');

// Simple utility for better mobile experience
function handleTouchStart() {
    // Add touch class for touch-specific styling if needed
    document.documentElement.classList.add('touch-device');
}

// Detect touch capability
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.addEventListener('touchstart', handleTouchStart, { once: true });
}