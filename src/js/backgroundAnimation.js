let currentAnimation = null;

function initLottieBackground() {
    // If animation already exists, don't recreate it
    if (currentAnimation) {
        return currentAnimation;
    }

    // Get stored frame from sessionStorage
    const storedFrame = sessionStorage.getItem('lottieFrame');
    
    currentAnimation = lottie.loadAnimation({
        container: document.getElementById('lottie-background'),
        renderer: 'svg',
        loop: true,
        autoplay: false, // Start paused
        path: '/src/assets/BackgroundAnimation.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: true,
            hideOnTransparent: true,
            className: 'lottie-svg'
        }
    });

    // Set animation speed
    currentAnimation.setSpeed(0.5);

    // Once loaded, go to stored frame if it exists
    currentAnimation.addEventListener('DOMLoaded', () => {
        if (storedFrame) {
            currentAnimation.goToAndPlay(parseInt(storedFrame), true);
        } else {
            currentAnimation.play();
        }
    });

    // Store frame periodically
    setInterval(() => {
        if (currentAnimation) {
            sessionStorage.setItem('lottieFrame', currentAnimation.currentFrame);
        }
    }, 1000);

    return currentAnimation;
}

// Export the function to be used by other files
export { initLottieBackground }; 