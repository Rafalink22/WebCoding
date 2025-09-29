document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.slider-track');
    const cards = Array.from(track.children);
    const nextButton = document.querySelector('.slider-button.next');
    const prevButton = document.querySelector('.slider-button.prev');

    let cardWidth = 0;
    let cardsPerView = 0;
    let currentIndex = 0;

    // Função principal que configura ou reconfigura o slider
    const setupSlider = () => {
        // Verifica a largura da janela para definir as variáveis
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else {
            cardsPerView = 3;
        }

        // Recalcula a largura do card (incluindo margens) dinamicamente
        // offsetWidth pega a largura atual do elemento na tela
        const cardMargin = parseInt(window.getComputedStyle(cards[0]).marginLeft) + parseInt(window.getComputedStyle(cards[0]).marginRight);
        cardWidth = cards[0].offsetWidth + cardMargin;

        // Reposiciona o slider para o índice atual (útil ao redimensionar)
        moveToSlide(currentIndex);
    };

    // Função para mover o trilho
    const moveToSlide = (targetIndex) => {
        const lastPossibleIndex = cards.length - cardsPerView;

        // Garante que o índice não seja menor que 0 ou maior que o último possível
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

    // Função para mostrar/esconder botões
    const updateButtons = () => {
        prevButton.classList.toggle('hidden', currentIndex === 0);

        const lastPossibleIndex = cards.length - cardsPerView;
        nextButton.classList.toggle('hidden', currentIndex >= lastPossibleIndex);
    };

    // Event listeners para os botões de navegação
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    
    // --- LÓGICA DE RESPONSIVIDADE ---
    // Configura o slider quando a página carrega
    setupSlider();

    // Reconfigura o slider toda vez que a janela do navegador muda de tamanho
    window.addEventListener('resize', setupSlider);
});
