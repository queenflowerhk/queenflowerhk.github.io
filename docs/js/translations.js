/**
 * Translations module - loads and applies i18n translations.
 * Manages language switching and data-i18n attribute resolution.
 */
const Translations = (() => {
    let translations = {};
    let currentLang = 'zh';

    async function load() {
        const res = await fetch('translations.json');
        translations = await res.json();
        // Restore saved language preference
        const saved = localStorage.getItem('fujianFloristLang');
        if (saved && translations[saved]) {
            currentLang = saved;
        }
    }

    function getLang() {
        return currentLang;
    }

    function t(key) {
        return (translations[currentLang] && translations[currentLang][key]) || key;
    }

    function apply() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = t(key);
            if (value !== key) {
                el.textContent = value;
            }
        });

        // Update lang buttons
        const zhBtn = document.getElementById('lang-zh');
        const enBtn = document.getElementById('lang-en');
        if (zhBtn) zhBtn.classList.toggle('active', currentLang === 'zh');
        if (enBtn) enBtn.classList.toggle('active', currentLang === 'en');

        // Update document lang attribute
        document.documentElement.lang = currentLang === 'zh' ? 'zh-Hant' : 'en';
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('fujianFloristLang', lang);
        apply();
    }

    return { load, getLang, t, apply, setLanguage };
})();
