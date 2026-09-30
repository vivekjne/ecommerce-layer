import { data, Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { commitSession, getSession } from "~/sessions.server";
import { users } from "~/db.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie"),
  );
  if (session.has("userId")) throw redirect("/account");
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const user = users.find(
    (u) =>
      u.email === form.get("email") &&
      u.password === form.get("password"),
  );
  if (!user)
    return data(
      { error: "Wrong email or password" },
      { status: 401 },
    );

  const session = await getSession(
    request.headers.get("Cookie"),
  );
  session.set("userId", user.id);
  return redirect("/account", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Login({
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="mx-auto max-w-sm">
      <title>Log in | Nova Market</title>
      <h1 className="text-3xl font-black">Log in</h1>
      <Form method="post" className="mt-6 space-y-4">
        <input
          name="email"
          placeholder="Email"
          defaultValue="sam@example.com"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          defaultValue="password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        {actionData?.error && (
          <p className="text-rose-600">{actionData.error}</p>
        )}
        <button className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white">
          Log in
        </button>
      </Form>
    </div>
  );
}
