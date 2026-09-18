# @commerce/chat-sdk

The AI shopping chat, packaged as an SDK a storefront (or any other host
app) mounts rather than owns. Built once against `packages/core`'s
`CommerceAdapter` and tool schemas, reusable anywhere.

## Server (`@commerce/chat-sdk`)

```ts
import { handleChatRequest, handleToolConfirmRequest } from "@commerce/chat-sdk";

// resource route backing the chat stream
export async function action({ request }: ActionFunctionArgs) {
  return handleChatRequest({ request, commerce, cartId: currentCartIdFromSession });
}

// resource route that runs a confirmed write tool
export async function action({ request }: ActionFunctionArgs) {
  return handleToolConfirmRequest({ request, commerce, defaultCartId: currentCartIdFromSession });
}
```

Both take a plain `Request` and return a plain `Response` — no framework
coupling. `cartId`/`defaultCartId` let a host app that already has a cart
session going hand it to the chat, so "add this to my cart" lands in the
same cart as the rest of the site instead of a new one the model doesn't
know about.

## React (`@commerce/chat-sdk/react`)

```tsx
import { ChatWidget } from "@commerce/chat-sdk/react";

// mounted once, outside <Outlet/>, so it survives route navigation
<ChatWidget onCartChanged={() => revalidateCartBadge()} />
```

`ChatWidget` is the floating bubble + slide-over panel: composer, message
rendering, and `ConfirmCard`/`ProductCards`/`CartPreview` for tool
results, all wired to `useShopChat` (a thin wrapper around
`@ai-sdk/react`'s `useChat` with the transport and multi-step
auto-resubmit behavior pre-configured). Use `useShopChat` and the
individual components directly if a host app wants its own chrome instead
of the prebuilt widget.

## Write-tool confirmation

`add_to_cart`, `update_cart_line`, `remove_from_cart`, and
`create_checkout` have no `execute` in `createShopperTools` — the model
can only propose them. `ChatWidget` renders that proposal as
`ConfirmCard`; only an explicit Confirm click reaches
`handleToolConfirmRequest` and therefore `CommerceAdapter`. This is the
same rule CLAUDE.md states for the whole project, just enforced inside
the SDK so every host app gets it for free.
