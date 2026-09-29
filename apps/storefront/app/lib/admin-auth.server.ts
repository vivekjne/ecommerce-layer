import { createHash, timingSafeEqual } from "node:crypto";
import { createCookieSessionStorage, redirect, type SessionStorage } from "react-router";

const isProduction = process.env.NODE_ENV === "production";

/** Dev-only fallback so the admin works out of the box locally. Never used in production. */
export const DEV_ADMIN_PASSWORD = "admin";

function adminPassword(): string | null {
  return process.env.ADMIN_PASSWORD || (isProduction ? null : DEV_ADMIN_PASSWORD);
}

function sessionSecret(): string | null {
  return process.env.SESSION_SECRET || (isProduction ? null : "dev-only-insecure-session-secret");
}

/** Why the admin can't be used right now, or null when it's configured. */
export function adminConfigError(): string | null {
  if (!adminPassword()) return "The admin is disabled: set ADMIN_PASSWORD to enable it.";
  if (!sessionSecret()) return "The admin is disabled: set SESSION_SECRET to enable it.";
  return null;
}

let storage: SessionStorage | undefined;

function getStorage(): SessionStorage {
  const secret = sessionSecret();
  if (!secret) throw new Response(adminConfigError(), { status: 503 });
  storage ??= createCookieSessionStorage({
    cookie: {
      name: "__admin_session",
      httpOnly: true,
      // Strict: admin mutations are plain form POSTs, so this is the CSRF defense.
      sameSite: "strict",
      secure: isProduction,
      // Not "/admin": React Router fetches the /admin page's data from /admin.data,
      // which falls outside a "/admin" cookie path and would loop back to login.
      path: "/",
      secrets: [secret],
      maxAge: 60 * 60 * 8,
    },
  });
  return storage;
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function passwordMatches(candidate: string): boolean {
  const expected = adminPassword();
  if (!expected) return false;
  return timingSafeEqual(digest(candidate), digest(expected));
}

function safeRedirectTarget(value: string | null): string {
  return value && value.startsWith("/admin") && !value.startsWith("//") ? value : "/admin";
}

/** Call from every admin loader and action — child loaders run in parallel with the layout's, so a layout-only check doesn't protect them. */
export async function requireAdmin(request: Request): Promise<void> {
  const session = await getStorage().getSession(request.headers.get("Cookie"));
  if (session.get("admin") === true) return;
  const url = new URL(request.url);
  throw redirect(`/admin/login?redirectTo=${encodeURIComponent(url.pathname + url.search)}`);
}

export async function isAdmin(request: Request): Promise<boolean> {
  if (adminConfigError()) return false;
  const session = await getStorage().getSession(request.headers.get("Cookie"));
  return session.get("admin") === true;
}

export async function startAdminSession(request: Request, redirectTo: string | null): Promise<Response> {
  const store = getStorage();
  const session = await store.getSession(request.headers.get("Cookie"));
  session.set("admin", true);
  return redirect(safeRedirectTarget(redirectTo), { headers: { "Set-Cookie": await store.commitSession(session) } });
}

export async function endAdminSession(request: Request): Promise<Response> {
  const store = getStorage();
  const session = await store.getSession(request.headers.get("Cookie"));
  return redirect("/admin/login", { headers: { "Set-Cookie": await store.destroySession(session) } });
}
