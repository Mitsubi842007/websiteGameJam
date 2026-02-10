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

// workspace team images van de spel.
