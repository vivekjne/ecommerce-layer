import type { Route } from "./+types/account-settings";
import { userContext } from "~/context";

export async function loader({ context }: Route.LoaderArgs) {
  return { email: context.get(userContext)?.email };
}

export default function AccountSettings({
  loaderData,
}: Route.ComponentProps) {
  return (
    <p className="text-slate-600">
      Signed in as <b>{loaderData.email}</b>
    </p>
  );
}
