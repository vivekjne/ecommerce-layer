import { Link } from "react-router";

export function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-10 text-center">
      <h1 className="text-2xl font-black text-rose-700">
        {message}
      </h1>
      <Link
        to="/products"
        className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white"
      >
        Browse all products
      </Link>
    </div>
  );
}
