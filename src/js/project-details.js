import { initLottieBackground } from './backgroundAnimation.js';

class ProjectDetails {
    constructor() {
        this.initializeNavLinks();
        this.initializeMobileMenu();
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

    initializeMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const isOpen = navLinks.classList.contains('active');
                menuToggle.querySelector('i').classList.toggle('fa-bars', !isOpen);
                menuToggle.querySelector('i').classList.toggle('fa-times', isOpen);
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                });
            });
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    new ProjectDetails();
});