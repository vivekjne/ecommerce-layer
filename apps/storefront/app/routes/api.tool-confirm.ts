import { WRITE_TOOL_NAMES, type ToolName } from "@commerce/core";
import type { ActionFunctionArgs } from "react-router";
import { getAdapters } from "../lib/adapters.js";
import { createWriteToolExecutors } from "../lib/tools.js";

interface ToolConfirmBody {
  tool: string;
  input: unknown;
}

/**
 * Runs a write tool's adapter call, and only this call — the model can
 * propose add_to_cart/update_cart_line/remove_from_cart/create_checkout,
 * but nothing reaches CommerceAdapter until the shopper approves the
 * ConfirmCard in the UI and this endpoint is hit.
 */
export async function action({ request }: ActionFunctionArgs) {
  const body = (await request.json()) as ToolConfirmBody;

  if (!WRITE_TOOL_NAMES.has(body.tool as ToolName)) {
    return Response.json({ error: `Not a write tool: ${body.tool}` }, { status: 400 });
  }

  const { commerce } = getAdapters();
  const executors = createWriteToolExecutors(commerce);
  const run = executors[body.tool as keyof typeof executors] as (input: unknown) => Promise<unknown>;

  try {
    const output = await run(body.input);
    return Response.json({ output });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 400 });
  }
}
