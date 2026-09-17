import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-surface">
      <div className="mx-auto grid max-w-content gap-12 px-5 py-16 md:grid-cols-3 md:px-16 lg:px-20">
        <div>
          <p className="font-display text-2xl">Lula Coffee</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-surface/70">
            Small-batch roasts, transparent sourcing, and gear chosen by people
            who pull shots for a living.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-surface/50">
            Shop
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/shop?category=beans" className="hover:text-accent">
                Single origins & blends
              </Link>
            </li>
            <li>
              <Link href="/shop?category=equipment" className="hover:text-accent">
                Brew equipment
              </Link>
            </li>
            <li>
              <Link href="/shop?category=subscriptions" className="hover:text-accent">
                Subscriptions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-surface/50">
            Visit
          </p>
          <p className="mt-4 text-sm leading-relaxed text-surface/70">
            412 Roastery Lane
            <br />
            Portland, OR
          </p>
          <p className="mt-4 text-sm text-surface/70">hello@lulacoffee.com</p>
        </div>
      </div>
      <div className="border-t border-surface/10 px-5 py-6 text-center text-xs text-surface/50 md:px-16">
        © {new Date().getFullYear()} Lula Coffee. All rights reserved.
      </div>
    </footer>
  );
}
