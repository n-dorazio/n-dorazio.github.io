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
    loadComponent('footer', '/src/components/footer.html');
    
    // Initialize Lottie animation
    initLottieBackground();

    console.log('All components loaded');
});

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
        }
    });

    // Set animation speed
    animation.setSpeed(0.5);
    
    // Reduce animation quality for better performance
    animation.setQuality('low');

    // Handle resize events with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            animation.resize();
        }, 150);
    });
}