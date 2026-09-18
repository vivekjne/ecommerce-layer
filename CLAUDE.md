# Unified Commerce Layer — CLAUDE.md

A hackathon project: a normalized, AI-native headless commerce layer over
Shopify and BigCommerce, exposed as a REST API, an MCP server, and an AI
shopping chat storefront.

## Monorepo layout

```
packages/
  core/                  normalized types, adapter interfaces, tool schemas,
                         system prompt — the shared contract every other
                         package is written against
  adapter-mock/          in-memory CommerceAdapter + MerchantAdapter, seeded
                         from fixture data — demo fallback, also the
                         reference implementation for the contract tests
  adapter-shopify/       CommerceAdapter via Storefront API,
                         MerchantAdapter via Admin GraphQL API
  adapter-bigcommerce/   same shape, against BigCommerce's APIs
apps/
  api/                   REST API returning normalized JSON, backed by
                         whichever adapter getAdapters() resolves to
  mcp/                   MCP server exposing packages/core/src/tools.ts
                         schemas as MCP tools, calling an adapter directly
  storefront/            React Router (framework mode) app with an AI
                         shopping chat: Vercel AI SDK + Claude API,
                         packages/core/src/systemPrompt.ts, and the same
                         tool schemas
```

Tooling: pnpm workspaces, Turborepo, TypeScript strict, Vitest.

## Hard rules

1. **No platform API calls outside `packages/adapter-*`.** `apps/api`,
   `apps/mcp`, and `apps/storefront` only ever call a `CommerceAdapter` /
   `MerchantAdapter`. If you're writing a `fetch()` to `myshopify.com` or
   a BigCommerce API host anywhere else, stop — it belongs in an adapter.

2. **Money is always an integer in minor units** (`{ amount: number,
   currencyCode: string }`, e.g. `1999` for $19.99). Never a float dollar
   amount, anywhere — types, adapters, API responses, UI props before
   formatting.

3. **Pagination is cursor-based**, using `Connection<T>` / `PageInfo` from
   `packages/core/src/types.ts`. No offset/page-number pagination.

4. **Tool schemas live only in `packages/core/src/tools.ts`.** `apps/mcp`
   and `apps/storefront` import them; they do not redeclare or fork a
   parallel Zod schema for the same operation.

5. **Write actions require human confirmation in the UI.**
   `add_to_cart`, `update_cart_line`, `remove_from_cart`,
   `create_checkout`, and any future price-mutating merchant action are
   never auto-executed off a model tool call. The tool call proposes the
   action; a confirmation UI (`ConfirmCard` in the storefront, the
   equivalent in any MCP client) gates the actual adapter call. See
   `WRITE_TOOL_NAMES` in `tools.ts`.

## Fixed contract files

`packages/core/src/types.ts`, `adapter.ts`, `tools.ts`, and
`systemPrompt.ts` are the shared contract every adapter and app is written
against. Treat them as fixed: if one needs to change, say why before
editing it, since downstream code across the team depends on the current
shapes.

## Conventions

- TypeScript strict mode everywhere; no `any` without a comment explaining
  why it's unavoidable.
- Adapters are judged against `packages/core/test/contract.ts` — a
  reusable Vitest suite exported as a function taking a `CommerceAdapter`
  + `MerchantAdapter`. A new adapter isn't done until it passes this
  suite.
- IDs returned by an adapter are opaque strings from that adapter's own
  namespace; nothing outside the adapter parses or constructs them.
- Prefer small, reviewable diffs. Don't scaffold app code ahead of the
  step that needs it.
