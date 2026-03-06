/* ========================================
   BLOG PAGE JAVASCRIPT
   Blog Management and Content
   ======================================== */

// Blog posts data structure
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with Video Editing",
        date: "2024-03-01",
        category: "tutorial",
        image: "assets/blog-placeholder-1.jpg",
        description: "Learn the basics of video editing and essential tools to get started.",
        slug: "getting-started-video-editing"
    },
    {
        id: 2,
        title: "Modern Graphic Design Trends",
        date: "2024-02-15",
        category: "design",
        image: "assets/blog-placeholder-2.jpg",
        description: "Explore current trends in graphic design and how to incorporate them into your work.",
        slug: "modern-graphic-design-trends"
    },
    {
        id: 3,
        title: "Translation Best Practices",
        date: "2024-02-01",
        category: "translation",
        image: "assets/blog-placeholder-3.jpg",
        description: "Tips and tricks for becoming a better translator and improving quality.",
        slug: "translation-best-practices"
    },
    {
        id: 4,
        title: "Anime Art Style Guide",
        date: "2024-01-22",
        category: "art",
        image: "assets/blog-placeholder-4.jpg",
        description: "A comprehensive guide to understanding and creating anime art styles.",
        slug: "anime-art-style-guide"
    }
];

// Language translations for blog
const blogTranslations = {
    en: {
        nav_blog: "Blog",
        nav_menu: "Menu",
        blog_title: "Latest Posts",
        blog_no_posts: "No posts found",
        read_more: "Read More",
        category_all: "All",
        category_tutorial: "Tutorial",
        category_design: "Design",
        category_translation: "Translation",
        category_art: "Art"
    },
    id: {
        nav_blog: "Blog",
        nav_menu: "Menu",
        blog_title: "Postingan Terbaru",
        blog_no_posts: "Tidak ada postingan",
        read_more: "Baca Selengkapnya",
        category_all: "Semua",
        category_tutorial: "Tutorial",
        category_design: "Desain",
        category_translation: "Terjemahan",
        category_art: "Seni"
    },
    ja: {
        nav_blog: "ブログ",
        nav_menu: "メニュー",
        blog_title: "最新の投稿",
        blog_no_posts: "投稿がありません",
        read_more: "詳しく読む",
        category_all: "すべて",
        category_tutorial: "チュートリアル",
        category_design: "デザイン",
        category_translation: "翻訳",
        category_art: "アート"
    }
};

let currentBlogLang = 'en';
let currentFilter = 'all';

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const locales = {
        en: 'en-US',
        id: 'id-ID',
        ja: 'ja-JP'
    };
    return date.toLocaleDateString(locales[currentBlogLang], {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Render blog cards
function renderBlogPosts(filter = 'all') {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    const filteredPosts = filter === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === filter);

    if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">${blogTranslations[currentBlogLang].blog_no_posts}</p>`;
        return;
    }

    blogGrid.innerHTML = filteredPosts.map(post => `
        <article class="blog-card" data-category="${post.category}">
            <img src="${post.image}" alt="${post.title}" class="b-thumb" loading="lazy">
            <div class="b-content">
                <time class="b-date">${formatDate(post.date)}</time>
                <h3 class="b-title">${post.title}</h3>
                <p class="b-desc">${post.description}</p>
                <a href="read.html?post=${post.slug}" class="b-btn">${blogTranslations[currentBlogLang].read_more}</a>
            </div>
        </article>
    `).join('');
}

// Set language and update blog content
function setBlogLanguage(lang) {
    currentBlogLang = lang;
    const data = blogTranslations[lang];

    // Update text elements
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (data[key]) el.innerText = data[key];
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === (lang === 'ja' ? 'jp' : lang)) {
            btn.classList.add('active');
        }
    });

    // Re-render posts with updated language
    renderBlogPosts(currentFilter);
}

// Filter blog posts by category
function filterBlogPosts(category) {
    currentFilter = category;
    renderBlogPosts(category);
}

// Toggle mobile navigation
function toggleNav() {
    document.getElementById("myTopNav")?.classList.toggle("open");
}

// Initialize blog page
document.addEventListener('DOMContentLoaded', () => {
    // Render initial posts
    renderBlogPosts();
    
    // Set initial language
    setBlogLanguage('en');

    // Setup filter buttons if they exist
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBlogPosts(e.target.dataset.filter);
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Setup language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang || e.target.innerText.toLowerCase();
            const actualLang = lang === 'jp' ? 'ja' : lang;
            setBlogLanguage(actualLang);
        });
    });
});
