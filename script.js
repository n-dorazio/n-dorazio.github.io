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
});