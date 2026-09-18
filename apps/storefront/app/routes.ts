import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("products/:handle", "routes/products.$handle.tsx"),
  route("cart", "routes/cart.tsx"),
  route("api/chat", "routes/api.chat.ts"),
  route("api/tool-confirm", "routes/api.tool-confirm.ts"),
  route("api/cart", "routes/api.cart.ts"),
] satisfies RouteConfig;
