// ========================================================
// 1. GERAÇÃO DO HTML (CABEÇALHO E RODAPÉ)
// ========================================================

function carregarHeader() {
    const headerHTML = `
        <nav class="nav1">
            <ul class="ul-nav">
                <li class="navs li1"><a href="index.html">Início</a></li>
                
                <li class="navs li2 dropdown">
                    <a href="#">Conteúdos</a>
                    <div class="dropdown-content">
                        <ul class="dropdown-column">
                            <li><a href="programacao.html">Programação</a></li>
                            <li><a href="redes-sociais.html">Redes Sociais</a></li>
                            <li><a href="design.html">Design</a></li>
                        </ul>
                        <ul class="dropdown-column">
                            <li><a href="e-commerce.html">E-Commerce</a></li>
                            <li><a href="direito.html">Direito</a></li>
                        </ul>
                    </div>
                </li>

                <li class="navs li4 dropdown">
                    <a href="#">Ensino Básico</a>
                    <div class="dropdown-content">
                        <ul class="dropdown-column">
                            <li><a href="analise.html">Análise e Discussão</a></li>
                            <li><a href="graficos.html">Gráficos</a></li>
                        </ul>
                    </div>
                </li>
                
                <li class="navs li3"><a href="criadores.html">Quem somos</a></li>
            </ul>
        </nav>
    `;

    document.querySelector('header').innerHTML = headerHTML;
    
    destacarLinkAtual();
    iniciarLogicaMenu();
}

function carregarFooter() {
    const footerHTML = `
        <div class="footer-content">
            <div class="footer-column">
                <h4>Sobre o Projeto</h4>
                <p>
                    Desenvolvido por: Bruno Rafael, Victor Hugo, Gabriella Maria, Emily Graziele, Chayenne Laiza e Janiele Alessandra.
                </p>
                <p class="academic-context">
                    Projeto acadêmico para a disciplina de Web Coding da Turma do 2° Périodo da UNINASSAU - Maceió, Englobado na oficina de Atividades Interdisciplinares Extensivas.
                </p>
            </div>

            <div class="footer-column">
                <h4>Navegação</h4>
                <div class="footer-nav-container">
                    <ul class="footer-nav-column">
                        <li><a href="index.html">Início</a></li>
                        <li><a href="criadores.html">Criadores</a></li>
                    </ul>
                    <ul class="footer-nav-column">
                        <li><a href="programacao.html">Programação</a></li>
                        <li><a href="redes-sociais.html">Redes Sociais</a></li>
                        <li><a href="design.html">Design</a></li>
                        <li><a href="e-commerce.html">E-Commerce</a></li>
                        <li><a href="direito.html">Direito</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer-bottom-bar">
            <p>© 2025 Guia de Tutoriais para Área Tecnológica | Todos os direitos reservados.</p>
        </div>
    `;

    document.querySelector('.site-footer').innerHTML = footerHTML;
}

function destacarLinkAtual() {
    const paginaAtual = window.location.pathname.split("/").pop() || 'index.html';
    const links = document.querySelectorAll('header nav a');
    
    links.forEach(link => {
        if (link.getAttribute('href').includes(paginaAtual) && paginaAtual !== '') {
            link.style.color = '#2F4550';
            link.style.fontWeight = '800';
            link.style.backgroundColor = '#f4f4f97c';
        }
    });
}

// ========================================================
// 2. LÓGICA DO MENU (ABRIR/FECHAR NO MOBILE)
// ========================================================

function iniciarLogicaMenu() {
    
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Só ativa a lógica se for tela de celular/tablet (<= 768px)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Impede o link de recarregar a página
                e.stopPropagation(); // Impede que o clique conte como "clique fora"
                
                const parentDropdown = link.parentElement;

                // Fecha outros menus que possam estar abertos
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== parentDropdown) d.classList.remove('active');
                });

                // Abre ou fecha o menu atual
                parentDropdown.classList.toggle('active');
            }
        });
    });

    // Detecta clique em qualquer lugar da tela
    document.addEventListener('click', (e) => {
        // Se o clique NÃO foi dentro de um dropdown, fecha tudo
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }
    });
}

// Inicializa
carregarHeader();
carregarFooter();