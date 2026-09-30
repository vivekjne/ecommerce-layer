import { Link, useFetcher } from "react-router";
import type { loader } from "~/routes/search";

export function SearchBox() {
  const fetcher = useFetcher<typeof loader>();
  const results = fetcher.data ?? [];
  const dimmed = fetcher.state !== "idle";

  function search(q: string) {
    fetcher.load(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search products"
        className="w-56 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm"
        onChange={(e) => search(e.currentTarget.value)}
      />
      {results.length > 0 && (
        <ul
          className={
            "absolute right-0 top-10 z-20 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl " +
            (dimmed ? "opacity-50" : "")
          }
        >
          {results.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/products/${p.slug}`}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-indigo-50"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
