# apps/storefront

React Router 7 (framework mode, classic SSR — not RSC) storefront with an
AI shopping chat: Vercel AI SDK `streamText` (`@ai-sdk/anthropic`),
`STOREFRONT_SYSTEM_PROMPT`, and the shared shopper tools from
`packages/core/src/tools.ts`, wired to `@commerce/adapter-mock`.

## Run it

```
export ANTHROPIC_API_KEY=sk-ant-...
pnpm --filter @commerce/storefront dev
```

Then open the printed localhost URL. The one route (`/`) is the chat UI.

## How write actions are gated

`app/lib/tools.ts` builds two things from the same tool schemas:

- `createShopperTools` — the tool set the model sees. Read tools
  (`search_products`, `get_product`, `get_cart`) carry an `execute` and
  run immediately. Write tools (`add_to_cart`, `update_cart_line`,
  `remove_from_cart`, `create_checkout`) deliberately have **no**
  `execute` — `streamText` stops after emitting the call instead of
  running it.
- `createWriteToolExecutors` — the real adapter calls, only reachable via
  `POST /api/tool-confirm`.

The chat route renders a pending write-tool call as `ConfirmCard`
(`app/components/ConfirmCard.tsx`). Only clicking Confirm hits
`/api/tool-confirm`; the result is fed back into the conversation with
`addToolOutput`, which is what actually reaches `CommerceAdapter`.
Clicking Cancel feeds back an `output-error` instead — nothing is called.

## Routes

- `routes/chat.tsx` — the chat UI (`useChat` from `@ai-sdk/react`).
- `routes/api.chat.ts` — resource route backing `useChat`'s
  `DefaultChatTransport`; runs `streamText` and returns
  `toUIMessageStreamResponse()`.
- `routes/api.tool-confirm.ts` — resource route that runs a confirmed
  write tool's adapter call and nothing else.

## Verified without a live model call

This environment has no `ANTHROPIC_API_KEY`, so the model call itself is
untested here. Everything else was checked against the running dev
server: SSR renders the chat shell, `sendMessage` → `/api/chat` →
`streamText` → missing-key error surfaces in the UI as a dismissable
error banner (server didn't crash), and `/api/tool-confirm` round-trips a
real `add_to_cart` call against the mock adapter.
