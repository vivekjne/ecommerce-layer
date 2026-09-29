import { Form, redirect, useActionData, useLoaderData, useNavigation, useSearchParams } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "react-router";
import { TextField } from "../components/Field.js";
import { requireNativeBackend } from "../lib/adapters.js";
import { adminConfigError, DEV_ADMIN_PASSWORD, isAdmin, passwordMatches, startAdminSession } from "../lib/admin-auth.server.js";
import { SITE_NAME } from "../lib/seo.js";

export async function loader({ request }: LoaderFunctionArgs) {
  requireNativeBackend();
  if (await isAdmin(request)) throw redirect("/admin");
  const usingDevPassword = process.env.NODE_ENV !== "production" && !process.env.ADMIN_PASSWORD;
  return { configError: adminConfigError(), devHint: usingDevPassword ? DEV_ADMIN_PASSWORD : null };
}

export async function action({ request }: ActionFunctionArgs) {
  requireNativeBackend();
  if (adminConfigError()) return Response.json({ error: adminConfigError() }, { status: 503 });
  const form = await request.formData();
  if (!passwordMatches(String(form.get("password") ?? ""))) {
    return Response.json({ error: "Incorrect password." }, { status: 401 });
  }
  return startAdminSession(request, new URL(request.url).searchParams.get("redirectTo"));
}

export const meta: MetaFunction = () => [{ title: `Admin sign in — ${SITE_NAME}` }, { name: "robots", content: "noindex, nofollow" }];

export default function AdminLogin() {
  const { configError, devHint } = useLoaderData<typeof loader>();
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 dark:bg-neutral-950">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{SITE_NAME} admin</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Sign in to manage orders and products.</p>

        {configError ? (
          <p role="alert" className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            {configError}
          </p>
        ) : (
          <Form method="post" action={`/admin/login?${searchParams.toString()}`} className="mt-5 space-y-4">
            <TextField label="Password" name="password" type="password" autoComplete="current-password" required autoFocus error={actionData?.error} />
            {devHint ? (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Local dev: the password is <code className="font-mono">{devHint}</code> until ADMIN_PASSWORD is set.
              </p>
            ) : null}
            <button
              type="submit"
              disabled={navigation.state !== "idle"}
              className="w-full rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-neutral-900"
            >
              Sign in
            </button>
          </Form>
        )}
      </div>
    </main>
  );
}
