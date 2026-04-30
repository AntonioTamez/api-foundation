# Deferred Work

## Deferred from: code review of story 1-1-project-setup (2026-04-29)

- **Timestamp reveals server timezone** (information disclosure vector) — src/common/filters/global-exception.filter.ts:37
- **tsconfig outDir without rootDir** allows TypeScript emission outside dist/ — tsconfig.json
- **emitDecoratorMetadata enabled but reflect-metadata not imported** — src/main.ts:1 — silently does nothing at runtime
- **No tests in codebase** — N/A — zero confidence beyond manual verification
- **GlobalExceptionFilter not in Story 1.1 acceptance criteria** — scope creep for a project setup story — src/app.module.ts:3

## Deferred from: code review of story 1-3-database-configuration (2026-04-29)

- **No index on originalUrl** — queries on original_url column will do full table scans; will need index when URL shortener is implemented

## Deferred from: code review of story 1-3-database-configuration round 2 (2026-04-29)

- **synchronize enabled when NODE_ENV typo** — any non-"production" value (including typos) enables auto-sync
- **No validation on null/undefined shortCode** — @MinLength doesn't validate null/undefined; may allow invalid states through raw DB inserts
- **Transaction rollback leaves orphaned url1** — if save succeeds but commitTransaction throws, rollback occurs but code continues

## Deferred from: code review of 1-4-error-handling-foundation (2026-04-29)

- **ValidationErrorDetail interface unused** — exported but not imported or used anywhere in codebase; dead code
- **Production mode check evaluates `NODE_ENV` on every request** — should be cached at initialization for performance
- **Status 415 (Unsupported Media Type) unmapped** — falls through to INTERNAL_ERROR instead of semantically correct code
- **Response object mutation risk** — exception.getResponse() returns a shared reference; mutation before filter.catch() returns affects subsequent calls