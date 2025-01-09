import { initLottieBackground } from './backgroundAnimation.js';

// Function to load HTML content
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Initialize mobile menu after nav is loaded
        if (elementId === 'nav') {
            initMobileMenu();
        }
        
        // Initialize scrollers after about section is loaded
        if (elementId === 'about') {
            initializeScrollers();
        }

        // Initialize project cards after projects section is loaded
        if (elementId === 'projects') {
            initProjectCards();
        }
    } catch (error) {
        console.error(`Error loading ${componentPath}:`, error);
    }
}

// Load all components when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('nav', '/src/components/nav.html');
    loadComponent('landing', '/src/components/landing.html');
    loadComponent('about', '/src/components/about.html');
    loadComponent('projects', '/src/components/projects.html');
    loadComponent('contact', '/src/components/contact.html');
    
    // Check for hash in URL and scroll to section after components are loaded
    const hash = window.location.hash;
    if (hash) {
        // Wait for components to load
        setTimeout(() => {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500); // Increased timeout to ensure components are loaded
    }
    
    // Initialize Lottie animation
    initLottieBackground();

    console.log('All components loaded');

    // Initialize EmailJS
    emailjs.init("1wMeBe2SEPbkLYxuF");
    
    // Add form submission handler
    document.body.addEventListener('click', function(e) {
        const submitBtn = e.target.closest('.btn-primary');
        if (submitBtn && submitBtn.closest('#contact-form')) {
            e.preventDefault();
            const form = document.getElementById('contact-form');
            if (form) {
                handleFormSubmit(form);
            }
        }
    });
});

function validateForm(form) {
    let isValid = true;
    const errors = {
        name: '',
        email: '',
        message: ''
    };

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');

    // Name validation
    if (!form.name.value.trim()) {
        errors.name = 'Name is required';
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.value.trim()) {
        errors.email = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(form.email.value)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }

    // Message validation
    if (!form.message.value.trim()) {
        errors.message = 'Message is required';
        isValid = false;
    }

    // Display error messages
    if (!isValid) {
        Object.keys(errors).forEach(field => {
            if (errors[field]) {
                document.getElementById(`${field}-error`).textContent = errors[field];
            }
        });
    }

    return isValid;
}

async function handleFormSubmit(form) {
    if (!validateForm(form)) {
        return;
    }
    
    console.log("Handling form submission");
    
    const submitButton = form.querySelector('.submit-btn');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    const formData = {
        from_name: form.name.value,
        from_email: form.email.value,
        message: form.message.value,
        to_name: "Nathaniel D'Orazio"
    };
    
    console.log("Form data:", formData);
    
    try {
        console.log("Attempting to send email...");
        const response = await emailjs.send(
            'service_ze3w9td',
            'template_x7x6bef',
            formData
        );
        console.log("Email sent successfully:", response);
        
        submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        form.reset();
        
    } catch (error) {
        console.error('Failed to send email:', error);
        submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to send';
    }
    
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 3000);
}

function initializeScrollers() {
    const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
}

// Add this function to initialize the mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Toggle menu when hamburger is clicked
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars', !isOpen);
            menuToggle.querySelector('i').classList.toggle('fa-times', isOpen);
        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on a button
            if (e.target.closest('.btn')) return;
            
            const overlay = card.querySelector('.project-overlay');
            // Remove active class from all other overlays
            document.querySelectorAll('.project-overlay.active').forEach(other => {
                if (other !== overlay) {
                    other.classList.remove('active');
                }
            });
            // Toggle current overlay
            overlay.classList.toggle('active');
        });
    });

    // Close overlay when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.project-card')) {
            document.querySelectorAll('.project-overlay.active').forEach(overlay => {
                overlay.classList.remove('active');
            });
        }
    });
}