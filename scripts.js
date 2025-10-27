// Estructura de datos para almacenar los valores
const formData = {}; // Uso const porque solamente modifico las propiedades del objeto, pero nunca lo reemplazo
let dialog; // Para mantener una referencia al dialog para poder abrirlo y escuchar sus eventos

document.addEventListener('DOMContentLoaded', function() {
  // Inicializo el componente de Material Design para poder usar sus métodos
  // NOTA: No es necesario inicializar el resto de componentes porque ya funcionan automáticamente con HTML y CSS de Material Design
  dialog = new mdc.dialog.MDCDialog(document.getElementById('data-dialog'));
  
  // Uso el método listen para poder escuchar el evento de cierre del dialog
  dialog.listen('MDCDialog:closed', (event) => {
    if (event.detail.action == 'confirm') {
      // La idea es que se avance automáticamente a la siguiente sección después de confirmar
      pasarASiguienteSeccion();
    }
    // Si es 'cancel', no hace nada (solamente cierra el dialog)
  });
  
  // Ahora quiero capturar el valor de cada input que llene el usuario y cargarlo en el objeto formData
  const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      formData[e.target.id] = e.target.value;
    });
  });
  
  // Idem que antes pero para el valor de los radio buttons (y tambien los cargo en un formato legible)
  const radios = document.querySelectorAll('input[name="certificado"]');
  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      formData['certificado-digital'] = e.target.value == 'si' ? 'Sí' : 'No';
    });
  });
  
  // Esta función se hizo para permitirle al usuario navegar entre secciones desde la sidebar
  configurarNavegacionSidebar();
  
  // Manejar click en botones ENVIAR
  const buttons = document.querySelectorAll('.button-enviar');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Para evitar el comportamiento por defecto del submit (recargar la página)
      
      // Dependiendo de cual sea la sección activa, se validan los campos correspondientes
      const seccionActiva = document.querySelector('.form-section.active');
      if (seccionActiva.id == 'section-datos-empresa') { 
        if (!validarCamposObligatorios()) {
          return;
        }
      }
      
      if (seccionActiva.id == 'section-representante-legal') {
        if (!validarEmail()) {
          return;
        }
      }
      
      mostrarDialog();
    });
  });
});

function configurarNavegacionSidebar() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Para este ejercicio, solo voy a permitir la navegación en las 2 primeras secciones (índices 0 y 1) porque no existen otros formularios
  // NOTA: otra opción hubiera sido permitir la navegación en todas las secciones, pero mostrar un "empty state" para las secciones que no tienen formularios
  const seccionesPermitidas = [
    'section-datos-empresa',
    'section-representante-legal'
  ];
  
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Para evitar que los link recarguen la página
      
      // Identifico a qué sección quiere navegar el usuario
      const seccionDestino = link.getAttribute('data-section');
      const idSeccion = `section-${seccionDestino}`;
      
      if (seccionesPermitidas.includes(idSeccion)) {
        cambiarSeccion(index);
      } else {
        alert('Esta sección aún no está disponible');
      }
    });
  });
}

// Para poder mostrar los diferentes formularios
function cambiarSeccion(indice) {
  const sections = document.querySelectorAll('.form-section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Limpio el estado "active" de las secciones y likn para que no existan múltiples secciones activas
  sections.forEach(section => section.classList.remove('active'));
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Activo la sección y el link correspondiente
  sections[indice].classList.add('active');
  navLinks[indice].classList.add('active');
}

function validarCamposObligatorios() {
  const rutEmpresa = formData['rut-empresa'] || '';
  const razonSocial = formData['razon-social'] || '';
  
  // Uso trim para que los campos no estén vacios antes de continuar
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
  
  // Esto no se pedía pero me pareció útil. Valido el formato del email con una ER
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!regexEmail.test(email)) {
    alert('Por favor, ingrese un email válido');
    return false;
  }
  
  return true;
}

function mostrarDialog() {
  const content = document.getElementById('dialog-content');
  let html = '';
  
  // Mapeo de nombres para que los campos sean más legibles
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
  
  // Solamente muestro los campos de la sección que se encuentra activa
  const seccionActiva = document.querySelector('.form-section.active');
  let camposAMostrar = [];
  
  // Defino que campos corresponden a la sección activa
  if (seccionActiva.id == 'section-datos-empresa') {
    camposAMostrar = [
      'rut-empresa',
      'razon-social',
      'direccion-empresa',
      'comuna',
      'actividad-economica'
    ];
  } else if (seccionActiva.id == 'section-representante-legal') {
    camposAMostrar = [
      'rut-representante',
      'nombre-representante',
      'email-representante',
      'certificado-digital'
    ];
  }
  
  // Genero un HTML para mostrar los campos mencionados (incluyendo los vacíos)
  camposAMostrar.forEach(key => {
    const nombreCampo = nombresMapeados[key] || key;
    const valor = formData[key] || '(vacío)';
    html += `<p><strong>${nombreCampo}:</strong> ${valor}</p>`;
  });
  
  content.innerHTML = html || '<p>No hay datos ingresados</p>';
  
  // Uso del método open para mostrar el dialogo para que el usuario revise los datos antes de enviarlos
  dialog.open();
}

function pasarASiguienteSeccion() {
  const sections = document.querySelectorAll('.form-section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let indexActual = -1; // Porque la siguiente sería la 0 (la primera)
  sections.forEach((section, index) => {
    if (section.classList.contains('active')) {
      indexActual = index;
    }
  });
  
  const siguienteIndex = indexActual + 1;
  
  // Se avanza solamente si la siguiente sección existe
  if (siguienteIndex < sections.length) {
    cambiarSeccion(siguienteIndex);
  }
}