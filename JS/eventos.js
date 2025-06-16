// === Filtro de Eventos por Mês ou Tipo ===

const filtro = document.getElementById('filtro');
const card = document.querySelectorAll('.evento-card');

filtro.addEventListener('change', () => {
  const valor = filtro.value;

  cards.forEach(card => {
    const titulo = card.querySelector('h3').textContent.toLowerCase();
    if (valor === 'todos' || titulo.includes(valor)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// === Botão “Ver Mais Detalhes” para Cada Evento ===
document.querySelectorAll('.detalhes-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const detalhes = btn.nextElementSibling;
    detalhes.style.display = detalhes.style.display === 'none' ? 'block' : 'none';
    btn.textContent = detalhes.style.display === 'none' ? 'Ver mais' : 'Ver menos';
  });
});

// === Date - destacar o evento mais próximo da data atual ===
const hoje = new Date();
let proximoCard = null;
let menorDiff = Infinity;

document.querySelectorAll('.evento-card').forEach(card => {
  const dataTexto = card.querySelector('.data-evento').textContent;
  const dataMatch = dataTexto.match(/(\d{1,2}) de (\w+)/i);

  if (dataMatch) {
    const dia = parseInt(dataMatch[1]);
    const mesNome = dataMatch[2].toLowerCase();
    const meses = {
      janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
      julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
    };

    const dataEvento = new Date(hoje.getFullYear(), meses[mesNome], dia);
    const diff = dataEvento - hoje;

    if (diff > 0 && diff < menorDiff) {
      menorDiff = diff;
      proximoCard = card;
    }
  }
});

// === Efeito de revelação suave ao rolar a página.
if (proximoCard) {
  proximoCard.style.border = '3px solid #d4af37';
  proximoCard.style.backgroundColor = '#fff8dc';
}

const cards = document.querySelectorAll('.evento-card');

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


// === Automatização Botão
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