"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-ink text-surface md:min-h-[80vh]">
      <Image
        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1920&q=85"
        alt="Barista pouring latte art in warm morning light"
        fill
        priority
        className="object-cover object-center opacity-90"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-content flex-col justify-end px-5 pb-16 pt-32 md:px-16 md:pb-24 lg:px-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-surface/70"
        >
          Roasted this week in Portland
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          Coffee with clarity in every cup.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-surface/85 md:text-lg"
        >
          Traceable lots, precise roasts, and brew gear we use on the bar — shipped
          fresh from our roastery.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10"
        >
          <Link
            href="/shop"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-accent px-8 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            Shop fresh beans
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
