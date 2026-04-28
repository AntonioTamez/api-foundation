---
stepsCompleted:
  - step-01-init
  - step-02-context
  - step-03-starter
  - step-04-decisions
  - step-05-patterns
  - step-06-structure
  - step-07-validation
  - step-08-complete
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
workflowType: 'architecture'
project_name: 'api-foundation'
user_name: 'Antonio'
date: '2026-04-27'
lastStep: 8
status: 'complete'
completedAt: '2026-04-27'
---

# Architecture Decision Document - api-foundation

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- 21 FRs organizados en 8 categorías (Generación de IDs, Hash, Tokens, URL Short, Health, Documentación, Errores, Versioning)
- API REST stateless para operaciones de utilidades
- Versioning via headers Accept para control de versiones

**Non-Functional Requirements:**
- Performance: Latencia p95 < 200ms, throughput 100 req/s
- Security: bcrypt cost ≥ 12, JWT HS256/RS256 2048+ bits
- Scalability: 50 concurrent requests, horizontal scaling, hasta 1M URLs
- Reliability: 99.9% uptime, < 0.1% error rate, auto-recovery < 30s

**Scale & Complexity:**
- Complejidad: Baja
- Dominio primario: API Backend / Utilidades
- Componentes arquitectónicos估算: 8-10 módulos principales

### Technical Constraints & Dependencies

- Deploy target: Render/Railway/Fly.io (contenedores o serverless)
- Clean Architecture requerida (API → Servicios → Repositorio)
- Documentación Swagger/OpenAPI 100% endpoints
- Stateless design para horizontal scaling

### Cross-Cutting Concerns Identified

1. **Error Handling Centralizado** - Formato JSON estructurado con code/message/details
2. **Health Monitoring** - Endpoint de salud con información de dependencias
3. **Security** - Hash seguro y validación de inputs en todos los endpoints
4. **API Versioning** - Header-based versioning con default v1

## Starter Template Evaluation

### Primary Technology Domain

API Backend / Utilities basado en NestJS + TypeScript

### Starter Options Evaluated

| Starter | Ventajas | Consideraciones |
|---------|----------|------------------|
| Express.js | Minimal, flexible | Sin estructura opinada |
| Fastify | Performance alta, schema validation | Menos ecosistema |
| NestJS | Clean Architecture built-in, DI, Swagger, TypeScript | Más opinionado |
| AdonisJS | Backend completo, similar Laravel | Curva de aprendizaje |

### Selected Starter: NestJS

**Rationale for Selection:**

- ✅ Clean Architecture integrado — Capas naturales (Controllers → Services → Repositories)
- ✅ TypeScript por defecto — Mejor calidad de código para portafolio
- ✅ Swagger/OpenAPI built-in — Documentación automática 100% endpoints
- ✅ Decorators — Código legible y mantenible
- ✅ DI (Dependency Injection) — Testabilidad excelente
- ✅ Composable — Módulos separados por feature

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript 5.x con strict mode
- Node.js 20+ LTS
- ESM modules

**Framework:**
- NestJS 10.x
- Express.js como HTTP adapter (compatible con Fastify)

**Project Structure:**
```
src/
├── controllers/     # HTTP layer
├── services/        # Business logic
├── repositories/    # Data access
├── modules/         # Feature modules
├── common/          # Shared (filters, guards, pipes)
├── config/          # Configuration
└── main.ts          # Bootstrap
```

**Testing Framework:**
- Jest (NestJS default)
- Supertest para e2e testing
- Coverage target: ≥ 80%

**Development Experience:**
- Hot reload con webpack
- Debugging configurado
- ESLint + Prettier preconfigurados

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Database choice
- ORM/Data access approach
- API versioning strategy

**Important Decisions (Shape Architecture):**
- Authentication strategy
- Error handling standard
- Module structure

**Deferred Decisions (Post-MVP):**
- Rate limiting (Growth)
- Cache layer (Growth)
- API key authentication (Growth)

### Data Architecture

**Database:** SQLite (MVP)
- Zero configuration, file-based
- Portable, easy for demos
- Sufficient for 1M URL records
- Can migrate to PostgreSQL for Growth

**ORM:** TypeORM (NestJS recommended)
- TypeScript-first
- Migration support
- Repository pattern built-in

**Data Validation:** class-validator + class-transformer
- DTOs with validation decorators
- Type transformation automatic

### Authentication & Security

**MVP:** Open (no authentication)
- Facilitates testing and onboarding
- Stateless design maintained

**Growth:** API Key authentication
- Key-based rate limiting
- Per-customer tracking

**Security Measures (MVP):**
- bcrypt hashing (cost factor ≥ 12)
- JWT signing (HS256, 2048+ bit keys)
- Input validation on all endpoints
- CORS configuration

### API & Communication Patterns

**API Style:** REST
- Resource-based endpoints
- HTTP verbs appropriately used

**Versioning:** Header-based
- `Accept: application/vnd.api+json;version=1`
- Default to v1 when not specified

**Error Handling:** Structured format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

**Documentation:** Swagger/OpenAPI
- Auto-generated from decorators
- Available at `/api/docs`

### Infrastructure & Deployment

**Target Platforms:** Railway, Render, Fly.io
- Docker container support
- Free tier available
- Easy GitHub integration

**CI/CD:** GitHub Actions
- Lint and test on push
- Deploy on merge to main

**Monitoring:**
- Health endpoint at `/health`
- Structured logging
- Request logging middleware

**Scaling:** Stateless design
- No in-memory state
- Session-less authentication (JWT)
- Horizontal scaling ready

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 6 areas donde agentes IA podrían hacer elecciones diferentes

### Naming Patterns

**Database Naming Conventions (TypeORM):**
- Tablas: `snake_case` plural (users, url_shorteners)
- Columnas: `snake_case` (created_at, user_id)
- Foreign keys: `${table}_id` (user_id, url_id)

**API Naming Conventions:**
- Recursos: plural (`/api/v1/uuid/generate`)
- Métodos HTTP: GET/POST/PUT/DELETE
- Headers versioning: `Accept: application/vnd.api+json;version=1`

**Code Naming Conventions:**
- Classes: PascalCase (UuidService, HashController)
- Variables/functions: camelCase (generateUuid, hashPassword)
- Files: kebab-case (uuid.service.ts, hash.controller.ts)
- Tests: `*.spec.ts` co-located con fuente

### Structure Patterns

**Project Organization (Clean Architecture):**
```
src/
├── modules/
│   ├── uuid/
│   │   ├── uuid.controller.ts
│   │   ├── uuid.service.ts
│   │   ├── uuid.repository.ts
│   │   └── dto/
│   ├── hash/
│   ├── token/
│   ├── url/
│   └── health/
├── common/
│   ├── filters/     # Exception filters
│   ├── interceptors/ # Logging, transform
│   ├── pipes/        # Validation
│   └── decorators/
├── config/
└── main.ts
```

**File Placement:**
- Tests alongside source files (`uuid.service.spec.ts` next to `uuid.service.ts`)
- DTOs in `dto/` subfolder within module
- Shared utilities in `common/`

### Format Patterns

**API Response Formats:**
```typescript
// Success
{ "data": { ... } }

// Error
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

**Data Exchange Formats:**
- Dates: ISO 8601 strings
- JSON fields: snake_case (created_at, short_code)
- Boolean: true/false
- Null handling: explicit null, not undefined

**HTTP Status Codes:**
- 200 OK - Success
- 201 Created - Resource created
- 400 Bad Request - Validation error
- 404 Not Found - Resource not found
- 500 Internal Server Error - Unexpected error

### Communication Patterns

**Error Handling:**
- Global ExceptionFilter for unhandled errors
- HttpException for business errors
- ValidationPipe for DTO validation
- Logger for structured logging

**State Management:** N/A (stateless API)

### Process Patterns

**Error Handling Patterns:**
1. All endpoints wrapped in try-catch
2. HttpException thrown for expected errors
3. Unexpected errors caught by global filter
4. Structured logging for all errors

**Validation Patterns:**
1. DTOs decorated with class-validator
2. ValidationPipe enabled globally
3. Transform payloads using class-transformer

### Enforcement Guidelines

**All AI Agents MUST:**
- Follow naming conventions defined above
- Use feature-based module structure
- Implement error handling via global filters
- Use ValidationPipe for all DTOs
- Co-locate tests with source files

**Pattern Enforcement:**
- ESLint rules enforce naming
- Prettier enforces formatting
- Test coverage enforces testing
- Code review validates adherence

### Pattern Examples

**Good Examples:**
```typescript
// Service naming
async generateUuid(): Promise<string> { ... }

// Repository naming
async findByShortCode(code: string): Promise<Url | null> { ... }

// Controller naming
async generate(@Body() dto: GenerateUuidDto) { ... }
```

**Anti-Patterns:**
```typescript
// ❌ Don't do this
const get_user_data = async (userId) => { ... }  // snake_case function
class UserDataController { ... }  // wrong naming
// ❌ Don't do this
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
api-foundation/
├── package.json
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── .env
├── .env.example
├── .gitignore
├── README.md
├── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   └── configuration.ts
│   ├── modules/
│   │   ├── uuid/
│   │   │   ├── uuid.controller.ts
│   │   │   ├── uuid.service.ts
│   │   │   ├── uuid.repository.ts
│   │   │   ├── uuid.module.ts
│   │   │   └── dto/
│   │   │       └── generate-uuid.dto.ts
│   │   ├── hash/
│   │   │   ├── hash.controller.ts
│   │   │   ├── hash.service.ts
│   │   │   ├── hash.repository.ts
│   │   │   ├── hash.module.ts
│   │   │   └── dto/
│   │   │       ├── create-hash.dto.ts
│   │   │       └── verify-hash.dto.ts
│   │   ├── token/
│   │   │   ├── token.controller.ts
│   │   │   ├── token.service.ts
│   │   │   ├── token.repository.ts
│   │   │   ├── token.module.ts
│   │   │   └── dto/
│   │   │       ├── generate-token.dto.ts
│   │   │       └── verify-token.dto.ts
│   │   ├── url/
│   │   │   ├── url.controller.ts
│   │   │   ├── url.service.ts
│   │   │   ├── url.repository.ts
│   │   │   ├── url.module.ts
│   │   │   └── dto/
│   │   │       ├── shorten-url.dto.ts
│   │   │       └── redirect-url.dto.ts
│   │   └── health/
│   │       ├── health.controller.ts
│   │       ├── health.service.ts
│   │       └── health.module.ts
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   ├── decorators/
│   │   │   └── api-version.decorator.ts
│   │   └── interfaces/
│   │       └── error-response.interface.ts
│   └── database/
│       └── entities/
│           └── url.entity.ts
├── test/
│   ├── unit/
│   │   ├── uuid.service.spec.ts
│   │   ├── hash.service.spec.ts
│   │   ├── token.service.spec.ts
│   │   └── url.service.spec.ts
│   └── e2e/
│       ├── uuid.e2e-spec.ts
│       ├── hash.e2e-spec.ts
│       ├── token.e2e-spec.ts
│       └── url.e2e-spec.ts
└── coverage/
```

### Architectural Boundaries

**API Boundaries:**
- External: `/api/v1/*` endpoints
- Versioning: Header-based (Accept header)
- Documentation: Swagger at `/api/docs`

**Component Boundaries:**
- Each module is self-contained
- Services inject repositories via DI
- Controllers handle HTTP only

**Service Boundaries:**
- Business logic in services
- Repositories handle data access
- DTOs for input validation

**Data Boundaries:**
- TypeORM entities define schema
- Repository pattern abstracts DB
- Migrations for schema changes

### FR to Structure Mapping

| FR Category | Module | Key Files |
|-------------|--------|-----------|
| UUID Generator | uuid/ | controller, service, dto |
| Hash Passwords | hash/ | controller, service, dto |
| Token Generator | token/ | controller, service, dto |
| URL Shortener | url/ | controller, service, dto, entity |
| Health Check | health/ | controller, service |

### Integration Points

**Internal Communication:**
- Module imports in app.module.ts
- Service injection via constructors
- Inter-module communication through services

**External Integrations:**
- Database: SQLite via TypeORM
- HTTP: Express/Fastify adapter
- CLI: NestJS CLI commands

**Data Flow:**
1. HTTP Request → Controller
2. Controller → Service (business logic)
3. Service → Repository (data access)
4. Repository → Database
5. Response ← Service ← Controller

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- NestJS + TypeORM + SQLite: Compatible trio
- Clean Architecture con capas: Confirma estructura modular
- Stateless API + JWT (Growth): Alineado con scalability

**Pattern Consistency:**
- Naming conventions: snake_case (DB/API) vs camelCase (code) definidos
- Error handling: Global filter + HttpException establecidos
- Structure patterns: Feature-based modules siguen Clean Architecture

**Structure Alignment:**
- Módulos separados por feature (uuid, hash, token, url, health)
- Capas bien definidas (controller → service → repository)
- common/ para concerns transversales

### Requirements Coverage Validation ✅

**FR Coverage:**

| FR Category | Module | Status |
|-------------|--------|--------|
| UUID Generator (FR1-2) | uuid/ | ✅ Covered |
| Hash Passwords (FR3-5) | hash/ | ✅ Covered |
| Token Generator (FR6-8) | token/ | ✅ Covered |
| URL Shortener (FR9-12) | url/ | ✅ Covered |
| Health Check (FR13-14) | health/ | ✅ Covered |
| API Docs (FR15-16) | Swagger | ✅ Covered |
| Error Handling (FR17-19) | common/filters | ✅ Covered |
| Versioning (FR20-21) | Header-based | ✅ Covered |

**NFR Coverage:**
- Performance: Stateless design + optimized queries
- Security: bcrypt ≥12, JWT HS256, input validation
- Scalability: Horizontal scaling ready (stateless)
- Reliability: Health endpoint, structured logging

### Implementation Readiness Validation ✅

**Decision Completeness:** Completa ✅
- Tecnologías especificadas con versiones verificadas
- Patrones de implementación documentados
- Guidelines de enforcement establecidos

**Structure Completeness:** Completa ✅
- 5 módulos principales con archivos específicos
- common/ para concerns compartidos
- test/ para unit y e2e tests

**Pattern Completeness:** Completa ✅
- Naming conventions para DB, API, code
- Format patterns para responses y errors
- Process patterns para error handling y validation

### Gap Analysis Results

No critical gaps identified. Architecture is complete and ready for implementation.

### Validation Issues Addressed

All validation checks passed. No issues requiring resolution.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context analyzed
- [x] Scale assessed (low complexity)
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Starter: NestJS + TypeScript
- [x] Database: SQLite (MVP)
- [x] ORM: TypeORM
- [x] API Versioning: Header-based

**✅ Implementation Patterns**
- [x] Naming conventions (snake_case, camelCase, PascalCase)
- [x] Structure patterns (modules, common, config)
- [x] Communication patterns (error handling)
- [x] Process patterns (validation, error handling)

**✅ Project Structure**
- [x] Directory structure complete
- [x] Component boundaries established
- [x] Integration points mapped
- [x] FR to structure mapping done

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION ✅

**Confidence Level:** Alta

**Key Strengths:**
- Clean Architecture bien definida con capas separadas
- Módulos feature-based para fácil expansión
- Patrones de naming consistentes para IA agents
- NFRs todos cubiertos arquitectónicamente

**Areas for Future Enhancement:**
- Rate limiting (Growth phase)
- Cache layer (Growth phase)
- API Key authentication (Growth phase)

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Step:**
```bash
nest new api-foundation --package-manager npm
cd api-foundation
npm install @nestjs/swagger @nestjs/typeorm typeorm sqlite3 class-validator class-transformer bcrypt jsonwebtoken
```