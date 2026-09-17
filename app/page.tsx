import { HeroSection } from "@/components/hero-section";
import { ProductGrid } from "@/components/product-grid";
import { listProducts } from "@/lib/api/client";
import Link from "next/link";

export default async function HomePage() {
  const featured = await listProducts({ category: "beans", limit: 4 });

  return (
    <>
      <HeroSection />

      <section className="border-y border-ink/8 bg-canvas">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-8 px-5 py-6 text-center text-sm text-ink/80 md:gap-16 md:px-16 lg:px-20">
          <p>Shipped within 48 hours of roast</p>
          <p className="hidden h-4 w-px bg-ink/15 sm:block" aria-hidden />
          <p>Carbon-neutral delivery in the US</p>
          <p className="hidden h-4 w-px bg-ink/15 sm:block" aria-hidden />
          <p>Transparent farm gate pricing</p>
        </div>
      </section>

      <ProductGrid
        title="This week's picks"
        description="Four lots we are pulling on the bar right now — restocked as harvests land."
        products={featured}
      />

      <section className="bg-ink text-surface">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-16 lg:px-20">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl md:text-4xl">
              Never miss a fresh drop
            </h2>
            <p className="mt-3 text-surface/75">
              Subscribe to the Roaster&apos;s Pick — pause or swap anytime from
              your account.
            </p>
          </div>
          <Link
            href="/shop?category=subscriptions"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-surface/30 px-8 text-sm font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            View subscriptions
          </Link>
        </div>
      </section>
    </>
  );
}
