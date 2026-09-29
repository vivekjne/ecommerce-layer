import { Form, Link, NavLink, Outlet } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { requireNativeBackend } from "../lib/adapters.js";
import { requireAdmin } from "../lib/admin-auth.server.js";
import { SITE_NAME } from "../lib/seo.js";

export async function loader({ request }: LoaderFunctionArgs) {
  requireNativeBackend();
  await requireAdmin(request);
  return null;
}

export const meta: MetaFunction = () => [{ title: `Admin — ${SITE_NAME}` }, { name: "robots", content: "noindex, nofollow" }];

const NAV = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/orders", label: "Orders", end: false },
  { to: "/admin/products", label: "Products", end: false },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <Link to="/admin" className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            {SITE_NAME} <span className="font-medium text-neutral-400">Admin</span>
          </Link>
          <nav aria-label="Admin" className="flex gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <a href="/" className="text-neutral-600 hover:underline dark:text-neutral-400">
              View store
            </a>
            <Form method="post" action="/admin/logout">
              <button type="submit" className="font-medium text-neutral-900 hover:underline dark:text-neutral-100">
                Sign out
              </button>
            </Form>
          </div>
        </div>
      </header>
      <main id="admin-main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
