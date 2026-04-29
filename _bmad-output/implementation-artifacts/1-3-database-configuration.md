# Story 1.3: Database Configuration

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want to configure TypeORM with SQLite,
so that I can persist data for the URL shortener.

## Acceptance Criteria

1. **AC1: TypeORM with SQLite**
   - **Given** the project is initialized
   - **When** I configure TypeORM with SQLite
   - **Then** the database connection is established
   - **And** TypeORM entities can be created

2. **AC2: URL Entity**
   - **Given** TypeORM is configured
   - **When** I create a URL entity
   - **Then** the entity is synced to the SQLite database

## Tasks / Subtasks

- [ ] Task 1 (AC: 1)
  - [ ] Subtask 1.1: Install TypeORM and SQLite dependencies (@nestjs/typeorm, typeorm, sqlite3)
  - [ ] Subtask 1.2: Configure TypeORMModule in AppModule with SQLite database
  - [ ] Subtask 1.3: Create database/ directory structure with entities/ subdirectory
  - [ ] Subtask 1.4: Verify database connection is established on startup
- [ ] Task 2 (AC: 2)
  - [ ] Subtask 2.1: Create URL entity with fields: id, originalUrl, shortCode, createdAt, updatedAt
  - [ ] Subtask 2.2: Register entity in TypeORM module
  - [ ] Subtask 2.3: Verify entity syncs to SQLite database on startup
- [ ] Task 3 (AC: 1, 2)
  - [ ] Subtask 3.1: Add database configuration to .env.example (DATABASE_PATH)
  - [ ] Subtask 3.2: Write unit tests for URL entity creation

## Dev Notes

### Technical Stack

- **Runtime:** Node.js 20+ LTS
- **Language:** TypeScript 5.x with strict mode
- **Framework:** NestJS 10.x
- **Database:** SQLite (MVP), file-based storage
- **ORM:** TypeORM
- **Architecture:** Clean Architecture (Controllers → Services → Repositories → DTOs)

### Required Dependencies

```bash
npm install @nestjs/typeorm typeorm sqlite3
```

### Database Configuration Pattern

From `architecture.md#Data Architecture`:
- **Database:** SQLite (MVP) - zero configuration, file-based
- **ORM:** TypeORM (NestJS recommended)

### URL Entity Fields

Based on `architecture.md#FR to Structure Mapping`:
- `id` - Primary key (auto-generated)
- `originalUrl` - The full URL to be shortened
- `shortCode` - The 6-8 character unique identifier
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Source: architecture.md#Data Architecture

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

### Source: architecture.md#Project Structure

```
database/
└── entities/
    └── url.entity.ts
```

### Current Implementation Notes

After Story 1.2, the codebase has:
- `src/main.ts` - Bootstrap with graceful shutdown
- `src/app.module.ts` - Root module with GlobalExceptionFilter registered
- `src/config/configuration.ts` - Configuration with port parsing
- `src/common/filters/global-exception.filter.ts` - HTTP exception filter
- `src/modules/uuid/` - Sample module demonstrating Clean Architecture pattern

**Must preserve:**
- GlobalExceptionFilter registration in AppModule
- PORT env var handling in bootstrap
- Graceful shutdown implementation
- Clean Architecture folder structure (modules/, common/, config/, database/)

### Testing Requirements

- Jest is NestJS default testing framework
- Coverage target: ≥ 80%
- Unit tests co-located with source (`*.spec.ts`)
- E2E tests in `test/` directory

### References

- [Source: architecture.md#Data Architecture]
- [Source: architecture.md#Project Structure & Boundaries]
- [Source: epics.md#Story 1.3]

## Dev Agent Record

### Agent Model Used

MiniMax-M2.7

### Debug Log References

### Completion Notes List

### File List
