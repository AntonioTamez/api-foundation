# Deferred Work

## Deferred from: code review of story 1-1-project-setup (2026-04-29)

- **Timestamp reveals server timezone** (information disclosure vector) — src/common/filters/global-exception.filter.ts:37
- **tsconfig outDir without rootDir** allows TypeScript emission outside dist/ — tsconfig.json
- **emitDecoratorMetadata enabled but reflect-metadata not imported** — src/main.ts:1 — silently does nothing at runtime
- **No tests in codebase** — N/A — zero confidence beyond manual verification
- **GlobalExceptionFilter not in Story 1.1 acceptance criteria** — scope creep for a project setup story — src/app.module.ts:3