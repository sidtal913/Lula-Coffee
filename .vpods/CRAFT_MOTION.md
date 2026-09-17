# Motion craft (VPods hire)

Interaction Motion for Rae. Follow this card when motion improves comprehension (homepage / landing / commerce). Otherwise mark Motion **Not required**.

Never name an external creator. Customer Work Evidence uses capability labels (Interaction Motion, Motion Vocabulary, …).

## Frequency gate (do this first)

| Frequency | Decision |
| --- | --- |
| 100+/day (keyboard, command palette) | **No animation. Ever.** |
| Tens/day (list hover, frequent toggles) | Near-imperceptible or nothing |
| Occasional (modals, drawers, toasts, forms) | Standard animation |
| Rare / first-time | Delight budget lives here |

Never animate keyboard-initiated actions. Name a purpose before coding: **feedback**, **spatial consistency**, **state indication**, **prevent jarring**, **explanation**, or **delight** (rare only).

Landing pages: one orchestrated scroll story (stagger 30–80ms). Functional UI: press, submit, hover, origin-aware panels — not only hero scroll.

**Commerce product cards (baseline):** every product tile needs at least one gated hover/micro-interaction (lift, opacity, image zoom, or action reveal) plus press feedback on quick-add / wishlist. Pair with `.vpods/CRAFT_UX.md` commerce rules — missing hover on a product grid is a Critique fail, not “Motion Not required.”

## Tokens (put on `:root`)

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

Never invent `cubic-bezier(0.4, 0, 0.2, 1)`. Never `ease-in` on UI. Enter/exit → ease-out. On-screen move → ease-in-out. Hover/color → ease. Marquee/progress → linear.

## Duration

| Element | Duration |
| --- | --- |
| Press | 100–160ms |
| Tooltip / small popover | 125–200ms |
| Dropdown / select | 150–250ms |
| Modal / drawer | 200–500ms |
| Marketing / explanatory | Can be longer |

UI stays **under 300ms**.

## Never ship

| Never | Instead |
| --- | --- |
| `transition: all` | Name exact properties |
| `scale(0)` | `scale(0.95)` + `opacity: 0` |
| `ease-in` on UI | `--ease-out` |
| Keyboard / 100+/day animation | Instant state |
| UI duration > 300ms with no reason | 150–250ms |
| Popover origin center | Trigger origin (modals exempt) |
| Keyframes on toasts/toggles | CSS transitions |
| Animate width/height/margin/top | transform / opacity |
| Separate `x` / `y` / `scale` under load | Full `transform` string |
| Ungated `:hover` motion | `@media (hover: hover) and (pointer: fine)` |
| Missing reduced motion | Gentler, not zero |
| Everything at once | 30–80ms stagger, never block input |

## Library

Prefer `framer-motion` (or `motion/react` if already installed). Cheapest tool that works: CSS transition for hover/press; Motion for springs, exits, gestures, `AnimatePresence`, layout animations.

```bash
npm install framer-motion
```

## Reduced motion (always)

```tsx
import { useReducedMotion } from "framer-motion";

const reduce = useReducedMotion();
const fade = reduce
  ? { duration: 0.2 }
  : { duration: 0.2, ease: [0.23, 1, 0.32, 1] };
```

```css
@media (prefers-reduced-motion: reduce) {
  .element {
    animation: fade 0.2s ease;
    /* keep opacity/color; drop transform-based motion */
  }
}

@media (hover: hover) and (pointer: fine) {
  .element:hover {
    transform: scale(1.02);
  }
}
```

## Patterns

### Press (hardware-accelerated)

```tsx
<motion.button
  type="button"
  whileTap={{ transform: "scale(0.97)" }}
  transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
>
  Continue
</motion.button>
```

### Scroll reveal (marketing only, once)

```tsx
<motion.section
  initial={{ opacity: 0, transform: "translateY(12px)" }}
  whileInView={{ opacity: 1, transform: "translateY(0px)" }}
  viewport={{ once: true, amount: 0.2, margin: "-100px" }}
  transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
>
```

Keep `y` at 8–16px. Do not re-animate on every scroll-by.

### Presence (modals stay centered)

```tsx
<AnimatePresence>
  {open && (
    <motion.div
      key="dialog"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0, transform: "scale(0.96)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0.96)" }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
    />
  )}
</AnimatePresence>
```

Exit the same path it entered. Popovers scale from the trigger, not center.

### Variants + stagger

```tsx
const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, transform: "translateY(8px)" },
  show: { opacity: 1, transform: "translateY(0px)" },
};
```

### Layout animations

Use `layout` / `layoutId` for shared-element moves. Animate `transform` and `opacity` only — never layout geometry props under load.

## How to use this card

- Open after `.vpods/FRONTEND_AGENT.md`. Pair with `.vpods/CRAFT_UX.md` and `.vpods/DESIGN_PACK.md` when present.
- On Cursor Cloud there is no `design.motion` tool — this file is the Motion pack.
