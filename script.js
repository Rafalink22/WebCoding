document.addEventListener('DOMContentLoaded', () => {

    /* =================================================================
       1. LÓGICA DO MENU DROPDOWN (MOBILE)
       ================================================================= */
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(drop => {
        // Pega o primeiro link dentro do LI (o botão "Conteúdos" ou "Ensino Básico")
        const link = drop.querySelector('a');

        link.addEventListener('click', (e) => {
            // Só ativa essa lógica se for tela de celular/tablet
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Impede que a tela pule para o topo
                
                // Fecha outros menus que estejam abertos para não encavalar
                dropdowns.forEach(otherDrop => {
                    if (otherDrop !== drop) {
                        otherDrop.classList.remove('active');
                    }
                });

                // Abre ou fecha o menu atual
                drop.classList.toggle('active');
            }
        });
    });

    // Fecha o menu se clicar fora dele
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(drop => drop.classList.remove('active'));
        }
    });


    /* =================================================================
       2. LÓGICA DO SLIDER / CARROSSEL
       ================================================================= */
    const track = document.querySelector('.slider-track');
    const cards = Array.from(track.children);
    const nextButton = document.querySelector('.slider-button.next');
    const prevButton = document.querySelector('.slider-button.prev');
    const sliderContainer = document.querySelector('.slider-container');

    let cardWidth = 0;
    let cardsPerView = 0;
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 4000;

    // Variáveis Touch
    let touchStartX = 0;
    let touchEndX = 0;

    const setupSlider = () => {
        // Define quantos cards aparecem por vez
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else {
            cardsPerView = 3;
        }

        // Recalcula largura baseada no primeiro card
        // Importante: removemos margens do cálculo no mobile para evitar erros de soma
        const cardStyle = window.getComputedStyle(cards[0]);
        const cardMargin = parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
        
        cardWidth = cards[0].offsetWidth + cardMargin;

        // Reposiciona para não quebrar o layout ao redimensionar
        moveToSlide(currentIndex);
    };

    const moveToSlide = (targetIndex) => {
        const lastPossibleIndex = cards.length - cardsPerView;

        if (targetIndex < 0) {
            targetIndex = lastPossibleIndex; // Loop para o final
        } else if (targetIndex > lastPossibleIndex) {
            targetIndex = 0; // Loop para o início
        }

        const offset = targetIndex * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
        currentIndex = targetIndex;
    };

    // Autoplay
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Botões
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

    // Touch Events (Mobile)
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

    // Inicialização
    setupSlider();
    startAutoPlay();

    window.addEventListener('resize', () => {
        setupSlider();
    });
});