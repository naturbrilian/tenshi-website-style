/* ========================================
   SHARED JAVASCRIPT UTILITIES
   ======================================== */

// Language Management
const LanguageManager = {
    supportedLanguages: ['en', 'id', 'jp'],
    defaultLanguage: 'id',
    currentLanguage: localStorage.getItem('language') || 'id',

    init() {
        this.setLanguage(this.currentLanguage);
        this.setupLanguageSwitchers();
    },

    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            lang = this.defaultLanguage;
        }
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        this.updateUI();
    },

    getLanguage() {
        return this.currentLanguage;
    },

    setupLanguageSwitchers() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            });
        });
    },

    updateUI() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('active');
            }
        });
    }
};

// Time Widget Management
const TimeWidget = {
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    },

    updateTime() {
        const timeElement = document.querySelector('.time');
        const dateElement = document.querySelector('.date');
        
        if (!timeElement || !dateElement) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const dateString = now.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        timeElement.textContent = timeString;
        dateElement.textContent = dateString;
    }
};

// Mobile Menu Toggle
const MobileMenuManager = {
    init() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.top-nav');
        
        if (toggle && nav) {
            toggle.addEventListener('click', () => this.toggleMenu());
        }
    },

    toggleMenu() {
        const nav = document.querySelector('.top-nav');
        if (nav) {
            nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
        }
    }
};

// Navigation Active State
const NavigationManager = {
    init() {
        this.updateActiveNav();
        window.addEventListener('hashchange', () => this.updateActiveNav());
    },

    updateActiveNav() {
        const navLinks = document.querySelectorAll('.top-nav i[data-page]');
        const currentPage = this.getCurrentPage();

        navLinks.forEach(link => {
            if (link.dataset.page === currentPage) {
                link.classList.add('active-icon');
            } else {
                link.classList.remove('active-icon');
            }
        });
    },

    getCurrentPage() {
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }
};

// API Error Handling
const APIHandler = {
    async fetchWithTimeout(url, options = {}, timeout = 5000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            return null;
        }
    },

    handleError(error, fallbackText = 'Unable to load') {
        console.error('[v0] API Error:', error);
        return fallbackText;
    }
};

// Initialize all systems on page load
document.addEventListener('DOMContentLoaded', () => {
    LanguageManager.init();
    TimeWidget.init();
    MobileMenuManager.init();
    NavigationManager.init();
});
