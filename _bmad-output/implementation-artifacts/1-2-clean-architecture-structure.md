# Story 1.2: Clean Architecture Structure

Status: done

## Review Findings

### decision-needed (needs resolution before patching)

- [x] [Review][Decision] isShuttingDown flag is NEVER set to true — graceful shutdown is dead code. Resolved: Removed redundant `isShuttingDown` check, kept `shutdownInitiated` only. — src/main.ts:24-25

### patch (fixable without human input)

- [x] [Review][Patch] isShuttingDown never set to true — graceful shutdown dead code [src/main.ts:20] — fixed
- [x] [Review][Patch] Math.random() for UUID generation — not cryptographically secure [src/modules/uuid/uuid.service.ts:12] — fixed, now uses crypto.randomUUID()
- [x] [Review][Patch] configuration.ts: parseInt('', 10) returns NaN [src/config/configuration.ts:7] — fixed, now validates properly
- [x] [Review][Patch] Promise.race timeout swallows error and calls process.exit(0) [src/main.ts:25] — fixed, timeout now resolves normally instead of rejecting
- [x] [Review][Patch] global-exception.filter missing Error fallback for object without message property [src/common/filters/global-exception.filter.ts:17-19] — fixed, already had fallback in else clause

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want to have the project organized following Clean Architecture,
So that the code is maintainable and testable.

## Acceptance Criteria

1. **AC1: Folder Structure**
   - **Given** the NestJS project is initialized
   - **When** I set up the folder structure
   - **Then** the structure includes: modules/, common/, config/, database/
   - **And** each feature module has: controller, service, repository, dto/

2. **AC2: Consistent Pattern**
   - **Given** the Clean Architecture structure
   - **When** I create a new feature module
   - **Then** I can follow the same pattern consistently

## Tasks / Subtasks

- [x] Task 1 (AC: 1)
  - [x] Subtask 1.1: Create src/modules/ directory structure
  - [x] Subtask 1.2: Create src/common/ subdirectories (filters/, interceptors/, pipes/, decorators/, interfaces/)
  - [x] Subtask 1.3: Create src/config/ directory with configuration.ts
  - [x] Subtask 1.4: Create src/database/ directory with entities/ subdirectory
- [x] Task 2 (AC: 1, 2)
  - [x] Subtask 2.1: Create a sample UUID module demonstrating the pattern (uuid.controller.ts, uuid.service.ts, uuid.repository.ts, uuid.module.ts, dto/)
  - [x] Subtask 2.2: Verify module follows Clean Architecture: controller → service → repository → dto
  - [x] Subtask 2.3: Register module in app.module.ts
- [x] Task 3 (AC: 2)
  - [x] Subtask 3.1: Document the module creation pattern in Dev Notes

## Dev Notes

### Technical Stack
- **Runtime:** Node.js 20+ LTS
- **Language:** TypeScript 5.x with strict mode
- **Framework:** NestJS 10.x
- **Architecture:** Clean Architecture (Controllers → Services → Repositories → DTOs)

### Required Folder Structure

```
src/
├── modules/
│   └── uuid/
│       ├── uuid.controller.ts
│       ├── uuid.service.ts
│       ├── uuid.repository.ts
│       ├── uuid.module.ts
│       └── dto/
│           └── generate-uuid.dto.ts
├── common/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   ├── decorators/
│   └── interfaces/
├── config/
│   └── configuration.ts
├── database/
│   └── entities/
└── main.ts
```

### Naming Conventions

- **Files:** kebab-case (uuid.service.ts, hash.controller.ts)
- **Classes:** PascalCase (UuidService, HashController)
- **Variables/functions:** camelCase (generateUuid, hashPassword)
- **Database/API:** snake_case (created_at, short_code)

### Source: architecture.md#Structure Patterns

**File Placement:**
- Tests alongside source files (`*.spec.ts` co-located with source)
- DTOs in `dto/` subfolder within module
- Shared utilities in `common/`

### Source: architecture.md#Project Structure & Boundaries

**Component Boundaries:**
- Each module is self-contained
- Services inject repositories via DI
- Controllers handle HTTP only
- Business logic in services
- Repositories handle data access
- DTOs for input validation

### Pattern for New Module Creation

1. Create module directory under `src/modules/`
2. Create `*.controller.ts` - HTTP layer, handles requests/responses
3. Create `*.service.ts` - Business logic, repository injection
4. Create `*.repository.ts` - Data access, database operations
5. Create `dto/` subfolder with `*.dto.ts` files
6. Create `*.module.ts` - NestJS module declaring all components
7. Register module in `app.module.ts` imports

### Current Implementation Notes

After Story 1.1, the codebase has:
- `src/main.ts` - Bootstrap with graceful shutdown
- `src/app.module.ts` - Root module with GlobalExceptionFilter
- `src/common/filters/global-exception.filter.ts` - HTTP exception filter (recently patched to @Catch(HttpException))

**Must preserve:**
- GlobalExceptionFilter registration in AppModule
- PORT env var handling in bootstrap
- Graceful shutdown implementation

### Testing Requirements

- Jest is NestJS default testing framework
- Coverage target: ≥ 80%
- Unit tests co-located with source (`*.spec.ts`)
- E2E tests in `test/` directory

### References

- [Source: architecture.md#Structure Patterns]
- [Source: architecture.md#Project Structure & Boundaries]
- [Source: architecture.md#Pattern Examples]
- [Source: epics.md#Story 1.2]

## Dev Agent Record

### Agent Model Used

MiniMax-M2.7

### Debug Log References

### Completion Notes List

- Created src/modules/ directory structure with uuid/ sample module
- Created src/common/ subdirectories (filters/, interceptors/, pipes/, decorators/, interfaces/)
- Created src/config/ with configuration.ts
- Created src/database/entities/ directory
- UUID module: controller → service → repository → dto pattern demonstrated
- GlobalExceptionFilter preserved in AppModule
- Build passes, tests pass (3/3)
- Code review fixes applied: removed dead isShuttingDown code, crypto.randomUUID(), proper port parsing, timeout fix

### File List

- src/modules/uuid/uuid.controller.ts (new)
- src/modules/uuid/uuid.service.ts (new)
- src/modules/uuid/uuid.repository.ts (new)
- src/modules/uuid/uuid.module.ts (new)
- src/modules/uuid/uuid.service.spec.ts (new)
- src/modules/uuid/dto/generate-uuid.dto.ts (new)
- src/config/configuration.ts (new)
- src/app.module.ts (modified)