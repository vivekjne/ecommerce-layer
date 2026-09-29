import { redirect, type ActionFunctionArgs } from "react-router";
import { endAdminSession } from "../lib/admin-auth.server.js";

export async function action({ request }: ActionFunctionArgs) {
  return endAdminSession(request);
}

export function loader() {
  return redirect("/admin");
}
