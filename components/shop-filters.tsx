"use client";

import type { ProductCategory } from "@/lib/api/client";
import Link from "next/link";

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "beans", label: "Beans" },
  { value: "equipment", label: "Equipment" },
  { value: "gifts", label: "Gifts" },
  { value: "subscriptions", label: "Subscribe" },
];

const roasts = ["light", "medium", "medium-dark", "dark"] as const;

type ShopFiltersProps = {
  activeCategory: ProductCategory | "all";
  activeRoast: string | null;
};

export function ShopFilters({ activeCategory, activeRoast }: ShopFiltersProps) {
  return (
    <aside className="space-y-8 border-b border-ink/10 pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Category
        </p>
        <ul className="mt-3 space-y-2">
          {categories.map((cat) => {
            const href =
              cat.value === "all" ? "/shop" : `/shop?category=${cat.value}`;
            const active = activeCategory === cat.value;
            return (
              <li key={cat.value}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                    active
                      ? "bg-canvas font-medium text-ink"
                      : "text-ink/70 hover:bg-canvas/60 hover:text-ink"
                  }`}
                >
                  {cat.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Roast
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {roasts.map((roast) => {
            const params = new URLSearchParams();
            if (activeCategory !== "all") {
              params.set("category", activeCategory);
            }
            params.set("roast", roast);
            const active = activeRoast === roast;
            return (
              <li key={roast}>
                <Link
                  href={`/shop?${params.toString()}`}
                  className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm capitalize transition-colors duration-200 ${
                    active
                      ? "border-accent bg-accent/10 text-ink"
                      : "border-ink/15 text-ink/70 hover:border-accent/40"
                  }`}
                >
                  {roast.replace("-", " ")}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
