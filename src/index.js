const personagens = document.querySelectorAll('.personagem');
const personagemGrande = document.querySelector('.personagem-grande');
const nomePersonagem = document.getElementById('nome-personagem');
const descricaoPersonagem = document.getElementById('descricao-personagem');
const secaoPersonagemSelecionado = document.querySelector('.personagem-selecionado');

personagens.forEach(personagem => {
    personagem.addEventListener('click', () => {
        // Remove a classe 'selecionado' do personagem previamente selecionado
        const personagemSelecionadoAnterior = document.querySelector('.selecionado');
        if (personagemSelecionadoAnterior) {
            personagemSelecionadoAnterior.classList.remove('selecionado');
        }

        // Adiciona a classe 'selecionado' ao personagem clicado
        personagem.classList.add('selecionado');

        const id = personagem.id;
        const imagemSrc = `src/imagens/card-${id}.png`;
        const nome = id.replace(/-/g, ' ').replace(/^(.)|\s(.)/g, c => c.toUpperCase());

        // Descrições (considere usar JSON para melhor gerência)
        let descricao = '';
        switch (id) {
            case 'ciclope': descricao = 'Ele tem o poder de disparar rajadas ópticas por um acidente que aconteceu com ele quando criança, mas não consegue controlá-las.'; break;
            case 'jean-grey': descricao = 'Jean Grey é uma mutante com poderes telepáticos e telecinéticos extremamente poderosos.'; break;
            case 'lince-negra': descricao = 'Lince Negra possui sentidos aguçados e garras retráteis.'; break;
            case 'magneto': descricao = 'Magneto pode manipular campos magnéticos com sua mente.'; break;
            case 'noturno': descricao = 'Noturno possui a habilidade de teletransportar-se.'; break;
            case 'tempestade': descricao = 'Tempestade pode controlar o clima.'; break;
            case 'vampira': descricao = 'Vampira pode absorver os poderes e memórias de outras pessoas através do contato físico.'; break;
            case 'wolverine': descricao = 'Wolverine possui garras de adamantium e um fator de cura acelerado.'; break;
            default: descricao = 'Descrição indisponível.';
        }

        personagemGrande.src = imagemSrc;
        nomePersonagem.textContent = nome;
        descricaoPersonagem.textContent = descricao;

        // Obtém a cor de fundo do elemento LI do personagem selecionado
        const backgroundColor = window.getComputedStyle(personagem).backgroundColor;
        if(backgroundColor !== 'rgba(0, 0, 0, 0)') { // Verifica se a cor é transparente
          secaoPersonagemSelecionado.style.backgroundColor = backgroundColor;
        } else {
          console.warn(`Cor de fundo transparente para ${id}. Defina uma cor no CSS.`);
          secaoPersonagemSelecionado.style.backgroundColor = '#000'; // Cor padrão se transparente
        }
    });
});

document.getElementById('ciclope').click(); // Seleciona o Ciclope inicialmente