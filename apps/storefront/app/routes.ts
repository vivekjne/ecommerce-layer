import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("products/:handle", "routes/products.$handle.tsx"),
  route("cart", "routes/cart.tsx"),
  route("checkout/:checkoutId", "routes/checkout.$checkoutId.tsx"),
  route("orders/:orderId", "routes/orders.$orderId.tsx"),
  route("admin/login", "routes/admin.login.tsx"),
  route("admin/logout", "routes/admin.logout.ts"),
  route("admin", "routes/admin.tsx", [
    index("routes/admin._index.tsx"),
    route("orders", "routes/admin.orders.tsx"),
    route("orders/:orderId", "routes/admin.orders.$orderId.tsx"),
    route("products", "routes/admin.products.tsx"),
    route("products/new", "routes/admin.products.new.tsx"),
    route("products/:productId", "routes/admin.products.$productId.tsx"),
  ]),
  route("api/chat", "routes/api.chat.ts"),
  route("api/tool-confirm", "routes/api.tool-confirm.ts"),
  route("api/cart", "routes/api.cart.ts"),
  route("robots.txt", "routes/robots.txt.ts"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
  route("llms.txt", "routes/llms.txt.ts"),
] satisfies RouteConfig;
