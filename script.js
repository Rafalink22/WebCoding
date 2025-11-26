document.addEventListener('DOMContentLoaded', () => {

    /* =================================================================
       LÓGICA DO SLIDER / CARROSSEL (APENAS HOME)
       ================================================================= */
    
    // Verificação de Segurança: Só roda se o slider existir na página
    const track = document.querySelector('.slider-track');
    if (!track) return; // Se não achar o slider (ex: página de contato), para o script aqui.

    const cards = Array.from(track.children);
    const nextButton = document.querySelector('.slider-button.next');
    const prevButton = document.querySelector('.slider-button.prev');
    const sliderContainer = document.querySelector('.slider-container');

    let cardWidth = 0;
    let cardsPerView = 0;
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 4000;

    let touchStartX = 0;
    let touchEndX = 0;

    const setupSlider = () => {
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else {
            cardsPerView = 3;
        }

        const cardStyle = window.getComputedStyle(cards[0]);
        const cardMargin = parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
        
        cardWidth = cards[0].offsetWidth + cardMargin;

        moveToSlide(currentIndex);
    };

    const moveToSlide = (targetIndex) => {
        const lastPossibleIndex = cards.length - cardsPerView;

        if (targetIndex < 0) {
            targetIndex = lastPossibleIndex;
        } else if (targetIndex > lastPossibleIndex) {
            targetIndex = 0;
        }

        const offset = targetIndex * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
        currentIndex = targetIndex;
    };

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
        stopAutoPlay();
        startAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
        stopAutoPlay();
        startAutoPlay();
    });

    sliderContainer.addEventListener('touchstart', (e) => {
        stopAutoPlay();
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });

    const handleSwipe = () => {
        const threshold = 40; 
        if (touchStartX - touchEndX > threshold) {
            moveToSlide(currentIndex + 1);
        }
        if (touchEndX - touchStartX > threshold) {
            moveToSlide(currentIndex - 1);
        }
    };

    setupSlider();
    startAutoPlay();

    window.addEventListener('resize', () => {
        setupSlider();
    });
});