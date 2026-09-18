import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/chat.tsx"),
  route("api/chat", "routes/api.chat.ts"),
  route("api/tool-confirm", "routes/api.tool-confirm.ts"),
] satisfies RouteConfig;
