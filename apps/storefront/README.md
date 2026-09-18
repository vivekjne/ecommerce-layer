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
