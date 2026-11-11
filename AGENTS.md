<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ShopBoard Next

A small shop: `/` (hero), `/products` (list with search and category filter), `/products/[id]`. Products come from the ShopBoard API; the cart lives in localStorage and opens in a side sheet. Stack: Next.js 16 App Router, React 19, TypeScript (strict), Tailwind 4, shadcn/ui (Base UI) copied into `components/ui`.

## Structure

```
src/
  app/            # routes only: page, layout, loading, error, not-found
  components/     # components that know ShopBoard (Navbar, Hero, ProductGrid, CartButton...)
    ui/           # generic kit: Button, Input, Card, Badge, Modal, Sheet, Skeleton, Container
  lib/            # no UI: api-client.ts (the only fetch), products.ts (API -> app shape), cart.ts, money.ts, theme.ts, utils.ts (cn)
public/products/  # photos: <slug>-hero|card|thumb.webp, slug from the API title
```

- Pages are server components and fetch on the server. `"use client"` only where there is a click handler or state.
- Only `lib/api-client.ts` talks to the API (`API_BASE_URL` overrides the base, e.g. `.../delay/3000` or `.../fail/500` to see loading and error states). Only `lib/products.ts` turns API names into app names.
- `ui/` is dumb: a Button does not know what a cart is. Components that know products live in `components/`.

## Formatting and checks

- Prettier decides the format (`.prettierrc`: semicolons, double quotes, 100 columns). Run `npm run format`; never format by hand.
- Before saying a task is done, run `npm run typecheck`, `npm run lint` and `npm run format:check`. All three must pass.
- No `any` and no non-null `!`. Avoid `as` casts. Type props explicitly, and check data from outside (API, localStorage) before trusting it.

## Rules

1. Semantic HTML: header, nav, main, section, article, footer. One `h1` per page.
2. Buttons are `<button>`. Links are `<Link>` inside the app, `<a href>` outside it.
3. `===`, `const` by default, `let` only when the value changes.
4. Reuse existing functions and components. One meaning, one place.
5. Prices are whole cents everywhere. Only `formatPrice` (`lib/money.ts`) turns them into dollars, when shown.
6. Text from the API goes into JSX as text.
7. localStorage keys start with `shopboard-` and end with a version (`shopboard-cart-v2`). Bump the version when the saved shape changes.
8. Change only what the task asks for.

## UI rules (components/ui)

- **Tokens only.** Every colour, radius and shadow comes from a token in `src/app/globals.css` (`@theme`): `bg-card`, `text-muted-foreground`, `rounded-lg`, `bg-overlay`... Never write hex/rgb/oklch values, `black`/`white`, or arbitrary values like `rounded-[10px]` or `bg-[#fff]` in components. Need a new colour? Add a token first, in light and dark.
- **`cn()` for every `className`.** Import it from `@/lib/utils`, never from `"cn"` directly. Components always accept a `className` prop and put it last in `cn(...)` so callers can override.
- **Variants with `cva`.** Variants and sizes (`variant`, `size`) are defined with `class-variance-authority`. Button: `primary | secondary | ghost`, sizes `sm | md | lg | icon | icon-sm`.
- **No copied class strings.** If the same classes appear in two components, move them to a shared constant (`components/ui/shared.ts`) or a small component. Don't re-type them.
- **Typed props.** Every component has explicit props: `React.ComponentProps<"el">` + `VariantProps<typeof x>`. No `any`, no untyped spreads.
- **Visible focus on every control.** Buttons and inputs use `focusRing` from `components/ui/shared.ts`. Links get it from the global `a:focus-visible` rule. Never `outline-none` without a replacement ring.
- **Accessibility.** Icon-only buttons need `aria-label`. Overlays (modal, sheet) must close with Esc and return focus to the trigger.
- **`"use client"` only** where there is a click handler or state. Pages, layout, Navbar and Footer stay server components.
- **Compose, don't fork.** Build on `Button`, `Card`, `Input`, `Badge` before adding a new component. Use `Container` for page wrappers.
- **Tailwind only.** No CSS files except `globals.css`. Mobile first (`sm:`, `md:`, `lg:`), checked at 360, 768 and 1280px, in light and dark. Dark mode follows the `.dark` class on `<html>`; change token values, never the component.

## Rules from our mistakes

Each rule comes from a bug we made or found. Follow the rule; the reason is there so you can judge new cases.

1. **Key every list item by an id from the data** (`key={product.id}`), never the index. _Why:_ in React ShopBoard an index key moved a saved heart to another product after sorting.
2. **Treat props and state as read-only: copy, then change** (`[...list].sort(...)`, `items.map((i) => ({ ...i, qty }))`). _Why:_ `products.sort()` destroyed the "Featured" order, and `item.qty++` plus `setCart(cart)` gave React the same array, so nothing re-rendered.
3. **Give `&&` a real boolean** (`count > 0 && ...`). _Why:_ `0 && ...` renders a stray "0" on the page.
4. **Pass a ready element instead of passing callbacks down** (`children`, or a render prop for lists). _Why:_ `onAdd` went through four components and two never used it.
5. **Fetch on the server, never in `useEffect`.** Pages `await` their data; `loading.tsx` and `error.tsx` cover the waiting and failing states. _Why:_ the effect + status-union version was replaced entirely by Suspense and error boundaries.
6. **Show only real data.** _Why:_ the old React data file once invented "old prices" for a sale the API never had.
7. **Prove a guard works by tripping it.** _Why:_ the lint config once had the `any`/`as`/`!` rules off and nobody noticed. Write a file with all three and check that lint fails.
8. **Before `shadcn add`, check `components.json` aliases and `paths` in `tsconfig.json`.** _Why:_ without them shadcn wrote a literal `@/` folder and installed an unrelated npm package.

## Tests

Never change *.test.ts or e2e/ to make a test pass. Fix the code, or ask me.
