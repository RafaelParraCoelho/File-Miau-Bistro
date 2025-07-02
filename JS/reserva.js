// Reserva.js - Script para gerenciar reservas de restaurante
document.addEventListener('DOMContentLoaded', function() {
  const formReserva = document.getElementById('formReserva');
  const reservaConfirmacao = document.getElementById('reservaConfirmacao');
  const confirmacaoTexto = document.getElementById('confirmacaoTexto');
  const btnNovaReserva = document.getElementById('btnNovaReserva');
  
  // Configuração inicial do campo de data
  const dataInput = document.getElementById('data');
  const hoje = new Date();
  const amanha = new Date();
  amanha.setDate(hoje.getDate() + 1);
  
  // Formatar data para YYYY-MM-DD (formato do input date)
  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
  };
  
  // Definir data mínima como amanhã (não aceitamos reservas para o mesmo dia)
  dataInput.min = formatarData(amanha);
  dataInput.value = formatarData(amanha);
  
  // Máscara para telefone
  const telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    }
    if (value.length > 10) {
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    } else if (value.length > 9) {
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    e.target.value = value.substring(0, 15);
  });
  
  // Envio do formulário
  if (formReserva) {
    formReserva.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simular envio (em um caso real, seria uma requisição AJAX)
      setTimeout(() => {
        const formData = new FormData(formReserva);
        const dataReserva = new Date(formData.get('data'));
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const dataFormatada = dataReserva.toLocaleDateString('pt-BR', options);
        
        confirmacaoTexto.innerHTML = `
          Obrigado, ${formData.get('nome')}!<br><br>
          Sua reserva para <strong>${formData.get('pessoas')} ${formData.get('pessoas') === '1' ? 'pessoa' : 'pessoas'}</strong> 
          na <strong>${formData.get('hora')}</strong> do dia <strong>${dataFormatada}</strong> foi confirmada.<br><br>
          Enviamos os detalhes para <strong>${formData.get('email')}</strong> e ligaremos para <strong>${formData.get('telefone')}</strong> 
          para confirmação um dia antes.
        `;
        
        formReserva.style.display = 'none';
        reservaConfirmacao.style.display = 'block';
        
        // Rolagem suave para a confirmação
        reservaConfirmacao.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    });
  }
  
  // Botão para nova reserva
  if (btnNovaReserva) {
    btnNovaReserva.addEventListener('click', function() {
      reservaConfirmacao.style.display = 'none';
      formReserva.style.display = 'block';
      formReserva.reset();
      
      // Resetar data para amanhã
      const novaData = new Date();
      novaData.setDate(novaData.getDate() + 1);
      dataInput.value = formatarData(novaData);
      
      // Rolagem suave para o formulário
      formReserva.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Validação em tempo real
  const camposObrigatorios = document.querySelectorAll('[required]');
  camposObrigatorios.forEach(campo => {
    campo.addEventListener('blur', function() {
      if (!this.value.trim()) {
        this.classList.add('campo-invalido');
      } else {
        this.classList.remove('campo-invalido');
      }
    });
  });
});