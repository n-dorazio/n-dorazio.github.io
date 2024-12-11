// Function to load HTML content
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Initialize scrollers after about section is loaded
        if (elementId === 'about') {
            initializeScrollers();
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
    
    // Initialize Lottie animation
    initLottieBackground();

    console.log('All components loaded');

    // Initialize EmailJS
    (function() {
        emailjs.init("1wMeBe2SEPbkLYxuF");
        console.log("EmailJS initialized");
    })();

    // Add form submission handler
    console.log("Setting up form submission handler");
    
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.submit-btn')) {
            console.log("Submit button clicked");
            const form = document.getElementById('contact-form');
            handleFormSubmit(form);
        }
    });
});

async function handleFormSubmit(form) {
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

function initLottieBackground() {
    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie-background'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'src/assets/BackgroundAnimation.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: true,
            hideOnTransparent: true,
            className: 'lottie-svg'
        }
    });

    // Set animation speed
    animation.setSpeed(0.5);
}
