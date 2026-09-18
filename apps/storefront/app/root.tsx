import { Links, Meta, Outlet, Scripts, ScrollRestoration, type LinksFunction } from "react-router";
import stylesheet from "./app.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Commerce Layer Chat</title>
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

export function ErrorBoundary({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : "Unknown error";
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Something went wrong</h1>
      <pre>{message}</pre>
    </div>
  );
}
