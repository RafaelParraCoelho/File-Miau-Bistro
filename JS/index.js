// ===== Menu Mobile =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('change', function () {
    if (this.checked) {
      nav.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      nav.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}

// ===== Efeito Smooth Scroll para âncoras =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Tocar Áudio Blues =====
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("blues-audio");

    // Tenta tocar o áudio automaticamente
    audio.volume = 0.5; // volume moderado
    audio.play().catch(() => {
      // Se o navegador bloquear, ativa ao clicar no corpo
      document.body.addEventListener("click", () => {
        audio.play();
      }, { once: true });
    });
  });
  
// ===== Animação dos Cards =====
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    if (email.includes('@') && email.includes('.')) {
      alert('Obrigado por assinar nossa newsletter!');
      this.reset();
    } else {
      alert('Por favor, insira um e-mail válido.');
    }
  });
}


// ===== Conteúdo dinâmico de eventos =====
if (!document.querySelector('.eventos-bistro')) {
  const eventos = [
    "Noite da Trufa Negra – 20 de Junho",
    "Jantar com Jazz ao Vivo – Sábado, 22h",
    "Festival de Fondue – todo mês de Julho",
    "Degustação de Vinhos com Sommelier – 5 de Julho"
  ];

  const containerEventos = document.createElement('section');
  containerEventos.className = 'eventos-bistro';

  let htmlEventos = '<h3>Eventos do Bistrô</h3><ul>';
  eventos.forEach(ev => {
    htmlEventos += `<li>${ev}</li>`;
  });
  htmlEventos += '</ul>';

  containerEventos.innerHTML = htmlEventos;

  const footer = document.querySelector('footer');
  if (footer && footer.parentNode) {
    footer.parentNode.insertBefore(containerEventos, footer);
  }
}