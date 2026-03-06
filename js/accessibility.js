/* ========================================
   ACCESSIBILITY UTILITIES
   WCAG 2.1 AA Compliance Helpers
   ======================================== */

// Keyboard Navigation Support
const AccessibilityManager = {
    // Initialize accessibility features
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
        this.setupSkipLinks();
    },

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        const focusableElements = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];

        const focusables = document.querySelectorAll(focusableElements.join(','));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Skip to main content (Alt+M)
            if ((e.altKey || e.ctrlKey) && e.key === 'm') {
                const mainContent = document.querySelector('main') || document.querySelector('.main-stage');
                if (mainContent) mainContent.focus();
            }
            
            // Menu toggle (Alt+N)
            if ((e.altKey || e.ctrlKey) && e.key === 'n') {
                const menuBtn = document.querySelector('[onclick*="toggleNav"]');
                if (menuBtn) menuBtn.click();
            }

            // Language shortcuts
            if ((e.altKey || e.ctrlKey) && e.key === '1') {
                this.setLanguage('en');
                e.preventDefault();
            }
            if ((e.altKey || e.ctrlKey) && e.key === '2') {
                this.setLanguage('id');
                e.preventDefault();
            }
            if ((e.altKey || e.ctrlKey) && e.key === '3') {
                this.setLanguage('ja');
                e.preventDefault();
            }
        });
    },

    // Focus management for modals and dropdowns
    setupFocusManagement() {
        // Trap focus in modals when open
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    modal.style.display = 'none';
                }
            });
        });
    },

    // Setup ARIA labels
    setupAriaLabels() {
        // Links without text content
        document.querySelectorAll('a').forEach(link => {
            if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
                const title = link.getAttribute('title');
                if (title) {
                    link.setAttribute('aria-label', title);
                }
            }
        });

        // Buttons
        document.querySelectorAll('button').forEach(button => {
            if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
                button.setAttribute('role', 'button');
            }
        });

        // Icons
        document.querySelectorAll('i[class*="fa"]').forEach(icon => {
            const parent = icon.closest('a, button');
            if (parent && !parent.getAttribute('aria-label')) {
                const classStr = icon.className;
                if (classStr.includes('home')) parent.setAttribute('aria-label', 'Home');
                if (classStr.includes('user')) parent.setAttribute('aria-label', 'Profile');
                if (classStr.includes('blog')) parent.setAttribute('aria-label', 'Blog');
                if (classStr.includes('image')) parent.setAttribute('aria-label', 'Gallery');
                if (classStr.includes('bars')) parent.setAttribute('aria-label', 'Menu');
            }
        });

        // Form fields
        document.querySelectorAll('input, textarea, select').forEach(field => {
            if (!field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
                const label = document.querySelector(`label[for="${field.id}"]`);
                if (!label && field.placeholder) {
                    field.setAttribute('aria-label', field.placeholder);
                }
            }
        });
    },

    // Setup skip links
    setupSkipLinks() {
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Skip to main content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    },

    // Set language with notification
    setLanguage(lang) {
        if (typeof setLanguage === 'function') {
            setLanguage(lang);
            this.announce(`Language changed to ${lang.toUpperCase()}`);
        }
    },

    // Screen reader announcements
    announce(message, priority = 'polite') {
        let live = document.querySelector('[role="status"]');
        if (!live) {
            live = document.createElement('div');
            live.setAttribute('role', 'status');
            live.setAttribute('aria-live', priority);
            live.setAttribute('aria-atomic', 'true');
            live.style.position = 'absolute';
            live.style.left = '-10000px';
            live.style.width = '1px';
            live.style.height = '1px';
            live.style.overflow = 'hidden';
            document.body.appendChild(live);
        }
        live.setAttribute('aria-live', priority);
        live.textContent = message;
        setTimeout(() => {
            live.textContent = '';
        }, 3000);
    },

    // Check contrast ratio
    checkContrast() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const bg = style.backgroundColor;
            const color = style.color;
            // Log elements that may have contrast issues
            if (bg && color && bg !== 'rgba(0, 0, 0, 0)') {
                // Contrast checking logic would go here
            }
        });
    },

    // Enhance form validation feedback
    setupFormAccessibility() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                const inputs = form.querySelectorAll('[required]');
                let hasErrors = false;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        hasErrors = true;
                        input.setAttribute('aria-invalid', 'true');
                        const errMsg = document.createElement('span');
                        errMsg.className = 'error-message';
                        errMsg.setAttribute('role', 'alert');
                        errMsg.textContent = `${input.name} is required`;
                        input.parentElement.appendChild(errMsg);
                    } else {
                        input.setAttribute('aria-invalid', 'false');
                    }
                });

                if (hasErrors) {
                    e.preventDefault();
                    this.announce('Please fix errors in the form');
                }
            });
        });
    }
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        AccessibilityManager.init();
    });
} else {
    AccessibilityManager.init();
}
