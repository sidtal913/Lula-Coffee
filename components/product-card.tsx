"use client";

import { IconHeart, IconPlus } from "@/components/icons";
import type { Product } from "@/lib/api/client";
import { useCart } from "@/lib/cart/context";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/lib/wishlist/context";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority }: ProductCardProps) {
  const reduce = useReducedMotion();
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-card border border-ink/8 bg-surface"
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-canvas"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-[220ms] ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
          priority={priority}
        />
      </Link>

      <div className="absolute right-3 top-3 flex flex-col gap-2">
        <motion.button
          type="button"
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
          onClick={() => toggle(product.id)}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-surface/95 shadow-sm transition-colors duration-200 ${
            wished ? "text-accent" : "text-ink/70 hover:text-accent"
          }`}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
        >
          <IconHeart className={wished ? "fill-current" : undefined} />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/shop/${product.slug}`}
              className="font-display text-lg leading-snug text-ink hover:text-accent"
            >
              {product.name}
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{product.origin}</p>
          </div>
          <p className="shrink-0 text-sm font-semibold text-ink">
            {formatPrice(product.priceCents, product.currency)}
          </p>
        </div>

        {product.rating != null && product.reviewCount != null && (
          <p className="text-xs text-muted">
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </p>
        )}

        <motion.button
          type="button"
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
          disabled={!product.inStock}
          onClick={() => addItem(product)}
          className="mt-auto flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-medium text-surface transition-colors duration-200 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconPlus aria-hidden />
          {product.inStock ? "Quick add" : "Out of stock"}
        </motion.button>
      </div>
    </motion.article>
  );
}
