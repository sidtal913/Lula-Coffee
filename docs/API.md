# Lula Coffee API (backend)

Contract files live under `spec/`:

- `spec/api.openapi.yaml` — HTTP routes and payloads
- `spec/auth.yaml` — JWT bearer roles (`customer`, `admin`)
- `spec/data-model.yaml` — PostgreSQL entities
- `spec/environments.yaml` — `DATABASE_URL`, `JWT_SECRET`, local Postgres notes

## Run locally

```bash
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

Health: `GET http://localhost:3000/api/health`

Protected routes require `Authorization: Bearer <jwt>` with claims `sub`, `role` (`customer` | `admin`), and valid `exp`. Calls without a token receive **401** with `{ "error": "unauthorized", ... }`.

Catalog routes (`GET /api/v1/products`) are public for storefront integration.
