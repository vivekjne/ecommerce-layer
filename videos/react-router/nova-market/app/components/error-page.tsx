export function ErrorPage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <main className="mx-auto max-w-xl p-12 text-center">
      <h1 className="text-5xl font-black text-indigo-600">
        {title}
      </h1>
      <p className="mt-2 text-xl text-slate-700">{message}</p>
      <a
        href="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white"
      >
        Back to the shop
      </a>
    </main>
  );
}
