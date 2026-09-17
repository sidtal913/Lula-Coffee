import { AddToCartPanel } from "@/components/add-to-cart-panel";
import { getProduct, listProducts } from "@/lib/api/client";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product — Lula Coffee" };
  return {
    title: `${product.name} — Lula Coffee`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-16 md:py-16 lg:px-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-card bg-canvas">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            {product.category} · {product.roastLevel} roast
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-ink md:text-5xl">
            {product.name}
          </h1>
          {product.rating != null && product.reviewCount != null && (
            <p className="mt-3 text-sm text-muted">
              {product.rating.toFixed(1)} stars · {product.reviewCount} reviews
            </p>
          )}
          <p className="mt-6 text-base leading-relaxed text-ink/85">
            {product.description}
          </p>
          <p className="mt-4 text-sm text-muted">Origin: {product.origin}</p>
          <AddToCartPanel product={product} />
        </div>
      </div>
    </div>
  );
}
