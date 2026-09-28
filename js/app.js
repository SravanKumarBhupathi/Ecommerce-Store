// General app initialization and event listeners

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }

    // Set dynamic elements from config
    const siteNames = document.querySelectorAll('.site-name-display');
    siteNames.forEach(el => el.textContent = window.siteConfig.SITE_NAME);

    const yearDisplays = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearDisplays.forEach(el => el.textContent = currentYear);
});
