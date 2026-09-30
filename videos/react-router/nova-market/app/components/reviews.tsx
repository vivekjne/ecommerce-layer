import type { Review } from "~/lib/types";

export function ReviewsSkeleton() {
  return (
    <div className="mt-3 animate-pulse rounded-xl bg-slate-200 p-6 text-slate-500">
      Loading reviews...
    </div>
  );
}

export function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <ul className="mt-3 space-y-3">
      {reviews.map((r) => (
        <li
          key={r.author}
          className="rounded-xl border border-slate-200 bg-white p-4"
        >
          <p className="font-bold">
            {r.author}{" "}
            <span className="text-amber-500">
              {"★".repeat(r.stars)}
            </span>
          </p>
          <p className="text-slate-600">{r.text}</p>
        </li>
      ))}
    </ul>
  );
}
