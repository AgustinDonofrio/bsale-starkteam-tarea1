# Bsale - Formulario de Registro de Empresa (Fase I)

Formulario web responsivo para el registro de información de empresas que contratan los servicios de Bsale. Este proyecto forma parte de la renovación del proceso de afiliación y puesta en marcha de nuevos clientes.

## Descripción del Proyecto

Este formulario permite a los clientes de Bsale registrar la información necesaria para su afiliación mediante un sistema de navegación por secciones, validación de datos en tiempo real y confirmación mediante diálogos interactivos.

### Fase I - Implementación Básica

En esta primera fase se implementaron las dos primeras secciones del formulario:
- **Datos de la empresa**
- **Datos del representante legal**

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica del formulario
- **CSS3**: Estilos personalizados con CSS Grid para diseño responsivo
- **JavaScript (Vanilla)**: Lógica de validación y manejo de datos
- **Google Material Design Components**: Componentes UI (Text Fields, Buttons, Radio Buttons, Dialog)
- **Material Symbols**: Iconografía

## Características Principales

### Funcionalidades Implementadas

- **Menú lateral de navegación** con 7 secciones
- **Validación de campos obligatorios** (RUT de empresa y Razón social)
- **Validación de formato de email**
- **Captura de datos en tiempo real** almacenados en estructura de datos (objeto JavaScript)
- **Dialog de confirmación** para revisar datos antes de enviar
- **Navegación entre secciones** después de confirmar
- **Diseño responsivo** con CSS Grid
- **Componentes Material Design** completamente funcionales

## Estructura del Proyecto
```
bsale-formulario/
│
├── index.html              # Estructura HTML del formulario
├── styles.css              # Estilos CSS personalizados
├── scripts.js              # Lógica JavaScript
├── README.md               # Documentación del proyecto
└── images/logo-bsale.png   # Logo de Bsale
```

## Instalación y Uso

### Pasos para ejecutar

1. **Clonar o descargar el proyecto**
```
  git clone https://github.com/AgustinDonofrio/bsale-starkteam-tarea1.git
```

2. **Abrir el archivo HTML**
   - Opción 1: Usar Live Server en VS Code
   - Opción 2: Servir con cualquier servidor local

3. **Navegar por el formulario**
   - Completar los campos de "Datos de la empresa"
   - Hacer clic en "ENVIAR" para revisar los datos
   - Confirmar para pasar a la siguiente sección

## Uso del Formulario

### Flujo de Usuario

1. El usuario completa los campos del formulario activo
2. Al hacer clic en **"ENVIAR"**:
   - Se validan los campos obligatorios
   - Se muestra un dialog con todos los datos ingresados
3. En el dialog, el usuario puede:
   - **Cancelar**: Volver a editar los datos
   - **Confirmar**: Guardar y pasar a la siguiente sección

### Validaciones Implementadas

#### Sección: Datos de la empresa
- **RUT de la empresa**: Campo obligatorio
- **Razón social**: Campo obligatorio

#### Sección: Datos del representante legal
- **Email**: Validación de formato (usuario@dominio.com)

## Diseño Responsivo

El formulario se adapta a diferentes tamaños de pantalla:

- **Desktop (> 768px)**: Menú lateral y formulario en paralelo
- **Tablet/Mobile (≤ 768px)**: Menú lateral arriba, formulario abajo
- **Formularios internos**: Grid responsivo que se adapta automáticamente

### Técnicas CSS Utilizadas

- **CSS Grid**: Layout principal y formularios
- **Flexbox**: Componentes específicos
- **clamp()**: Espaciados y tipografía fluida
- **Media Queries**: Breakpoint en 768px para cambio de layout

## Dependencias Externas
```html
<!-- Material Design Components -->
<link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet">
<script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>

<!-- Material Symbols -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
```

## Estructura de Datos

Los datos del formulario se almacenan en un objeto JavaScript:
```javascript
const formData = {
  'rut-empresa': 'valor',
  'razon-social': 'valor',
  'direccion-empresa': 'valor',
  'comuna': 'valor',
  'actividad-economica': 'valor',
  'rut-representante': 'valor',
  'nombre-representante': 'valor',
  'email-representante': 'valor',
  'certificado-digital': 'Sí' o 'No'
};
```