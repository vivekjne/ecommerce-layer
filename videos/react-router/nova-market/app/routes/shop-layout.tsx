import {
  Link,
  NavLink,
  type NavLinkRenderProps,
  Outlet,
  useFetchers,
  useMatches,
  useNavigation,
  useRouteLoaderData,
} from "react-router";
import type { loader as rootLoader } from "~/root";
import { SearchBox } from "~/components/search-box";

function ProgressBar() {
  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-2/3 bg-gradient-to-r from-pink-500 to-indigo-600 transition-all duration-500" />
  );
}

export default function ShopLayout() {
  const navigation = useNavigation();
  const root = useRouteLoaderData<typeof rootLoader>("root");
  // fetchers that are adding to the cart right now
  const pendingAdds = useFetchers().filter(
    (f) => f.formData?.get("intent") === "add",
  ).length;
  const isNavigating = navigation.state !== "idle";
  // each route can describe itself in `handle`
  const crumbs = useMatches().flatMap((m) =>
    (m.handle as { breadcrumb?: string } | undefined)
      ?.breadcrumb
      ? [m.handle as { breadcrumb: string }]
      : [],
  );

  const link = ({ isActive, isPending }: NavLinkRenderProps) =>
    "rounded-full px-3 py-1 text-sm font-semibold " +
    (isActive
      ? "bg-indigo-600 text-white"
      : isPending
        ? "bg-indigo-100 text-indigo-700"
        : "text-slate-700 hover:bg-slate-100");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {isNavigating && <ProgressBar />}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-3">
          <Link
            to="/"
            className="text-xl font-black tracking-tight text-indigo-700"
          >
            Nova<span className="text-pink-500">Market</span>
          </Link>
          <nav className="flex gap-1">
            <NavLink to="/" end className={link}>
              Home
            </NavLink>
            <NavLink to="/products" className={link}>
              Products
            </NavLink>
            <NavLink to="/account" className={link}>
              Account
            </NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <SearchBox />
            <Link
              to="/cart"
              className="relative rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white"
            >
              Cart
              <span className="ml-2 rounded-full bg-pink-500 px-2 py-0.5 text-xs">
                {(root?.cartCount ?? 0) + pendingAdds}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        {crumbs.length > 0 && (
          <p className="mb-4 text-sm text-slate-500">
            Nova Market /{" "}
            {crumbs.map((c) => c.breadcrumb).join(" / ")}
          </p>
        )}
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Nova Market ·{" "}
        <Link to="/about" className="underline">
          About
        </Link>
      </footer>
    </div>
  );
}
