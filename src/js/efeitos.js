// ===== Efeitos interativos X-Men =====
// Não mexe no index.js original — só escuta os cliques em paralelo.
(function () {
  const efeitos = {
    'ciclope':     { tipo: 'laser', cor: '#ff5252' }, // rajada óptica
    'jean-grey':   { tipo: 'psy',   cor: '#e56dff' }, // telepatia/telecinese
    'lince-negra': { tipo: 'psy',   cor: '#c968ff' }, // sentidos/garras
    'magneto':     { tipo: 'ring',  cor: '#cfd8dc' }, // magnetismo
    'noturno':     { tipo: 'smoke', cor: '#8c50c8' }, // teleporte
    'tempestade':  { tipo: 'bolt',  cor: '#7fd8ff' }, // clima/raios
    'vampira':     { tipo: 'spark', cor: '#39ff88' }, // absorção de energia
    'wolverine':   { tipo: 'claw',  cor: '#ffca28' }  // garras
  };

  // Camada onde as partículas nascem, fixa na tela
  const layer = document.createElement('div');
  layer.className = 'fx-layer';
  document.body.appendChild(layer);

  function criarParticula(tipo, x, y) {
    const p = document.createElement('div');
    let classe = 'fx-particle ';
    const dx = (Math.random() * 160 - 80) + 'px';
    const dy = (Math.random() * 160 - 80) + 'px';
    const rot = (Math.random() * 60 - 30) + 'deg';

    switch (tipo) {
      case 'bolt':  classe += 'fx-bolt';  p.style.height = (30 + Math.random() * 30) + 'px'; break;
      case 'spark': classe += 'fx-spark'; break;
      case 'laser': classe += 'fx-laser'; break;
      case 'psy':   classe += 'fx-psy';   break;
      case 'ring':  classe += 'fx-ring';  break;
      case 'smoke': classe += 'fx-smoke'; break;
      case 'claw':  classe += 'fx-claw';  break;
    }

    p.className = classe;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.setProperty('--dx', dx);
    p.style.setProperty('--dy', dy);
    p.style.setProperty('--rot', rot);
    layer.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }

  function explodir(tipo, x, y) {
    const qtd = tipo === 'ring' ? 3 : tipo === 'laser' ? 4 : tipo === 'smoke' ? 5 : 8;
    for (let i = 0; i < qtd; i++) {
      setTimeout(() => criarParticula(tipo, x, y), i * 40);
    }
  }

  const secaoSelecionado = document.querySelector('.personagem-selecionado');

  document.querySelectorAll('.personagem').forEach(li => {
    li.addEventListener('click', () => {
      const efeito = efeitos[li.id];
      if (!efeito) return;

      const rect = li.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Explosão no card clicado
      explodir(efeito.tipo, x, y);

      // Contorno "elétrico" ao redor do card (raios ao redor)
      li.style.setProperty('--fx-color', efeito.cor);
      li.classList.remove('fx-active');
      void li.offsetWidth; // força reinício da animação CSS
      li.classList.add('fx-active');

      // Aura contínua ao redor da seção do personagem grande
      if (secaoSelecionado) {
        secaoSelecionado.style.setProperty('--fx-color', efeito.cor);
        secaoSelecionado.classList.add('fx-glow');
      }

      // Explosão extra em cima da imagem grande (efeito de impacto)
      setTimeout(() => {
        const imgGrande = document.querySelector('.personagem-grande');
        if (imgGrande) {
          const r = imgGrande.getBoundingClientRect();
          explodir(efeito.tipo, r.left + r.width / 2, r.top + 30);
        }
      }, 120);
    });
  });
})();
