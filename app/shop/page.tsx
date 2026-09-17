import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { listProducts, type ProductCategory } from "@/lib/api/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Lula Coffee",
  description: "Browse beans, equipment, gifts, and subscriptions.",
};

const categoryLabels: Record<ProductCategory, string> = {
  beans: "Coffee beans",
  equipment: "Brew equipment",
  gifts: "Gift boxes",
  subscriptions: "Subscriptions",
};

type ShopPageProps = {
  searchParams: Promise<{
    category?: ProductCategory;
    roast?: string;
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categoryParam = params.category;
  const activeCategory =
    categoryParam &&
    ["beans", "equipment", "gifts", "subscriptions"].includes(categoryParam)
      ? categoryParam
      : "all";

  let products = await listProducts(
    activeCategory === "all" ? undefined : { category: activeCategory },
  );

  const activeRoast = params.roast ?? null;
  if (activeRoast) {
    products = products.filter((p) => p.roastLevel === activeRoast);
  }

  const title =
    activeCategory === "all" ? "Shop all" : categoryLabels[activeCategory];

  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-16 md:py-16 lg:px-20">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-muted">
          {products.length} {products.length === 1 ? "item" : "items"} — filter
          by category and roast profile.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        <ShopFilters
          activeCategory={activeCategory}
          activeRoast={activeRoast}
        />
        {products.length === 0 ? (
          <p className="text-muted">No products match these filters.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product, index) => (
              <li key={product.id}>
                <ProductCard product={product} priority={index < 3} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
