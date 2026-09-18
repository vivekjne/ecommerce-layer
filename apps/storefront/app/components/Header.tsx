import { Link, NavLink } from "react-router";
import { CartIcon } from "./icons.js";

export function Header({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">A</span>
          Acme Shop
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400 sm:flex">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "text-neutral-900 dark:text-neutral-100" : "hover:text-neutral-900 dark:hover:text-neutral-100")}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "text-neutral-900 dark:text-neutral-100" : "hover:text-neutral-900 dark:hover:text-neutral-100")}>
            Shop
          </NavLink>
        </nav>

        <Link
          to="/cart"
          aria-label="View cart"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
        >
          <CartIcon className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
