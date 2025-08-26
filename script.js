function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Copy email function
window.copyEmail = function() {
    const email = 'nathaniel.dorazio.m@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        // Create and show popup notification
        showCopyNotification();
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
};

// Show copy notification popup
function showCopyNotification() {
    // Find the email element
    const emailElement = document.querySelector('.contact-email');
    if (!emailElement) return;
    
    // Store original text
    const originalText = emailElement.textContent;
    
    // Hide email and show notification
    emailElement.style.opacity = '0';
    emailElement.textContent = 'Copied!';
    emailElement.style.color = 'var(--color-accent-dark)';
    emailElement.style.fontWeight = '600';
    
    // Show the notification
    setTimeout(() => {
        emailElement.style.opacity = '1';
    }, 50);
    
    // Restore email after 1.5 seconds
    setTimeout(() => {
        emailElement.style.opacity = '0';
        setTimeout(() => {
            emailElement.textContent = originalText;
            emailElement.style.color = 'var(--color-primary-dark)';
            emailElement.style.fontWeight = '600';
            emailElement.style.opacity = '1';
        }, 200);
    }, 1500);
}