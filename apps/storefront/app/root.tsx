import { ChatWidget } from "@commerce/chat-sdk/react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "react-router";
import stylesheet from "./app.css?url";
import { Footer } from "./components/Footer.js";
import { Header } from "./components/Header.js";
import { getAdapters } from "./lib/adapters.js";
import { getCartId } from "./lib/cart-cookie.js";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { commerce } = getAdapters();
  const cartId = await getCartId(request);
  const cart = cartId ? await commerce.getCart(cartId) : null;
  const cartCount = cart ? cart.lines.reduce((sum, line) => sum + line.quantity, 0) : 0;
  return { cartCount };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Acme Shop</title>
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
  const { cartCount } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <Header cartCount={cartCount} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* The chat's own cart writes go through a plain fetch, not a React Router
          action, so the header's cart count needs an explicit nudge to refresh. */}
      <ChatWidget onCartChanged={() => revalidator.revalidate()} />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : "Unknown error";
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-8 dark:bg-neutral-950">
      <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Something went wrong</h1>
        <pre className="mt-2 overflow-x-auto text-sm text-neutral-500 dark:text-neutral-400">{message}</pre>
      </div>
    </div>
  );
}
