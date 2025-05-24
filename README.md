# Éxito Cart Playwright Tests

Este proyecto contiene pruebas automatizadas para validar la funcionalidad del carrito de compras en la plataforma de Éxito. Las pruebas están desarrolladas utilizando Playwright y siguen el patrón Screenplay para una mejor organización y mantenibilidad del código.

## Casos de Prueba

### CP1: Validar cantidad en carrito vs orderForm

**Given:** El usuario está en el PDP de Televisor SAMSUNG 60″ UHD4K Smart TV  
**When:** Agrega 1 al carrito y viaja al checkout  
**Then:** La cantidad que se ve en el summary coincide con la del orderForm

### CP2: Validar carrito vacío en orderForm

**Given:** El usuario está en el PLP y no tiene items en el carrito  
**When:** Viaja al summary del checkout  
**Then:** No debe visualizarse nada en el arreglo de items del orderForm

### CP3: Validar eliminación de producto desde minicart

**Given:** El usuario está en el PLP y tiene un producto en el minicart  
**When:** Lo elimina desde el minicart y viaja al checkout  
**Then:** El producto no debe estar en el summary y no debe aparecer en el arreglo de items del orderForm

### CP4: Validar agregar múltiples productos al carrito

**Given:** El usuario está en el PLP de aseo del hogar  
**When:** Selecciona el método de entrega y agrega 3 productos diferentes al carrito  
**Then:** Debe ver los tres productos en el carrito

### CP5: Validar persistencia del carrito tras recargar página

**Given:** El usuario está en el PLP  
**When:** Agrega un producto al carrito, recarga la página y navega al checkout  
**Then:** El producto debe seguir en el carrito

### CP6: Validar cambio de cantidad de producto en el PDP

**Given:** El usuario está en el PDP  
**When:** Agrega un producto al carrito, cambia la cantidad a 3 y navega al checkout  
**Then:** Debe ver el producto con cantidad 3 en el carrito

## Tecnologías Utilizadas

- Playwright: Framework de automatización de pruebas
- TypeScript: Lenguaje de programación
- Screenplay Pattern: Patrón de diseño para pruebas automatizadas

## Estructura del Proyecto

```
src/
├── helpers/           # Utilidades y configuraciones
├── screenplay/        # Implementación del patrón Screenplay
│   ├── abilities/     # Habilidades de los actores
│   ├── questions/     # Preguntas para validaciones
│   └── tasks/         # Tareas que los actores pueden realizar
└── tests/            # Casos de prueba
```

## Ejecución de Pruebas

Para ejecutar las pruebas:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo headed (con navegador visible)
npm run test:headed

# Ejecutar pruebas en un navegador específico
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

## Configuración

El proyecto utiliza variables de entorno para la configuración. Estas se pueden encontrar en el archivo `src/helpers/env.helper.ts`. Las principales configuraciones incluyen:

- URLs base para diferentes secciones del sitio
- Timeouts por defecto
- Slugs para productos y categorías

## Instalación

```bash
git clone https://github.com/marianaph6/exito-cart-playwright
cd exito-cart-playwright
cp .env.example .env     # Ajusta valores si es necesario
npm ci
npm run pw:init          # Descarga navegadores
```

## CI/CD Pipeline

El proyecto incluye un pipeline de CI/CD implementado con GitHub Actions que ejecuta los casos de prueba de manera automatizada. Las características principales son:

### Configuración del Pipeline

- **Disparador**: Manual (workflow_dispatch)
- **Concurrencia**: 6 casos de prueba ejecutándose en paralelo
- **Contenedores**: Cada caso de prueba se ejecuta en un contenedor independiente
- **Navegadores**: Configurados automáticamente en cada contenedor

### Características Técnicas

- **Ejecución Paralela**: Los 6 casos de prueba se ejecutan simultáneamente
- **Aislamiento**: Cada caso de prueba tiene su propio contenedor y navegador
- **Estabilidad**:
  - Reintentos automáticos (2 intentos)
  - Timeout configurado (60 segundos)
  - Servidor X virtual para navegadores
- **Reportes**:
  - Generación de reportes HTML
  - Capturas de pantalla de fallos
  - Trazas detalladas
  - Retención de 30 días

### Ejecución del Pipeline

1. Navega a la pestaña "Actions" en el repositorio
2. Selecciona el workflow "Playwright Tests"
3. Haz clic en "Run workflow"
4. Espera a que se completen las 6 ejecuciones paralelas

### Artefactos y Reportes

Los reportes de las pruebas se generan como artefactos y pueden ser descargados desde la interfaz de GitHub Actions después de cada ejecución. Los reportes incluyen:

- Capturas de pantalla de fallos
- Trazas de errores
- Información detallada de cada paso de la prueba
- Estado de cada caso de prueba

### Manejo de Fallos

- Los fallos no detienen la ejecución de otros casos de prueba
- Se realizan 2 reintentos automáticos en caso de fallo
- Los reportes detallados ayudan a identificar la causa raíz de los fallos
