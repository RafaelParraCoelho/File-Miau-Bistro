const toggleBtn = document.getElementById('toggleCasal');
let modoCasalAtivo = false;

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const precos = document.querySelectorAll('.price');

    precos.forEach(el => {
      const original = parseFloat(el.dataset.preco);
      if (!isNaN(original)) {
        const valor = modoCasalAtivo ? original : original * 2;
        el.textContent = `R$ ${valor.toFixed(2).replace('.', ',')}`;
      }
    });

    modoCasalAtivo = !modoCasalAtivo;
    toggleBtn.textContent = modoCasalAtivo
      ? 'Voltar ao Modo Individual'
      : '👫 Ativar Modo Casal';
  });
}

// ===== Sugestões do Chef =====
const pratos = [
  {
    nome: 'Picanha "Purr-fect"',
    descricao: 'Corte nobre argentino, maturado por 21 dias, acompanha purê de aipim trufado.',
    preco: 129.90
  },
  {
    nome: 'Risoto Maine Coon',
    descricao: 'Cremoso risoto de funghi secchi com toque de limão siciliano.',
    preco: 89.90
  },
  {
    nome: 'Filé "Miaulado"',
    descricao: 'Filé mignon envolto em bacon, com redução de vinho tinto e batatas rústicas.',
    preco: 112.90
  },
  {
    nome: 'Crème Brûlée Felina',
    descricao: 'Clássico francês com baunilha do Madagascar e crosta de caramelo crocante.',
    preco: 32.90
  },
  {
    nome: 'Caipirinha "Gatônica"',
    descricao: 'Clássica com cachaça envelhecida, lima e twist de gengibre.',
    preco: 29.90
  }
];

function gerarSugestao() {
  const prato = pratos[Math.floor(Math.random() * pratos.length)];
  const nome = document.getElementById('chef-nome');
  const desc = document.getElementById('chef-descricao');
  const preco = document.getElementById('chef-preco');

  if (nome && desc && preco) {
    nome.textContent = prato.nome;
    desc.textContent = prato.descricao;
    preco.textContent = `R$ ${prato.preco.toFixed(2).replace('.', ',')}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  gerarSugestao();
  const botao = document.getElementById('nova-sugestao');
  if (botao) {
    botao.addEventListener('click', gerarSugestao);
  }
});
