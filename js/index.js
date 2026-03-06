/* ========================================
   INDEX PAGE SPECIFIC JAVASCRIPT
   ======================================== */

// Translation data
const translations = {
    en: {
        nav_home: "Home",
        nav_menu: "Menu",
        discord_title: "DISCORD PRESENCE",
        char_name: "Lieba Natur Brilian",
        chat_msg: "Either you run the day, or the day runs you.",
        info_text: "My name is Lieba Natur Brilian, and people also call me Natur. I am a graphic designer, video editor, and contributor translator for various services, applications, and software. People also know me as gingalibadeidara on other websites such as Alphacoders.",
        lastfm_title: "NOW PLAYING",
        locale: "en-US"
    },
    id: {
        nav_home: "Beranda",
        nav_menu: "Menu",
        discord_title: "STATUS DISCORD",
        char_name: "Lieba Natur Brilian",
        chat_msg: "Baiklah, kamu yang mengendalikan hari ini, atau hari ini yang mengendalikanmu.",
        info_text: "Aku Lieba Natur Brilian, dan orang-orang juga memanggilku dengan nama Natur. Aku seorang desainer grafis, editor video, dan penerjemah kontributor untuk berbagai layanan, aplikasi, dan perangkat lunak. Orang-orang juga mengenalku sebagai gingalibadeidara di situs web lain seperti Alphacoders.",
        lastfm_title: "SEDANG DIPUTAR",
        locale: "id-ID"
    },
    ja: {
        nav_home: "ホーム",
        nav_menu: "メニュー",
        discord_title: "DISCORD ステータス",
        char_name: "リーバ・ナトゥール",
        chat_msg: "「一日は君が支配するものであって、一日に支配されるものではなくて」",
        info_text: "私の名前はリーバ・ナチュール・ブリリアンです。ナチュールとも呼ばれています。グラフィックデザイナー、ビデオ編集者、そして様々なサービス、アプリケーション、ソフトウェアの翻訳者として活動しています。アルファコーダーズなどの他のウェブサイトでは、gingalibadeidara としても知られています。",
        lastfm_title: "再生中",
        locale: "ja-JP"
    }
};

// Discord status translations
const discordStatusLang = {
    en: { online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline" },
    id: { online: "Online", idle: "Santai", dnd: "Jangan Ganggu", offline: "Offline" },
    ja: { online: "オンライン", idle: "退席中", dnd: "応答不可", offline: "オフライン" }
};

let currentLang = 'en';
let currentDcStatus = 'offline';

// Set language and update UI
function setLanguage(lang) {
    currentLang = lang;
    const data = translations[lang];

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (data[key]) el.innerText = data[key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === (lang === 'ja' ? 'jp' : lang)) {
            btn.classList.add('active');
        }
    });

    updateClock();
    updateDiscordUIText();
}

// Toggle mobile navigation
function toggleNav() {
    document.getElementById("myTopNav").classList.toggle("open");
}

// Update clock widget
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    document.querySelector('.time').innerText = `${hours}:${minutes} ${ampm}`;

    const locale = translations[currentLang].locale;
    document.querySelector('.date').innerText = now.toLocaleDateString(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}

// Fetch Last.fm data
async function fetchLastFM() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=naturbrilian&api_key=411b298c830d3599a94c097d70bc953e&format=json&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const track = data.recenttracks.track[0];
        const widget = document.getElementById('lastfm-widget');

        if (track && track['@attr'] && track['@attr'].nowplaying === 'true') {
            document.getElementById('track-name').innerText = track.name;
            document.getElementById('track-artist').innerText = track.artist['#text'];
            document.getElementById('track-art').src = track.image[2]['#text'];
            widget.style.display = 'block';
        } else {
            widget.style.display = 'none';
        }
    } catch (err) {
        console.error("[v0] Last.fm Error:", err);
    }
}

// Fetch Discord status
async function fetchDiscordData() {
    const discordId = "304313603253862401";
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const json = await response.json();

        if (json.success) {
            const user = json.data.discord_user;
            currentDcStatus = json.data.discord_status;

            document.getElementById('dc-name').innerText = user.display_name || user.username;

            const ext = user.avatar && user.avatar.startsWith("a_") ? "gif" : "png";
            if (user.avatar) {
                document.getElementById('dc-pfp').src = `https://cdn.discordapp.com/avatars/${discordId}/${user.avatar}.${ext}?size=128`;
            } else {
                document.getElementById('dc-pfp').src = `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png`;
            }

            // Update status dot color
            const dot = document.getElementById('dc-dot');
            if (currentDcStatus === 'online') {
                dot.style.backgroundColor = 'var(--status-online)';
            } else if (currentDcStatus === 'idle') {
                dot.style.backgroundColor = 'var(--status-idle)';
            } else if (currentDcStatus === 'dnd') {
                dot.style.backgroundColor = 'var(--status-dnd)';
            } else {
                dot.style.backgroundColor = 'var(--status-offline)';
            }

            updateDiscordUIText();
        } else {
            document.getElementById('dc-name').innerText = "Not in Server";
            document.getElementById('dc-status-text').innerText = "Please join Lanyard Discord";
        }
    } catch (err) {
        console.error("[v0] Error fetching Discord status:", err);
        document.getElementById('dc-name').innerText = "Error Fetching";
    }
}

// Update Discord UI text based on current language
function updateDiscordUIText() {
    const statusTextStr = discordStatusLang[currentLang][currentDcStatus];
    document.getElementById('dc-status-text').innerText = statusTextStr || "Offline";
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('en');
    updateClock();
    fetchDiscordData();
    fetchLastFM();

    // Set intervals for updates
    setInterval(updateClock, 1000);
    setInterval(fetchDiscordData, 30000);
    setInterval(fetchLastFM, 15000);
});
