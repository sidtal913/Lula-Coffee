import type { components, paths } from "@/lib/api/schema";
import { seedProducts } from "@/lib/catalog-seed";

export type Product = components["schemas"]["Product"];
export type ProductCategory = Product["category"];

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

function authHeaders(token: string | null): HeadersInit {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type ListProductsQuery = paths["/products"]["get"]["parameters"]["query"];

export async function listProducts(
  query?: ListProductsQuery,
  token?: string | null,
): Promise<Product[]> {
  const params = new URLSearchParams();
  if (query?.category) params.set("category", query.category);
  if (query?.limit) params.set("limit", String(query.limit));
  const qs = params.toString();
  const path = `/products${qs ? `?${qs}` : ""}`;

  const remote = await fetchJson<{ items: Product[] }>(path, {
    headers: authHeaders(token ?? null),
  });

  if (remote?.items?.length) {
    return remote.items;
  }

  let items = [...seedProducts];
  if (query?.category) {
    items = items.filter((p) => p.category === query.category);
  }
  if (query?.limit) {
    items = items.slice(0, query.limit);
  }
  return items;
}

export async function getProduct(
  productId: string,
  token?: string | null,
): Promise<Product | null> {
  const remote = await fetchJson<Product>(`/products/${productId}`, {
    headers: authHeaders(token ?? null),
  });
  if (remote) return remote;
  return seedProducts.find((p) => p.id === productId || p.slug === productId) ?? null;
}

export type Cart = components["schemas"]["Cart"];

export async function getCart(token: string | null): Promise<Cart | null> {
  if (!token) return null;
  return fetchJson<Cart>("/cart", { headers: authHeaders(token) });
}

export async function addCartItem(
  body: components["schemas"]["AddCartItemRequest"],
  token: string | null,
): Promise<Cart | null> {
  if (!token) return null;
  return fetchJson<Cart>("/cart/items", {
    method: "POST",
    body: JSON.stringify(body),
    headers: authHeaders(token),
  });
}
