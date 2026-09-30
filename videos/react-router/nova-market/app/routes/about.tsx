import type { Route } from "./+types/about";

// no loader data needed: this page is pre-rendered at build time
export default function About(_: Route.ComponentProps) {
  return (
    <div className="max-w-xl">
      <title>About | Nova Market</title>
      <h1 className="text-3xl font-black">About Nova Market</h1>
      <p className="mt-3 text-slate-600">
        We sell a small range of everyday things, made to last.
      </p>
    </div>
  );
}
