function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Skill card click-to-pin functionality
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle pinned state for the clicked card
            this.classList.toggle('pinned');
            
            // Optional: Close other pinned cards (uncomment if you want only one card open at a time)
            // skillCards.forEach(otherCard => {
            //     if (otherCard !== this) {
            //         otherCard.classList.remove('pinned');
            //     }
            // });
        });
        
        // Prevent the card from closing when hovering over a pinned card
        card.addEventListener('mouseleave', function() {
            // The pinned class will keep the description visible even after mouse leave
        });
    });
    
    // Optional: Close all pinned cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.skill-card')) {
            skillCards.forEach(card => {
                // Uncomment the line below if you want cards to close when clicking outside
                // card.classList.remove('pinned');
            });
        }
    });
    
    // Project card click-to-pin functionality
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't pin if clicking on a link
            if (e.target.closest('.project-link')) {
                return;
            }
            
            e.preventDefault();
            
            // Toggle pinned state for the clicked card
            this.classList.toggle('pinned');
        });
    });
    
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
});