// === Filtro de Eventos por Mês ou Tipo ===
document.addEventListener("DOMContentLoaded", () => {
  const filtro = document.getElementById("filtro");
  const eventos = document.querySelectorAll(".evento-card");

  // === FILTRO POR TIPO ===
  filtro.addEventListener("change", () => {
    const tipoSelecionado = filtro.value;
    eventos.forEach(evento => {
      const tipoEvento = evento.dataset.tipo;
      evento.style.display = (tipoSelecionado === "todos" || tipoEvento === tipoSelecionado)
        ? "block"
        : "none";
    });
  });

  // === BOTÕES "VER MAIS" ===
  document.querySelectorAll(".detalhes-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const detalhes = btn.previousElementSibling;
      const visivel = detalhes.classList.contains("show");

      // Alternar classe 'show' nos detalhes
      detalhes.classList.toggle("show");

      // Alternar classe 'active' no botão
      btn.classList.toggle("active");

      // Mudar texto do botão
      btn.textContent = visivel ? "Ver mais" : "Ver menos";

      // Adicionar/remover ícone
      btn.setAttribute("aria-expanded", !visivel);
    });
  });

  // DESTACAR O EVENTO MAIS PRÓXIMO 
  const hoje = new Date();
  let menorDiff = Infinity;
  let proximoEvento = null;

  eventos.forEach(evento => {
    const dataTexto = evento.querySelector(".data-evento").textContent;
    const match = dataTexto.match(/(\d{1,2}) de (\w+)/i);
    if (match) {
      const dia = parseInt(match[1]);
      const mesNome = match[2].toLowerCase();
      const meses = {
        janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
        julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
      };
      const data = new Date(hoje.getFullYear(), meses[mesNome], dia);
      const diff = data - hoje;

      if (diff > 0 && diff < menorDiff) {
        menorDiff = diff;
        proximoEvento = evento;
      }
    }
  });

  if (proximoEvento) {
    proximoEvento.style.border = "3px solid #d4af37";
    proximoEvento.style.backgroundColor = "#fff8dc";
  }
});


// Efeito de destaque para o evento mais próximo
if (proximoCard) {
  proximoCard.style.border = '3px solid #d4af37';
  proximoCard.style.backgroundColor = '#fff8dc';
}

// === Efeito de Revelação Suave ao Rolar a Página ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(50px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

// === Automatização do Botão de Reserva via WhatsApp ===
document.querySelectorAll('.evento-card').forEach(card => {
  const titulo = card.querySelector('h3').textContent.trim();
  const link = document.createElement('a');
  const msg = encodeURIComponent(`Olá, gostaria de reservar para ${titulo} no Filé Miau Bistrô`);
  link.href = `https://wa.me/5511999999999?text=${msg}`;
  link.target = '_blank';
  link.className = 'btn-reserva-evento';
  link.textContent = 'Reservar vaga via WhatsApp';
  card.appendChild(link);
});

// === Sistema de Comentários e Avaliações ===
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-comentario');
  const listaComentarios = document.querySelector('.lista-comentarios');
  const estrelasFrente = document.querySelector('.estrelas-frente');
  const ratingInput = document.getElementById('rating');

  // Sistema de avaliação por estrelas
  ratingInput.addEventListener('input', () => {
    const rating = ratingInput.value;
    const width = `${rating * 20}%`;
    estrelasFrente.style.width = width;
  });

  // Carregar comentários salvos
  function carregarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios_filémiau')) || [];
    listaComentarios.innerHTML = '';
    
    comentarios.forEach(comentario => {
      const estrelas = '★'.repeat(comentario.avaliacao) + '☆'.repeat(5 - comentario.avaliacao);
      const dataFormatada = new Date(comentario.data).toLocaleDateString('pt-BR');
      
      listaComentarios.innerHTML += `
        <div class="comentario">
          <div class="comentario-cabecalho">
            <span class="comentario-autor">${comentario.nome}</span>
            <span class="comentario-evento">${comentario.evento}</span>
          </div>
          <div class="comentario-avaliacao">${estrelas}</div>
          <p class="comentario-texto">${comentario.texto}</p>
          <div class="comentario-data">${dataFormatada}</div>
        </div>
      `;
    });
  }

  // Enviar novo comentário
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const novoComentario = {
      nome: document.getElementById('nome').value,
      evento: document.getElementById('evento').value,
      texto: document.getElementById('comentario').value,
      avaliacao: parseInt(ratingInput.value),
      data: new Date().toISOString()
    };
    
    // Salvar no localStorage
    const comentarios = JSON.parse(localStorage.getItem('comentarios_filémiau')) || [];
    comentarios.unshift(novoComentario); // Adiciona no início
    localStorage.setItem('comentarios_filémiau', JSON.stringify(comentarios));
    
    // Recarregar e limpar formulário
    carregarComentarios();
    form.reset();
    ratingInput.value = 5;
    estrelasFrente.style.width = '100%';
    
    // Feedback visual
    const btn = document.querySelector('.btn-enviar');
    btn.textContent = 'Obrigado! 😻';
    setTimeout(() => {
      btn.textContent = 'Enviar Comentário 🐱';
    }, 2000);
  });

  // Carregar comentários ao abrir a página
  carregarComentarios();
});