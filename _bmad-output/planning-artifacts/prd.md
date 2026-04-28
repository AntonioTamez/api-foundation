---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain-skipped
  - step-06-innovation-skipped
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
releaseMode: phased
inputDocuments: []
workflowType: 'prd'
classification:
  projectType: API de utilidades
  domain: Herramientas de desarrollo / Utilidades técnicas
  complexity: baja
  projectContext: greenfield
vision:
  summary: API de utilidades profesional que demuestra clean architecture y buenas prácticas de desarrollo
  differentiator: Funcional y demostrativo - útil en el mundo real pero también sirve para mostrar habilidades de ingeniería profesional
  coreInsight: El momento donde un reclutador o cliente ve código bien estructurado y piensa "esto está bien hecho"
  context: Proyecto de portafolio profesional
successCriteria:
  userSuccess:
    - "Facilidad de integración: un desarrollador promedio puede integrar la API en menos de 30 minutos"
    - "DX profesional: errores claros y accionables, mensajes consistentes, formato JSON estándar"
    - "Onboarding sin fricción: primera request exitosa en menos de 5 minutos"
  businessSuccess:
    - "Reutilización real: otros desarrolladores usan Foundation API en sus proyectos"
    - "Visibilidad: stars en GitHub, tráfico al sitio de documentación"
    - "Impresión técnica: calidad de código que reciba feedback positivo en revisiones técnicas"
  technicalSuccess:
    - "Uptime: 99.9%"
    - "Latencia p95: < 200ms"
    - "Cobertura de tests: ≥ 80%"
    - "Documentación Swagger: 100% endpoints"
    - "Clean Architecture: capas separadas (API → Servicios → Repositorio)"
  scope:
    mvp:
      - "UUID Generator"
      - "Password Hashing (bcrypt/argon2)"
      - "Token Generator (JWT/OTP)"
      - "Health Check endpoint"
      - "URL Shortener con redirect"
    growth:
      - "Rate limiting por API key"
      - "Cache layer (Redis/Memory)"
      - "Usage analytics"
      - "SDK clients multi-lenguaje"
    vision:
      - "Plugin system"
      - "Admin dashboard"
      - "Multi-tenant support"
---

# Product Requirements Document - api-foundation

**Author:** Antonio
**Date:** 2026-04-27

## Resumen Ejecutivo

**Foundation API** es una API de utilidades profesionales diseñada para servir como base técnica reutilizable en proyectos futuros y elemento diferenciador en un portafolio de desarrollo. El proyecto resuelve una necesidad concreta: contar con componentes de utilidades bien diseñados y documentados que evitan la reinvención de funcionalidad común en cada nuevo proyecto.

El público objetivo son desarrolladores que necesitan funciones reutilizables para autenticación, manipulación de datos y utilidades internas — tanto para uso propio como para demostrar competencias profesionales.

### Lo Que Hace Especial Este Proyecto

La diferencia clave reside en el equilibrio entre **funcionalidad práctica** y **calidad profesional demostrable**. Mientras otras APIs de utilidades existen simplemente para resolver problemas técnicos, Foundation API está diseñada para que cada endpoint sea un ejemplo de clean architecture, buena documentación y patrones de diseño profesionales.

El momento diferenciador ocurre cuando un reclutador o cliente revisa el código y percibe inmediatamente que el autor comprende arquitectura de software, no solo programación. La decisión de construirlo ahora responde al contexto del portafolio: es el momento preciso donde cada decisión de diseño puede alinearse con objetivos profesionales a largo plazo.

## Clasificación del Proyecto

| Atributo | Valor |
|----------|-------|
| **Tipo de Proyecto** | API de utilidades / Backend reutilizable |
| **Dominio** | Herramientas de desarrollo |
| **Complejidad** | Baja |
| **Contexto** | Greenfield (nuevo desarrollo) |
| **Tecnologías** | .NET o Node.js, Clean Architecture, Swagger |
| **Deploy** | Render, Railway, o Fly.io (opciones gratuitas) |

## Criterios de Éxito

### Éxito de Usuario (Developer Experience)

- **Facilidad de integración:** Un desarrollador promedio puede integrar la API en su proyecto en menos de 30 minutos siguiendo la documentación
- **DX profesional:** Errores claros y accionables, mensajes consistentes, formato JSON estándar
- **Onboarding sin fricción:** Un nuevo usuario puede hacer su primera request exitosa en menos de 5 minutos

### Éxito de Negocio (Portafolio)

- **Reutilización real:** Otros desarrolladores usan Foundation API en sus proyectos (evidencia: dependencias en npm/nuget, forks)
- **Visibilidad:** Stars en GitHub, tráfico al sitio de documentación
- **Impresión técnica:** Calidad de código que reciba feedback positivo en revisiones técnicas

### Éxito Técnico

| Métrica | Target |
|---------|--------|
| **Uptime** | 99.9% |
| **Latencia p95** | < 200ms |
| **Cobertura de tests** | ≥ 80% |
| **Documentación Swagger** | 100% endpoints |
| **Clean Architecture** | Capas separadas: API → Servicios → Repositorio |

## Alcance del Producto

### MVP (Essential)

- **UUID Generator** — generación de UUIDs únicos
- **Password Hashing** — hashing seguro con bcrypt/argon2
- **Token Generator** — generación de tokens JWT/OTP
- **Health Check** — endpoint de estado del servicio
- **URL Shortener** — acortador de URLs con redirect

### Growth Features (Post-MVP)

- Rate limiting por API key
- Cache layer (Redis/Memory)
- Rate de uso analytics
- SDK clients para múltiples lenguajes

### Vision (Future)

- Plugin system para extensiones
- Admin dashboard para gestión
- Multi-tenant support

## User Journeys

### Journey 1: El Desarrollador Integrador

**Persona:** María, 28 años, developer full-stack trabajando en una startup. Necesita agregar autenticación a un nuevo proyecto.

**Situación:** María está starting un nuevo proyecto y sabe que necesita un sistema de tokens. No quiere escribir código de autenticación desde cero — ha hecho eso antes y siempre le toma demasiado tiempo.

**Goal:** Agregar generación de tokens a su proyecto en menos de 30 minutos.

**Obstacle:** Hay muchas opciones — podría construirlo ella misma, usar un servicio de terceros, o encontrar una librería open source.

**Journey Narrative:**

1. **Apertura:** María encuentra Foundation API mientras busca "JWT token generator API free" en Google. El nombre le intriga — "Foundation" sugiere algo sólido y reutilizable.

2. **Rising Action:**
   - Lee el README del repositorio
   - Ve que tiene Swagger documentación — "esto se ve profesional"
   - Prueba el healthcheck endpoint — funciona, la API está viva
   - Lee la documentación del generador de tokens
   - Copia el ejemplo cURL
   - Integra en su código — funciona a la primera

3. **Clímax:** El momento donde hace su primera request exitosa y piensa "esto es exactamente lo que necesitaba — y el código es limpio también".

4. **Resolución:** María completa la integración en 20 minutos. Está tan contenta que vuelve al repositorio para dar una estrella y comparte con su equipo.

**Reveal Requirements:**
- Documentación Swagger completa y funcional
- Endpoint de healthcheck visible y confiable
- Ejemplos funcionales en README
- Respuestas JSON consistentes y predecibles
- Mensajes de error claros y accionables

### Journey 2: El Desarrollador Depurando

**Persona:** Carlos, 32 años, backend developer. Usa Foundation API en producción pero encuentra un comportamiento inesperado.

**Situación:** Un endpoint retorna un error 500 que no entiende. Necesita diagnosticar el problema rápidamente.

**Journey Narrative:**

1. **Apertura:** Carlos recibe reportes de errores de usuarios de su aplicación. El log muestra un error originates de Foundation API.

2. **Rising Action:**
   - Consulta la documentación Swagger del endpoint
   - Revisa los headers de respuesta para detalles del error
   - Lee el código fuente del endpoint en GitHub
   - Identifica que el error ocurre por un input malformado
   - Encuentra en el README la especificación correcta del formato

3. **Clímax:** Carlos corrige su código y el endpoint funciona. Nota que el mensaje de error era claro — "invalid UUID format" — lo guió directamente al problema.

4. **Resolución:** Carlos documenta el fix en su equipo y considera contribuir al proyecto con un test adicional para ese edge case.

**Reveal Requirements:**
- Mensajes de error con información útil (no solo "error 500")
- Código fuente legible y accesible
- especificación clara de formatos de input en documentación
- Tests cubriendo edge cases importantes

### Journey 3: El Recruiter Evaluando el Portafolio

**Persona:** Recruiter técnico o hiring manager que revisa el código de un candidato.

**Situación:** El candidato menciona Foundation API en su CV. El recruiter revisa el repositorio para evaluar nivel técnico.

**Journey Narrative:**

1. **Apertura:** El recruiter llega al repositorio desde el CV del candidato.

2. **Rising Action:**
   - Ve el README bien estructurado y profesional
   - Explora la estructura del proyecto — ve Clean Architecture
   - Revisa los tests — alta cobertura, nombres descriptivos
   - Mira Swagger docs — endpoints bien documentados
   - Lee algunos commits para entender el proceso de trabajo

3. **Clímax:** El recruiter piensa: "Este código muestra que alguien entiende arquitectura de verdad, no solo programación".

4. **Resolución:** El recruiter continúa evaluando al candidato con confianza, sabiendo que hay calidad demostrada.

**Reveal Requirements:**
- README profesional con información clara
- Clean Architecture visible en estructura de carpetas
- Tests con nombres descriptivos y alta cobertura
- Documentación Swagger completa
- Historial de commits profesional (commits significativos, no solo "fix")

### Journey Requirements Summary

| Capability | Required By |
|------------|-------------|
| Documentación Swagger completa | Journey 1, 2, 3 |
| Endpoint healthcheck funcional | Journey 1, 2 |
| Errores claros y accionables | Journey 2 |
| Código fuente legible y accesible | Journey 2, 3 |
| Estructura Clean Architecture | Journey 3 |
| Tests con alta cobertura | Journey 3 |
| README profesional | Journey 1, 3 |

## API Backend Specific Requirements

### Arquitectura de Endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/v1/uuid/generate` | POST | Genera UUID v4 único |
| `/api/v1/hash/create` | POST | Hash de contraseña con bcrypt |
| `/api/v1/hash/verify` | POST | Verifica hash |
| `/api/v1/token/generate` | POST | Genera JWT/OTP |
| `/api/v1/health` | GET | Estado del servicio |
| `/api/v1/url/shorten` | POST | Acorta URL |
| `/api/v1/url/{shortCode}` | GET | Redirect de URL acortada |

### Modelo de Autenticación

- **MVP:** Open (sin auth) — facilita testing y onboarding
- **Growth:** API Key authentication

### Versioning

- Header-based: `Accept: application/vnd.api+json;version=1`
- Default: v1

### Rate Limiting

- **MVP:** Sin límites
- **Growth:** Por API key (100 req/min)

### Formatos de Datos

- Request: `application/json`
- Response: `application/json`
- Errors: JSON estructurado con `code`, `message`, `details`

### Especificación de Error

```json
{
  "error": {
    "code": "INVALID_UUID_FORMAT",
    "message": "El formato del UUID proporcionado no es válido",
    "details": {
      "field": "uuid",
      "provided": "invalid-value"
    }
  }
}
```

## Functional Requirements

### Generación de Identificadores

- FR1: Un desarrollador puede generar un UUID v4 único mediante una llamada al endpoint
- FR2: El sistema genera UUIDs sin colisiones en un período de 24 horas

### Hash de Contraseñas

- FR3: Un desarrollador puede crear un hash seguro de una contraseña
- FR4: Un desarrollador puede verificar si una contraseña coincide con un hash existente
- FR5: El sistema utiliza algoritmos de hashing seguros (bcrypt/argon2)

### Generación de Tokens

- FR6: Un desarrollador puede generar un token JWT con parámetros configurables
- FR7: Un desarrollador puede generar un token OTP de un solo uso
- FR8: El sistema permite configurar expiry time para tokens

### Acortador de URLs

- FR9: Un desarrollador puede crear una URL acortada a partir de una URL larga
- FR10: El sistema retorna un código único para cada URL acortada
- FR11: Un usuario final puede acceder a una URL acortada y ser redirigido a la URL original
- FR12: El sistema valida el formato de las URLs proporcionadas

### Monitoreo de Salud

- FR13: Un desarrollador puede consultar el estado de salud del servicio
- FR14: El endpoint de healthcheck retorna información sobre dependencias (database, cache)

### Documentación API

- FR15: El sistema expone documentación Swagger/OpenAPI para todos los endpoints
- FR16: Un desarrollador puede acceder a la documentación Swagger desde una URL estándar

### Manejo de Errores

- FR17: El sistema retorna errores en formato JSON estructurado
- FR18: Cada error incluye código, mensaje y detalles actionables
- FR19: El sistema retorna códigos de estado HTTP apropiados (400, 404, 500)

### Gestión de Versiones

- FR20: El sistema soporta versioning via headers Accept
- FR21: El sistema expone una versión por defecto cuando no se especifica

## Non-Functional Requirements

### Performance

| Métrica | Target |
|---------|--------|
| **Latencia p95** | < 200ms para todos los endpoints |
| **Tiempo de inicio** | Healthcheck responde < 50ms |
| **Throughput** | Soporta 100 req/s sin degradación |

### Security

| Requisito | Descripción |
|-----------|-------------|
| **Hash algorithm** | bcrypt con cost factor ≥ 12 |
| **JWT signing** | HS256 o RS256 con claves de al menos 2048 bits |
| **Input validation** | Todos los inputs sanitizados antes de procesamiento |
| **Rate limiting** | Growth: 100 req/min por API key |

### Scalability

| Escenario | Target |
|-----------|--------|
| **Concurrency** | Soporta 50 requests concurrentes |
| **Horizontal scaling** | Stateless design permite agregar instancias |
| **Data growth** | URLs acortadas: soporte hasta 1M registros |

### Reliability

| Métrica | Target |
|---------|--------|
| **Uptime** | 99.9% |
| **Error rate** | < 0.1% de requests retornan errores 5xx |
| **Recovery** | Auto-restart en < 30s si crash |