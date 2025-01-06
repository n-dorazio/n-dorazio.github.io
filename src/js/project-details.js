import { projects } from './projects.js';
import { loadComponent, initLottieBackground } from './main.js';

class ProjectDetails {
    constructor() {
        this.currentSlide = 0;
        this.projectId = new URLSearchParams(window.location.search).get('id');
        this.project = projects[this.projectId];
        
        if (!this.project) {
            window.location.href = '/';
            return;
        }
        
        this.loadNavigation();
        this.initializeContent();
        this.initializeEventListeners();
    }

    async loadNavigation() {
        await loadComponent('nav', '/src/components/nav.html');
        // Initialize Lottie background
        initLottieBackground();
        // Add event listeners for navigation links
        this.initializeNavLinks();
    }

    initializeNavLinks() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    window.location.href = '/' + href;
                } else {
                    window.location.href = href;
                }
            });
        });
    }

    initializeContent() {
        document.title = `${this.project.title} - Nathaniel D'Orazio`;
        document.querySelector('.project-title').textContent = this.project.title;
        document.querySelector('.project-technologies').textContent = this.project.tech;
        document.querySelector('.project-description').innerHTML = this.project.description;
        
        this.renderMediaCarousel();
        this.renderActionButtons();
    }
    // Reuse the carousel and action button methods from ProjectsManager
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    new ProjectDetails();
});