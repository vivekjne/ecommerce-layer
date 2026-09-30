import { Form, NavLink, Outlet, redirect } from "react-router";
import type { Route } from "./+types/account-layout";
import { getSession } from "~/sessions.server";
import { users } from "~/db.server";
import { userContext } from "~/context";

// runs before every loader and action inside /account
const authMiddleware: Route.MiddlewareFunction = async ({
  request,
  context,
}) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = users.find((u) => u.id === session.get("userId"));
  if (!user) throw redirect("/login");
  context.set(userContext, {
    id: user.id,
    email: user.email,
    name: user.name,
  });
};
export const middleware = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  return { user: context.get(userContext) };
}

export default function AccountLayout({
  loaderData,
}: Route.ComponentProps) {
  const tab = ({ isActive }: { isActive: boolean }) =>
    "rounded-full px-3 py-1 text-sm font-semibold " +
    (isActive ? "bg-indigo-600 text-white" : "bg-slate-100");
  return (
    <div>
      <title>Account | Nova Market</title>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">
          Hi, {loaderData.user?.name}
        </h1>
        <Form method="post" action="/logout">
          <button className="text-sm text-slate-600 underline">
            Log out
          </button>
        </Form>
      </div>
      <nav className="mt-4 flex gap-2">
        <NavLink to="/account" end className={tab}>
          Orders
        </NavLink>
        <NavLink to="/account/settings" className={tab}>
          Settings
        </NavLink>
      </nav>
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
