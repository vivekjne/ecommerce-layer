import type { Route } from "./+types/webhook";

// POST, PUT, PATCH, DELETE go to the action
export async function action({ request }: Route.ActionArgs) {
  const event = await request.json();
  console.log("payment event", event.type);
  return Response.json({ received: true });
}
