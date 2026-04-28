---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
workflowType: 'epics'
project_name: 'api-foundation'
status: 'complete'
completedAt: '2026-04-27'
---

# api-foundation - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for api-foundation, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Generación de Identificadores:**
- FR1: Un desarrollador puede generar un UUID v4 único mediante una llamada al endpoint
- FR2: El sistema genera UUIDs sin colisiones en un período de 24 horas

**Hash de Contraseñas:**
- FR3: Un desarrollador puede crear un hash seguro de una contraseña
- FR4: Un desarrollador puede verificar si una contraseña coincide con un hash existente
- FR5: El sistema utiliza algoritmos de hashing seguros (bcrypt/argon2)

**Generación de Tokens:**
- FR6: Un desarrollador puede generar un token JWT con parámetros configurables
- FR7: Un desarrollador puede generar un token OTP de un solo uso
- FR8: El sistema permite configurar expiry time para tokens

**Acortador de URLs:**
- FR9: Un desarrollador puede crear una URL acortada a partir de una URL larga
- FR10: El sistema retorna un código único para cada URL acortada
- FR11: Un usuario final puede acceder a una URL acortada y ser redirigido a la URL original
- FR12: El sistema valida el formato de las URLs proporcionadas

**Monitoreo de Salud:**
- FR13: Un desarrollador puede consultar el estado de salud del servicio
- FR14: El endpoint de healthcheck retorna información sobre dependencias (database, cache)

**Documentación API:**
- FR15: El sistema expone documentación Swagger/OpenAPI para todos los endpoints
- FR16: Un desarrollador puede acceder a la documentación Swagger desde una URL estándar

**Manejo de Errores:**
- FR17: El sistema retorna errores en formato JSON estructurado
- FR18: Cada error incluye código, mensaje y detalles actionables
- FR19: El sistema retorna códigos de estado HTTP apropiados (400, 404, 500)

**Gestión de Versiones:**
- FR20: El sistema soporta versioning via headers Accept
- FR21: El sistema expone una versión por defecto cuando no se especifica

### NonFunctional Requirements

**Performance:**
- NFR1: Latencia p95 < 200ms para todos los endpoints
- NFR2: Healthcheck responde < 50ms
- NFR3: Throughput: Soporta 100 req/s sin degradación

**Security:**
- NFR4: bcrypt con cost factor ≥ 12
- NFR5: JWT signing HS256 o RS256 con claves de al menos 2048 bits
- NFR6: Todos los inputs sanitizados antes de procesamiento

**Scalability:**
- NFR7: Soporta 50 requests concurrentes
- NFR8: Stateless design permite agregar instancias
- NFR9: URLs acortadas: soporte hasta 1M registros

**Reliability:**
- NFR10: Uptime: 99.9%
- NFR11: Error rate: < 0.1% de requests retornan errores 5xx
- NFR12: Auto-restart en < 30s si crash

**Quality:**
- NFR13: Cobertura de tests: ≥ 80%
- NFR14: Documentación Swagger: 100% endpoints

### Additional Requirements

**From Architecture:**

- Starter: NestJS + TypeScript
- Database: SQLite (MVP), migra a PostgreSQL (Growth)
- ORM: TypeORM
- API Versioning: Header-based (Accept: application/vnd.api+json;version=1)
- Deployment: Railway/Render/Fly.io (Docker)
- CI/CD: GitHub Actions

### UX Design Requirements

N/A - API Backend project (no UI requirements)

## Epic List

### Epic 1: Project Foundation
El equipo puede comenzar a desarrollar con una base sólida y escalable.
**FRs:** N/A - Base técnica (setup, config, CI/CD)

### Epic 2: Core Utilities - Identity & Security
Los desarrolladores pueden generar identificadores únicos y hashes de contraseñas seguros.
**FRs:** FR1, FR2, FR3, FR4, FR5

### Epic 3: Core Utilities - Tokens & URLs
Los desarrolladores pueden generar tokens de autenticación y acortar URLs.
**FRs:** FR6, FR7, FR8, FR9, FR10, FR11, FR12

### Epic 4: Platform Infrastructure
La API está lista para producción con monitoring, documentación y versionamiento.
**FRs:** FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21

## Requirements Coverage Map

| FR | Epic | Descripción |
|----|------|-------------|
| FR1 | Epic 2 | UUID generation endpoint |
| FR2 | Epic 2 | Collision-free UUID generation |
| FR3 | Epic 2 | Password hash creation |
| FR4 | Epic 2 | Hash verification |
| FR5 | Epic 2 | Secure hashing (bcrypt ≥ 12) |
| FR6 | Epic 3 | JWT token generation |
| FR7 | Epic 3 | OTP token generation |
| FR8 | Epic 3 | Configurable token expiry |
| FR9 | Epic 3 | URL shortening |
| FR10 | Epic 3 | Unique short code generation |
| FR11 | Epic 3 | URL redirect handler |
| FR12 | Epic 3 | URL format validation |
| FR13 | Epic 4 | Health check endpoint |
| FR14 | Epic 4 | Health check with dependencies |
| FR15 | Epic 4 | Swagger documentation |
| FR16 | Epic 4 | Swagger UI access |
| FR17 | Epic 4 | Structured error format |
| FR18 | Epic 4 | Error with code/message/details |
| FR19 | Epic 4 | HTTP status codes |
| FR20 | Epic 4 | Header-based versioning |
| FR21 | Epic 4 | Default v1 version |

## Epic 1: Project Foundation

El equipo puede comenzar a desarrollar con una base sólida y escalable.

### Story 1.1: Project Setup

As a developer,
I want to initialize a NestJS project with TypeScript,
So that I can build the API on a solid foundation.

**Acceptance Criteria:**

**Given** I have Node.js 20+ installed
**When** I run `nest new api-foundation` with TypeScript
**Then** a new NestJS project is created with all dependencies installed
**And** TypeScript strict mode is enabled

**Given** the project is created
**When** I run `npm run build`
**Then** the project compiles without errors

**Given** the project is created
**When** I run `npm run start:dev`
**Then** the application starts and responds on port 3000

### Story 1.2: Clean Architecture Structure

As a developer,
I want to have the project organized following Clean Architecture,
So that the code is maintainable and testable.

**Acceptance Criteria:**

**Given** the NestJS project is initialized
**When** I set up the folder structure
**Then** the structure includes: modules/, common/, config/, database/
**And** each feature module has: controller, service, repository, dto/

**Given** the Clean Architecture structure
**When** I create a new feature module
**Then** I can follow the same pattern consistently

### Story 1.3: Database Configuration

As a developer,
I want to configure TypeORM with SQLite,
So that I can persist data for the URL shortener.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I configure TypeORM with SQLite
**Then** the database connection is established
**And** TypeORM entities can be created

**Given** TypeORM is configured
**When** I create a URL entity
**Then** the entity is synced to the SQLite database

### Story 1.4: Error Handling Foundation

As a developer,
I want global exception handling configured,
So that all errors return consistent JSON format.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I set up the global exception filter
**Then** all unhandled exceptions return `{ error: { code, message, details } }`
**And** HttpException errors are properly handled

**Given** the exception filter is set up
**When** an error occurs
**Then** the response includes appropriate HTTP status codes

### Story 1.5: CI/CD Pipeline

As a developer,
I want GitHub Actions configured,
So that the project runs tests and linting on every push.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I create the GitHub Actions workflow
**Then** the workflow runs on every push
**And** it runs `npm run lint` and `npm run test`

**Given** the CI workflow exists
**When** I push changes
**Then** I can see the build status in GitHub

## Epic 2: Core Utilities - Identity & Security

Los desarrolladores pueden generar identificadores únicos y hashes de contraseñas seguros.

### Story 2.1: UUID Generation API

As a developer,
I want to generate UUIDs via API,
So that I can use them as unique identifiers in my applications.

**Acceptance Criteria:**

**Given** the API is running
**When** I call `POST /api/v1/uuid/generate`
**Then** I receive a valid UUID v4 string
**And** the response is in JSON format `{ "data": { "uuid": "..." } }`

**Given** I call the UUID endpoint multiple times
**When** I check the generated UUIDs
**Then** all UUIDs are unique and non-repeating within 24 hours

**Given** I call the UUID endpoint
**When** the request is valid
**Then** the response time is < 200ms (NFR1)

### Story 2.2: Password Hashing API

As a developer,
I want to hash passwords via API,
So that I can securely store passwords without implementing hashing myself.

**Acceptance Criteria:**

**Given** the API is running
**When** I call `POST /api/v1/hash/create` with `{ "password": "myPassword123" }`
**Then** I receive a bcrypt hash of the password
**And** the hash uses cost factor ≥ 12 (NFR4)

**Given** I have a hash
**When** I call `POST /api/v1/hash/verify` with `{ "password": "myPassword123", "hash": "..." }`
**Then** I receive `{ "data": { "valid": true } }`
**And** invalid passwords return `{ "data": { "valid": false } }`

**Given** I call the hash endpoint
**When** the password is empty or missing
**Then** I receive a 400 Bad Request error

### Story 2.3: Hash Verification API

As a developer,
I want to verify passwords against hashes via API,
So that I can validate user credentials.

**Acceptance Criteria:**

**Given** I have a password hash
**When** I verify with the correct password
**Then** the verification succeeds and returns valid: true

**Given** I have a password hash
**When** I verify with the wrong password
**Then** the verification fails and returns valid: false

**Given** I try to verify with an invalid hash format
**When** I call the verify endpoint
**Then** I receive a 400 Bad Request error

## Epic 3: Core Utilities - Tokens & URLs

Los desarrolladores pueden generar tokens de autenticación y acortar URLs.

### Story 3.1: JWT Token Generation

As a developer,
I want to generate JWT tokens via API,
So that I can use them for authentication in my applications.

**Acceptance Criteria:**

**Given** the API is running
**When** I call `POST /api/v1/token/generate` with `{ "type": "jwt", "payload": { "userId": "123" }, "expiry": "1h" }`
**Then** I receive a valid JWT token
**And** the token contains the payload data
**And** the token expires after the specified time

**Given** I generate a JWT token
**When** I decode the token header
**Then** the algorithm is HS256 or RS256 (NFR5)
**And** the signing key is at least 2048 bits

### Story 3.2: OTP Token Generation

As a developer,
I want to generate OTP tokens via API,
So that I can implement two-factor authentication.

**Acceptance Criteria:**

**Given** the API is running
**When** I call `POST /api/v1/token/generate` with `{ "type": "otp" }`
**Then** I receive a 6-digit numeric OTP
**And** the OTP is time-limited (valid for 5 minutes by default)

**Given** I generate an OTP
**When** I try to generate the same OTP again
**Then** I receive a different OTP (unique each time)

### Story 3.3: URL Shortening Service

As a developer,
I want to shorten URLs via API,
So that I can create manageable URLs for sharing.

**Acceptance Criteria:**

**Given** the API is running
**When** I call `POST /api/v1/url/shorten` with `{ "url": "https://example.com/very/long/url" }`
**Then** I receive a short code (6-8 characters alphanumeric)
**And** the short code is stored in the database

**Given** I call the shorten endpoint
**When** the URL format is invalid (not a valid URL)
**Then** I receive a 400 Bad Request error with code `INVALID_URL_FORMAT`

**Given** I shorten a URL
**When** I call the endpoint again with the same URL
**Then** I receive the same short code (deterministic)

### Story 3.4: URL Redirect Handler

As a developer,
I want to redirect from short URLs to original URLs,
So that users can access the original content via the short link.

**Acceptance Criteria:**

**Given** I have a shortened URL with code "abc123"
**When** I call `GET /api/v1/url/abc123`
**Then** I receive a 302 redirect to the original URL

**Given** I have a non-existent short code
**When** I call the redirect endpoint
**Then** I receive a 404 Not Found error with code `URL_NOT_FOUND`

**Given** I have a valid short code
**When** I access the redirect
**Then** the response time is < 200ms (NFR1)

## Epic 4: Platform Infrastructure

La API está lista para producción con monitoring, documentación y versionamiento.

### Story 4.1: Health Check Endpoint

As a developer,
I want to check the health of the API,
So that I can monitor if the service is running.

**Acceptance Criteria:**

**Given** the API is running
**When** I call `GET /api/v1/health`
**Then** I receive `{ "data": { "status": "ok", "timestamp": "..." } }`
**And** the response includes database connectivity status
**And** the response time is < 50ms (NFR2)

**Given** the database is down
**When** I call the health endpoint
**Then** I receive `{ "data": { "status": "degraded", "database": "disconnected" } }`
**And** the HTTP status is 200 (never fail health check)

### Story 4.2: API Documentation (Swagger)

As a developer,
I want to access API documentation via Swagger,
So that I can understand and test the API endpoints.

**Acceptance Criteria:**

**Given** the API is running
**When** I access `/api/docs`
**Then** I see the Swagger UI
**And** all endpoints are documented with request/response schemas

**Given** I access the Swagger docs
**When** I look at any endpoint
**Then** I can see the expected request format
**And** I can try the endpoint directly from the UI

**Given** the API has 7 endpoints
**When** I check the Swagger docs
**Then** all 7 endpoints are documented (100% coverage, NFR14)

### Story 4.3: API Versioning

As a developer,
I want the API to support versioning,
So that I can maintain backwards compatibility.

**Acceptance Criteria:**

**Given** the API is running
**When** I send a request with header `Accept: application/vnd.api+json;version=1`
**Then** the request is handled by v1 handlers

**Given** the API is running
**When** I send a request without version header
**Then** the request defaults to v1

**Given** I send a request with an unsupported version
**When** I call with `version=99`
**Then** I receive a 400 Bad Request error with code `UNSUPPORTED_VERSION`

### Story 4.4: Error Handling System

As a developer,
I want consistent error responses,
So that I can handle errors in my client applications reliably.

**Acceptance Criteria:**

**Given** any error occurs in the API
**When** I receive the error response
**Then** the response follows format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

**Given** a validation error occurs
**When** I receive the response
**Then** the HTTP status is 400
**And** the error code is `VALIDATION_ERROR`

**Given** a resource is not found
**When** I receive the response
**Then** the HTTP status is 404
**And** the error code is `NOT_FOUND`

**Given** an unexpected error occurs
**When** I receive the response
**Then** the HTTP status is 500
**And** the error code is `INTERNAL_ERROR`
**And** no internal details are leaked