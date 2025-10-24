// Estructura de datos para almacenar los valores
const formData = {};
let dialog;

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el dialog
  dialog = new mdc.dialog.MDCDialog(document.getElementById('data-dialog'));
  
  // Escuchar evento de cierre del dialog
  dialog.listen('MDCDialog:closed', (event) => {
    if (event.detail.action === 'confirm') {
      // Si se confirma, pasar a la siguiente sección
      pasarASiguienteSeccion();
    }
    // Si es 'cancel', no hace nada (solamente cierra el dialog)
  });
  
  // Capturar todos los inputs de texto y email
  const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      formData[e.target.id] = e.target.value;
    });
  });
  
  // Capturar radio buttons del certificado digital
  const radios = document.querySelectorAll('input[name="certificado"]');
  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      formData['certificado-digital'] = e.target.value === 'si' ? 'Sí' : 'No';
    });
  });
  
  // Manejar click en botones ENVIAR
  const buttons = document.querySelectorAll('.button-enviar');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Validar campos según la sección activa
      const seccionActiva = document.querySelector('.form-section.active');
      
      if (seccionActiva.id === 'section-datos-empresa') {
        if (!validarCamposObligatorios()) {
          return; // No mostrar el dialog si la validación falla
        }
      }
      
      if (seccionActiva.id === 'section-representante-legal') {
        if (!validarEmail()) {
          return; // No mostrar el dialog si el email es inválido
        }
      }
      
      mostrarDialog();
    });
  });
});

function validarCamposObligatorios() {
  const rutEmpresa = formData['rut-empresa'] || '';
  const razonSocial = formData['razon-social'] || '';
  
  if (!rutEmpresa.trim() || !razonSocial.trim()) {
    alert('Por favor, complete los campos obligatorios: RUT de la empresa y Razón social');
    return false;
  }
  
  return true;
}

function validarEmail() {
  const email = formData['email-representante'] || '';
  
  // Si el campo está vacío, permitir continuar (porque es un campo opcional)
  if (!email.trim()) {
    return true;
  }
  
  // Expresión regular para validar email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!regexEmail.test(email)) {
    alert('Por favor, ingrese un email válido');
    return false;
  }
  
  return true;
}

function mostrarDialog() {
  // Actualizar contenido del dialog
  const content = document.getElementById('dialog-content');
  let html = '';
  
  // Mapeo de nombres para los campos
  const nombresMapeados = {
    'rut-empresa': 'RUT de la empresa',
    'razon-social': 'Razón social',
    'direccion-empresa': 'Dirección de la empresa',
    'comuna': 'Comuna',
    'actividad-economica': 'Actividad económica',
    'rut-representante': 'RUT del representante legal',
    'nombre-representante': 'Nombre del representante legal',
    'email-representante': 'Email del representante legal',
    'certificado-digital': '¿Tiene certificado digital?'
  };
  
  for (let key in formData) {
    const nombreCampo = nombresMapeados[key] || key;
    html += `<p><strong>${nombreCampo}:</strong> ${formData[key] || '(vacío)'}</p>`;
  }
  
  content.innerHTML = html || '<p>No hay datos ingresados</p>';
  
  // Abrir el dialog
  dialog.open();
}

function pasarASiguienteSeccion() {
  // Obtener la sección activa actual
  const sections = document.querySelectorAll('.form-section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let indexActual = -1;
  sections.forEach((section, index) => {
    if (section.classList.contains('active')) {
      indexActual = index;
    }
  });
  
  // Calcular el índice de la siguiente sección
  const siguienteIndex = indexActual + 1;
  
  // Si hay una siguiente sección, cambiar a ella
  if (siguienteIndex < sections.length) {
    // Ocultar todas las secciones
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Mostrar la siguiente sección
    sections[siguienteIndex].classList.add('active');
    navLinks[siguienteIndex].classList.add('active');
  }
}