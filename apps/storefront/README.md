# apps/storefront

A full ecommerce storefront on React Router 7 (framework mode, classic
SSR — not RSC), backed by `@commerce/adapter-mock`. The AI shopping chat
is a floating widget from `@commerce/chat-sdk`, not this app's own code —
see `packages/chat-sdk/README.md` for how that SDK boundary works.

## Run it

```
export ANTHROPIC_API_KEY=sk-ant-...
pnpm --filter @commerce/storefront dev
```

## Pages

- `/` — home: hero, category tiles, featured products
- `/products` — catalog: search, category filter, cursor-paginated "Load more"
- `/products/:handle` — product detail: variant selection, quantity, Add to Cart
- `/cart` — cart: quantity/remove controls, checkout handoff

## Cart session

A `cart_id` cookie (`app/lib/cart-cookie.ts`, unsigned — a mock cart id
isn't sensitive) ties a shopper's direct storefront actions and their chat
conversation to the *same* cart:

- `routes/api.cart.ts` — direct, human-clicked mutations (PDP's Add to
  Cart, the cart page's steppers/remove/checkout). These execute
  immediately; the click itself is the confirmation.
- `routes/api.chat.ts` / `routes/api.tool-confirm.ts` — thin wrappers
  around `@commerce/chat-sdk`'s `handleChatRequest` /
  `handleToolConfirmRequest`, passing the same cookie's cart id through so
  "add this to my cart" in the chat lands in the cart the shopper's
  already looking at, and a newly-created cart from a chat action gets
  written back to the cookie.

## Write-action gating

Direct storefront clicks (Add to Cart, quantity steppers, checkout) are
normal ecommerce UI — the human's click is the confirmation, so
`api.cart.ts` runs them immediately. The chat's proposed writes are
different: nobody clicked a specific button, a model decided to call a
tool, so those go through `ConfirmCard` first. Both paths end up calling
the same `CommerceAdapter` methods; only the gating differs. See
CLAUDE.md rule 5.

## Verified without a live model call

This environment has no `ANTHROPIC_API_KEY`, so the chat's model call
itself is untested here. Everything else was checked against the running
dev server with a headless browser: home → catalog → PDP → add to cart →
cart page → quantity update → checkout handoff → chat widget open, in
both light and dark mode, with no console errors.

## E2E tests

```
pnpm --filter @commerce/storefront test:e2e       # headless
pnpm --filter @commerce/storefront test:e2e:ui     # Playwright UI mode
```

`playwright.config.ts` starts its own dev server on port 5183
(`webServer`), so these don't need one already running. Coverage is the
deterministic, non-LLM parts of the app — the pieces that don't need an
`ANTHROPIC_API_KEY` and won't flake on a real model's output:

- `e2e/home.spec.ts` — hero/category tiles/featured products, category
  tile navigation, chat bubble present on every page
- `e2e/catalog.spec.ts` — search, category filter, cursor-paginated "Load more"
- `e2e/pdp.spec.ts` — variant selection, unknown-handle 404, Add to Cart
  updating both the button and the header cart badge
- `e2e/cart.spec.ts` — empty state, quantity/remove controls with live
  total recalculation, checkout handoff
- `e2e/chat-widget.spec.ts` — open/close, persistence across client-side
  navigation (it's mounted once in `root.tsx`), a suggestion chip sending
  a user message

None of these depend on a real Claude response — they only exercise the
parts that don't require one, so they can run in CI without a key and
stay meaningful regression coverage as the storefront changes.
