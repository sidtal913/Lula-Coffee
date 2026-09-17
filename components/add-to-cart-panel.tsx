"use client";

import type { Product } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/context";
import { useCart } from "@/lib/cart/context";
import { formatPrice } from "@/lib/format";
import { motion, useReducedMotion } from "framer-motion";

type AddToCartPanelProps = {
  product: Product;
};

export function AddToCartPanel({ product }: AddToCartPanelProps) {
  const reduce = useReducedMotion();
  const { addItem } = useCart();
  const { isAuthenticated, signInDemo } = useAuth();

  return (
    <div className="mt-10 space-y-6 border-t border-ink/10 pt-8">
      <p className="text-2xl font-semibold text-ink">
        {formatPrice(product.priceCents, product.currency)}
      </p>
      {!isAuthenticated && (
        <p className="text-sm text-muted">
          Sign in to sync your cart with your account (JWT customer role).
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <motion.button
          type="button"
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
          disabled={!product.inStock}
          onClick={() => addItem(product)}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-accent px-8 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-accent/90 disabled:opacity-50 sm:flex-none"
        >
          Add to cart
        </motion.button>
        {!isAuthenticated && (
          <button
            type="button"
            onClick={() => signInDemo("customer")}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-ink/15 px-6 text-sm font-medium transition-colors duration-200 hover:border-accent/50"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}
