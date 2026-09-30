import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { getSession } from "./sessions.server";
import { users } from "./db.server";
import { ErrorPage } from "./components/error-page";
import "./app.css";

// Runs on the server before and after every request.
const loggingMiddleware: Route.MiddlewareFunction = async (
  { request },
  next,
) => {
  const start = performance.now();
  const response = await next();
  const ms = Math.round(performance.now() - start);
  const { pathname } = new URL(request.url);
  console.log(
    `${request.method} ${pathname} ${response.status} ${ms}ms`,
  );
  return response;
};
export const middleware = [loggingMiddleware];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie"),
  );
  const cart = session.get("cart") ?? {};
  const user = users.find(
    (u) => u.id === session.get("userId"),
  );
  return {
    cartCount: Object.values(cart).reduce(
      (sum, qty) => sum + qty,
      0,
    ),
    userName: user?.name ?? null,
  };
}

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({
  error,
}: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    const message = error.data || error.statusText;
    return (
      <ErrorPage
        title={String(error.status)}
        message={message}
      />
    );
  }
  if (error instanceof Error) {
    return (
      <ErrorPage
        title="Something broke"
        message={error.message}
      />
    );
  }
  return (
    <ErrorPage title="Unknown error" message="Try again" />
  );
}
