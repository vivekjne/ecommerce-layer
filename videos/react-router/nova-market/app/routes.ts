import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/shop-layout.tsx", [
    index("routes/home.tsx"),
    route("products", "routes/products.tsx"),
    route("products/:slug", "routes/product.tsx"),
    route("cart", "routes/cart.tsx"),
    route("checkout", "routes/checkout.tsx"),
    route("order/:id", "routes/order.tsx"),
    route("login", "routes/login.tsx"),
    route("about", "routes/about.tsx"),
    ...prefix("account", [
      layout("routes/account-layout.tsx", [
        index("routes/account-orders.tsx"),
        route("settings", "routes/account-settings.tsx"),
      ]),
    ]),
    route("*", "routes/not-found.tsx"),
  ]),
  // resource routes: no default export, so no UI
  route("logout", "routes/logout.ts"),
  route("search", "routes/search.ts"),
  route("api/products.json", "routes/api-products.ts"),
  route("invoices/:id", "routes/invoice.ts"),
  route("webhooks/payments", "routes/webhook.ts"),
] satisfies RouteConfig;
