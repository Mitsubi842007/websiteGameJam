// HERO CAROUSEL - Automatische slider voor de hero sectie
// =========================================================

// INSTELLINGEN
const SLIDE_INTERVAL = 5000; // Tijd tussen slides in milliseconden (5000ms = 5 seconden)

// VARIABELEN
let currentSlide = 1; // Welke slide is nu actief (start bij 1)
let autoSlideTimer; // Timer voor automatisch wisselen

// ELEMENTEN OPHALEN
const slide1Radio = document.getElementById('slide1');
const slide2Radio = document.getElementById('slide2');
const dots = document.querySelectorAll('.hero-dot');

// FUNCTIE: Ga naar een specifieke slide
function goToSlide(slideNumber) {
    currentSlide = slideNumber;

    // Check de juiste radio button (dit toont de slide via CSS)
    if (slideNumber === 1) {
        slide1Radio.checked = true;
    } else {
        slide2Radio.checked = true;
    }
}

// FUNCTIE: Ga naar de volgende slide
function nextSlide() {
    // Als we bij slide 2 zijn, ga terug naar 1
    // Anders ga naar de volgende slide
    if (currentSlide === 2) {
        currentSlide = 1;
    } else {
        currentSlide++;
    }

    goToSlide(currentSlide);
}

// FUNCTIE: Start automatisch wisselen
function startAutoSlide() {
    // Stop eventuele bestaande timer
    stopAutoSlide();

    // Start nieuwe timer die elke X seconden de volgende slide toont
    autoSlideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
}

// FUNCTIE: Stop automatisch wisselen
function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
    }
}

// EVENT LISTENERS: Dots (handmatige bediening)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Ga naar de geklickte slide (index + 1 want array start bij 0)
        goToSlide(index + 1);

        // Reset de automatische timer
        startAutoSlide();
    });
});

// START DE CAROUSEL
// Wacht tot de pagina volledig geladen is
document.addEventListener('DOMContentLoaded', () => {
    // Start met slide 1
    goToSlide(1);

    // Start automatisch wisselen
    startAutoSlide();
});

// STOP CAROUSEL als gebruiker de pagina verlaat (optioneel, voor performance)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

// WORKSPACE CAROUSEL - Image carousel for workspace section
// ============================================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get workspace carousel elements
    const carouselItems = document.querySelectorAll('.workspace-carousel .carousel-item');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.workspace-carousel .indicator');

    // Check if carousel elements exist
    if (!carouselItems.length) return;

    let currentIndex = 0;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all items and indicators
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current item and indicator
        carouselItems[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        currentIndex = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(prevIndex);
    }

    // Event listener for next button
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Event listener for previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only if carousel is in view
        const carousel = document.querySelector('.workspace-carousel');
        if (!carousel) return;

        const rect = carousel.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });

    // Initialize: show first slide
    showSlide(0);
});
