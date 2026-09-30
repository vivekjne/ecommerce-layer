import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import { getSession } from "./sessions.server";
import { users } from "./db.server";
import "./app.css";

// Runs on the server before and after every request.
const loggingMiddleware: Route.MiddlewareFunction = async ({ request }, next) => {
  const start = performance.now();
  const response = await next();
  console.log(`${request.method} ${new URL(request.url).pathname} ${response.status} ${Math.round(performance.now() - start)}ms`);
  return response;
};
export const middleware: Route.MiddlewareFunction[] = [loggingMiddleware];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = session.get("cart") ?? {};
  const user = users.find((u) => u.id === session.get("userId"));
  return {
    cartCount: Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    userName: user?.name ?? null,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <main className="mx-auto max-w-xl p-12 text-center">
        <h1 className="text-6xl font-black text-indigo-600">{error.status}</h1>
        <p className="mt-2 text-xl text-slate-700">{error.data || error.statusText}</p>
        <a href="/" className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">Back to the shop</a>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-xl p-12 text-center">
      <h1 className="text-3xl font-black text-rose-600">Something went wrong</h1>
      <p className="mt-2 text-slate-700">{error instanceof Error ? error.message : "Unknown error"}</p>
    </main>
  );
}
