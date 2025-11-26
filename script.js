document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.slider-track');
    const cards = Array.from(track.children);
    const nextButton = document.querySelector('.slider-button.next');
    const prevButton = document.querySelector('.slider-button.prev');

    // Variáveis de Estado
    let cardWidth = 0;
    let cardsPerView = 0;
    let currentIndex = 0;
    let autoPlayInterval; // Variável para guardar o ID do intervalo de tempo
    const autoPlayDelay = 4000; // Tempo em milissegundos (4 segundos)

    // Variáveis para o Touch
    let touchStartX = 0;
    let touchEndX = 0;

    // --- FUNÇÕES PRINCIPAIS ---

    // Configura ou reconfigura o slider (responsividade)
    const setupSlider = () => {
        // Define quantos cards aparecem por vez baseado na largura da tela
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else {
            cardsPerView = 3;
        }

        // Recalcula a largura do card + margens
        const cardStyle = window.getComputedStyle(cards[0]);
        const cardMargin = parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
        
        // offsetWidth pega a largura atual do elemento (incluindo padding/border)
        cardWidth = cards[0].offsetWidth + cardMargin;

        // Reposiciona o slider corretamente caso a tela seja redimensionada
        moveToSlide(currentIndex);
    };

    // Move o trilho para o índice desejado
    const moveToSlide = (targetIndex) => {
        const lastPossibleIndex = cards.length - cardsPerView;

        // Lógica de Limites
        if (targetIndex < 0) {
            targetIndex = 0;
        } else if (targetIndex > lastPossibleIndex) {
            targetIndex = lastPossibleIndex;
        }

        const offset = targetIndex * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
        currentIndex = targetIndex;
        
        updateButtons();
    };

    // Atualiza a visibilidade dos botões
    const updateButtons = () => {
        const lastPossibleIndex = cards.length - cardsPerView;
        
        // Esconde botão "Anterior" se estiver no início
        prevButton.classList.toggle('hidden', currentIndex === 0);
        // Esconde botão "Próximo" se estiver no fim
        nextButton.classList.toggle('hidden', currentIndex >= lastPossibleIndex);
    };

    // --- LÓGICA DE AUTOPLAY ---

    const startAutoPlay = () => {
        // Evita múltiplos intervalos rodando ao mesmo tempo
        stopAutoPlay(); 
        
        autoPlayInterval = setInterval(() => {
            const lastPossibleIndex = cards.length - cardsPerView;
            
            if (currentIndex >= lastPossibleIndex) {
                // Se chegou no fim, volta para o primeiro (loop infinito)
                moveToSlide(0);
            } else {
                // Se não, vai para o próximo
                moveToSlide(currentIndex + 1);
            }
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // --- LÓGICA DE TOUCH (SWIPE) ---

    // Salva onde o toque começou
    track.addEventListener('touchstart', (e) => {
        stopAutoPlay(); // Para a animação enquanto o usuário toca
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    // Salva onde o toque terminou e calcula a direção
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay(); // Reinicia a animação
    }, { passive: true });

    const handleSwipe = () => {
        const threshold = 50; // Mínimo de pixels para considerar um swipe (evita toques acidentais)
        
        // Swipe para a Esquerda (Próximo)
        if (touchStartX - touchEndX > threshold) {
            moveToSlide(currentIndex + 1);
        }
        
        // Swipe para a Direita (Anterior)
        if (touchEndX - touchStartX > threshold) {
            moveToSlide(currentIndex - 1);
        }
    };

    // --- EVENT LISTENERS (INTERAÇÃO) ---

    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
        stopAutoPlay(); // Reseta o timer ao clicar manualmente
        startAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
        stopAutoPlay();
        startAutoPlay();
    });

    // Pausa o autoplay quando o mouse está em cima do slider (Boa prática de UX)
    track.parentElement.addEventListener('mouseenter', stopAutoPlay);
    
    // Retoma o autoplay quando o mouse sai
    track.parentElement.addEventListener('mouseleave', startAutoPlay);

    // --- INICIALIZAÇÃO ---
    
    setupSlider();
    startAutoPlay(); // Inicia o carrossel automático

    window.addEventListener('resize', () => {
        setupSlider();
        // Não precisamos reiniciar o autoplay aqui, ele continua rodando
    });
});