# Foundation API

API de utilidades profesionales que demuestra clean architecture y buenas prácticas de desarrollo.

## Requisitos

- **Node.js** 20+ LTS
- **npm** 9+ (incluido con Node.js)

## Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd api-foundation

# Instalar dependencias
npm install
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run build` | Compila el proyecto TypeScript |
| `npm run start` | Inicia la aplicación (producción) |
| `npm run start:dev` | Inicia con hot-reload (desarrollo) |
| `npm run start:debug` | Inicia en modo debug |
| `npm run lint` | Ejecuta ESLint |
| `npm test` | Ejecuta tests unitarios |
| `npm run test:cov` | Ejecuta tests con coverage |
| `npm run test:e2e` | Ejecuta tests end-to-end |

## Levantar el API

### Desarrollo (con hot-reload)

```bash
npm run start:dev
```

La API estará disponible en: **http://localhost:3000**

### Producción

```bash
npm run build
npm run start:prod
```

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Endpoint Raíz |
| GET | `/api/v1/health` | Health Check (próximamente) |

> Para más detalles, consulta la documentación Swagger en `/api/docs` una vez implementado.

## Estructura del Proyecto

```
api-foundation/
├── src/
│   ├── main.ts              # Bootstrap de la aplicación
│   └── app.module.ts        # Módulo raíz
├── dist/                    # Archivos compilados (generado)
├── node_modules/            # Dependencias (generado)
├── package.json
├── tsconfig.json            # Configuración TypeScript
├── tsconfig.build.json      # Configuración build
├── nest-cli.json            # Configuración NestJS
└── .gitignore
```

## Variables de Entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `PORT` | `3000` | Puerto del servidor |

## Development

### Compilar

```bash
npm run build
```

### Tests

```bash
# Unit tests
npm test

# Con coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Stack Tecnológico

- **Runtime:** Node.js 20+
- **Framework:** NestJS 10.x
- **Lenguaje:** TypeScript 5.x (strict mode)
- **Testing:** Jest

## Licencia

MIT