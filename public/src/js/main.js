// Function to load HTML content
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${componentPath}:`, error);
    }
}

// Load all components when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('nav', '/public/src/components/nav.html');
    loadComponent('landing', '/public/src/components/landing.html');
    loadComponent('about', '/public/src/components/about.html');
    loadComponent('projects', '/public/src/components/projects.html');
    loadComponent('footer', '/public/src/components/footer.html');
});
