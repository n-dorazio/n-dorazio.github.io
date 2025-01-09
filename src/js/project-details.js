import { initLottieBackground } from './backgroundAnimation.js';

class ProjectDetails {
    constructor() {
        this.initializeNavLinks();
        if (window.lottie) {
            initLottieBackground();
        }
    }

    initializeNavLinks() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                window.location.href = href;
            });
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    new ProjectDetails();
});