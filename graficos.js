document.addEventListener('DOMContentLoaded', () => {

    // Objeto para guardar as instâncias dos gráficos da grade
    const graficosDaGrade = {};
    // Variável para guardar a instância do gráfico em destaque
    let graficoEmDestaque = null;

    /* Funções de Criação dos Gráficos
    ------------------------------------------------------------------- */

    function criarGrafico1() {
        const ctx = document.getElementById('grafico1').getContext('2d');
        const config = {
            type: 'bar',
            data: {
                labels: ['Escolas com acesso', 'Escolas sem acesso'],
                datasets: [{
                    label: 'Porcentagem (%)',
                    data: [97.17, 2.83],
                    backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                    borderColor: ['rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Acesso à Internet nas Escolas de Maceió'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        };
        graficosDaGrade[1] = new Chart(ctx, config);
    }

    function criarGrafico2() {
        const ctx = document.getElementById('grafico2').getContext('2d');
        const valoresReais = [36.22, 63.78]; // Dados de exemplo
        const config = {
            type: 'bar',
            data: {
                labels: ['Escolas que oferecem', 'Escolas que não oferecem'],
                datasets: [{
                    label: 'Porcentagem (%)',
                    data: valoresReais,
                    backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                    borderColor: ['rgb(54, 162, 235)', 'rgb(55, 206, 86)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Acesso à Internet para Alunos em Maceió (2024)'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        };
        graficosDaGrade[2] = new Chart(ctx, config);
    }

    function criarGrafico3() {
        const ctx = document.getElementById('grafico3').getContext('2d');
        const numeroDeEscolas = [301, 3, 104, 158];
        const config = {
            type: 'bar',
            data: {
                labels: ['Privadas', 'Federais', 'Estaduais', 'Municipais'],
                datasets: [{
                    label: 'Total de Alunos Matriculados',
                    data: [77410, 2352, 57098, 58721],
                    escolas: numeroDeEscolas,
                    backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(201, 203, 207, 0.8)'],
                    borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Alunos Matriculados por Rede de Ensino (2024)'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            footer: function(tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                const escolas = tooltipItems[0].dataset.escolas[index];
                                return `Nº de Escolas: ${escolas}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100000
                    }
                }
            }
        };
        graficosDaGrade[3] = new Chart(ctx, config);
    }

    function criarGrafico4() {
        const ctx = document.getElementById('grafico4').getContext('2d');
        const dadosTotal = [3773, 64, 718, 404];
        const dadosDesktop = [2030, 51, 600, 353];
        const dadosNotebook = [1743, 13, 118, 51];
        const numeroDeEscolas = [301, 3, 104, 158];

        const config = {
            type: 'bar',
            data: {
                labels: ['Privadas', 'Federais', 'Estaduais', 'Municipais'],
                datasets: [{
                    label: 'Total de Computadores',
                    data: dadosTotal,
                    escolas: numeroDeEscolas,
                    dados_total: dadosTotal,
                    dados_desktop: dadosDesktop,
                    dados_notebook: dadosNotebook,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Computadores por Rede de Ensino (2024)'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            footer: (tooltipItems) => `Nº de Escolas: ${tooltipItems[0].dataset.escolas[tooltipItems[0].dataIndex]}`
                        }
                    }
                }
            }
        };
        graficosDaGrade[4] = new Chart(ctx, config);
    }


    /* Lógica de Interatividade (Clique e Destaque)
    ------------------------------------------------------------------- */

    const todosOsGraficos = document.querySelectorAll('.item-grafico');

    todosOsGraficos.forEach(item => {
        item.addEventListener('click', () => {
            const graficoId = item.dataset.graficoId;
            if (!graficosDaGrade[graficoId]) {
                console.log(`Gráfico ${graficoId} ainda não foi definido.`);
                return;
            }

            // Seleciona os elementos da área de destaque
            const areaDestaque = document.getElementById('area-destaque');
            const canvasDestaque = document.getElementById('grafico-em-destaque');
            const filtroDestaqueContainer = document.getElementById('filtro-destaque-container');
            const descricaoDestaqueContainer = document.getElementById('descricao-destaque-container');
            const descricaoOcultaContainer = item.querySelector('.descricao-oculta');
            
            // Pega a configuração do gráfico clicado e destrói o gráfico anterior em destaque
            const configOriginal = graficosDaGrade[graficoId].config;
            if (graficoEmDestaque) {
                graficoEmDestaque.destroy();
            }

            // Copia todo o conteúdo da descrição (título, texto, fonte) de uma só vez
            descricaoDestaqueContainer.innerHTML = descricaoOcultaContainer.innerHTML;
            
            // Cria o novo gráfico em destaque
            graficoEmDestaque = new Chart(canvasDestaque.getContext('2d'), configOriginal);

            // Verifica se o gráfico clicado possui filtros
            const filtroOculto = item.querySelector('.filtro-oculto');
            if (filtroOculto) {
                // Se sim, copia os botões para a área de destaque e a exibe
                filtroDestaqueContainer.innerHTML = filtroOculto.innerHTML;
                filtroDestaqueContainer.style.display = 'flex';

                // Adiciona a funcionalidade aos botões que acabaram de ser criados
                const botoesFiltro = filtroDestaqueContainer.querySelectorAll('.filtro-btn');
                botoesFiltro.forEach(botao => {
                    botao.addEventListener('click', () => {
                        botoesFiltro.forEach(btn => btn.classList.remove('active'));
                        botao.classList.add('active');
                        
                        const filtro = botao.dataset.filtro;
                        const dataset = graficoEmDestaque.config.data.datasets[0];
                        
                        let novosDados, novoLabel;
                        if (filtro === 'desktop') {
                            novosDados = dataset.dados_desktop;
                            novoLabel = 'Total de Desktops';
                        } else if (filtro === 'notebook') {
                            novosDados = dataset.dados_notebook;
                            novoLabel = 'Total de Notebooks';
                        } else {
                            novosDados = dataset.dados_total;
                            novoLabel = 'Total de Computadores';
                        }
                        
                        graficoEmDestaque.data.datasets[0].data = novosDados;
                        graficoEmDestaque.data.datasets[0].label = novoLabel;
                        graficoEmDestaque.update();
                    });
                });
            } else {
                // Se não, limpa e esconde a área de filtros
                filtroDestaqueContainer.innerHTML = '';
                filtroDestaqueContainer.style.display = 'none';
            }

            // Exibe a área de destaque e rola a tela até ela
            areaDestaque.style.display = 'flex';
            areaDestaque.scrollIntoView({ behavior: 'smooth' });
        });
    });
    function criarGrafico5() {
        const ctx = document.getElementById('grafico5').getContext('2d');
        const numeroDeEscolas = [301, 3, 104, 158]; // Mantemos este dado para o tooltip

        const config = {
            type: 'bar',
            data: {
                labels: ['Privadas', 'Federais', 'Estaduais', 'Municipais'],
                datasets: [{
                    label: 'Média de Computadores por Escola',
                    data: [12.5, 21.3, 6.9, 2.5],
                    escolas: numeroDeEscolas, // Passando o n° de escolas para o tooltip
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(201, 203, 207, 0.8)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { 
                        display: true, 
                        text: 'Média de Computadores por Escola (2024)' 
                    },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            // O tooltip mostrará a média e o n° total de escolas da rede
                            footer: function(tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                const escolas = tooltipItems[0].dataset.escolas[index];
                                return `Total de Escolas na Rede: ${escolas}`;
                            }
                        }
                    }
                }
            }
        };
        graficosDaGrade[5] = new Chart(ctx, config);
    }   

    function criarGrafico6() {
        const ctx = document.getElementById('grafico6').getContext('2d');
        const numeroDeEscolas = [301, 3, 104, 158]; // Dado para o tooltip

        const config = {
            type: 'bar',
            data: {
                labels: ['Privadas', 'Federais', 'Estaduais', 'Municipais'],
                datasets: [{
                    label: '% de Escolas com Acesso para Alunos',
                    data: [39.87, 66.67, 54.81, 16.46],
                    escolas: numeroDeEscolas,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(54, 162, 235, 0.8)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(153, 102, 255)',
                        'rgb(54, 162, 235)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { 
                        display: true, 
                        text: 'Escolas com Internet para Alunos por Rede (%)' 
                    },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            footer: function(tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                const escolas = tooltipItems[0].dataset.escolas[index];
                                return `Total de Escolas na Rede: ${escolas}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        };
        graficosDaGrade[6] = new Chart(ctx, config);
    }

// Chamando as funções, para criar os gráficos
    criarGrafico1();
    criarGrafico2();
    criarGrafico3();
    criarGrafico4();
    criarGrafico5();
    criarGrafico6();
});