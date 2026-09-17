import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/api/client";

type ProductGridProps = {
  products: Product[];
  title?: string;
  description?: string;
};

export function ProductGrid({ products, title, description }: ProductGridProps) {
  return (
    <section className="mx-auto max-w-content px-5 py-16 md:px-16 md:py-24 lg:px-20">
      {(title || description) && (
        <div className="mb-10 max-w-2xl md:mb-14">
          {title && (
            <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
              {description}
            </p>
          )}
        </div>
      )}
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard product={product} priority={index < 4} />
          </li>
        ))}
      </ul>
    </section>
  );
}
