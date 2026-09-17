"use client";

import { IconBag } from "@/components/icons";
import { useAuth } from "@/lib/auth/context";
import { useCart } from "@/lib/cart/context";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Beans", href: "/shop?category=beans" },
  { label: "Equipment", href: "/shop?category=equipment" },
  { label: "Gifts", href: "/shop?category=gifts" },
  { label: "Subscribe", href: "/shop?category=subscriptions" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, subtotalCents } = useCart();
  const { isAuthenticated, signInDemo, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-5 py-4 md:px-16 lg:px-20">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink md:text-2xl"
        >
          Lula Coffee
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith("/shop") && item.href.includes("category=");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ease-out hover:text-accent ${
                  active ? "text-accent" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={signOut}
              className="hidden text-sm text-ink/70 transition-colors duration-200 hover:text-ink sm:inline"
            >
              Sign out
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signInDemo("customer")}
              className="hidden text-sm text-ink/70 transition-colors duration-200 hover:text-ink sm:inline"
            >
              Sign in
            </button>
          )}
          <Link
            href="/shop"
            className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/10 bg-canvas transition-colors duration-200 hover:border-accent/40"
            aria-label={`Cart, ${itemCount} items, ${formatPrice(subtotalCents)} subtotal`}
          >
            <IconBag className="text-ink" aria-hidden />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-surface">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav
        className="flex gap-4 overflow-x-auto border-t border-ink/5 px-5 py-3 md:hidden"
        aria-label="Mobile primary"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-sm font-medium text-ink/80"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
