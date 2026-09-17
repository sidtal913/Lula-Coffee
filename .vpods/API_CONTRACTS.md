# API contract registry

Published backend contracts (Knox / LC-1). Frontend should wire to these shapes — do not ship a parallel mock store.

| Surface | Contract | Implementation |
|---------|----------|----------------|
| OpenAPI | `spec/api.openapi.yaml` | `app/api/**` route handlers |
| Auth | `spec/auth.yaml` | `lib/auth.ts` JWT bearer |
| Data | `spec/data-model.yaml` | `prisma/schema.prisma` |

## Routes (v1)

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/health` | public |
| GET | `/api/v1/products` | public |
| GET | `/api/v1/products/{id}` | public |
| GET | `/api/v1/me` | JWT (customer or admin) |
| GET/PUT | `/api/v1/cart` | JWT (`customer`) |
| GET/POST | `/api/v1/admin/products` | JWT (`admin`) |
| PATCH/DELETE | `/api/v1/admin/products/{id}` | JWT (`admin`) |

Protected routes without a valid bearer token return **401**.
