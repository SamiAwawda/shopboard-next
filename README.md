# ShopBoard (Next.js)

A small shop built with Next.js 16 (App Router), Tailwind 4 and its own UI kit in `components/ui`. It is the Next.js version of the React ShopBoard.

## Pages

| Route            | What it shows                                    |
| ---------------- | ------------------------------------------------ |
| `/`              | Welcome text and a hero carousel of the products |
| `/products`      | Product list with search and category filter     |
| `/products/[id]` | One product. An unknown id shows the 404 page    |

Also: a cart in a side sheet (saved in localStorage), a "Clear cart" confirmation modal, `loading.tsx` skeletons, `error.tsx` with "Try again", and light/dark mode.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Products come from `https://shopboard-api.vercel.app`. To see the loading and error states, set `API_BASE_URL` (and remove it afterwards):

```bash
API_BASE_URL=https://shopboard-api.vercel.app/delay/3000 npm run dev   # slow: shows the skeleton
API_BASE_URL=https://shopboard-api.vercel.app/fail/500 npm run dev     # fails: shows the error page
```

## Checks

```bash
npm run typecheck
npm run lint
npm run format:check   # npm run format fixes it
npm run build
```

## Structure

```
src/
  app/          routes only: page, layout, loading, error, not-found
  components/   components that know ShopBoard (Navbar, Hero, ProductGrid, CartButton...)
    ui/         the generic kit: Button, Input, Card, Badge, Modal, Sheet, Skeleton, Container
  lib/          no UI: api-client (the only fetch), products, cart, money, theme, utils (cn)
public/products photos: <slug>-hero|card|thumb.webp
```

## Design system

- Colours, radius and shadows are tokens in `src/app/globals.css` (`@theme`), in light and dark. Components never use hex values or arbitrary values.
- `cn()` (from `@/lib/utils`) for every `className`; variants with `cva`; typed props.
- Tailwind only: no CSS files except `globals.css`.
- The full rules are in [`AGENTS.md`](./AGENTS.md) (imported by `CLAUDE.md`), so AI coding tools follow them too.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui on Base UI, class-variance-authority, lucide-react, Prettier, ESLint.
