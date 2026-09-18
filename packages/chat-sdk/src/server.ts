import { STOREFRONT_SYSTEM_PROMPT, WRITE_TOOL_NAMES, type CommerceAdapter, type ToolName } from "@commerce/core";
import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, stepCountIs, type LanguageModel, type UIMessage } from "ai";
import { createShopperTools, createWriteToolExecutors } from "./tools.js";

export interface HandleChatRequestOptions {
  request: Request;
  commerce: CommerceAdapter;
  /** Overrides STOREFRONT_SYSTEM_PROMPT from packages/core — useful for a host app with its own brand voice. */
  systemPrompt?: string;
  /** Overrides the default `anthropic(ANTHROPIC_MODEL ?? "claude-sonnet-5")` model. */
  model?: LanguageModel;
  /**
   * The shopper's current cart id, if the host app already has one going
   * (e.g. from a session cookie). Told to the model as context so it calls
   * get_cart/add_to_cart against the right cart instead of a blind guess.
   */
  cartId?: string;
}

export async function handleChatRequest({ request, commerce, systemPrompt, model, cartId }: HandleChatRequestOptions): Promise<Response> {
  const { messages } = (await request.json()) as { messages: UIMessage[] };

  const system = [
    systemPrompt ?? STOREFRONT_SYSTEM_PROMPT,
    cartId
      ? `\n\nThe shopper already has a cart going (cartId: ${cartId}). Use it for get_cart and add_to_cart calls instead of guessing or leaving cartId empty.`
      : "\n\nThe shopper has no cart yet. Omit cartId on the first add_to_cart call and one will be created.",
  ].join("");

  const result = streamText({
    model: model ?? anthropic(process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5"),
    system,
    messages: await convertToModelMessages(messages),
    tools: createShopperTools(commerce),
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}

export interface HandleToolConfirmRequestOptions {
  request: Request;
  commerce: CommerceAdapter;
  /** See WriteToolExecutorOptions.defaultCartId — same session-continuity fallback for add_to_cart. */
  defaultCartId?: string;
}

interface ToolConfirmBody {
  tool: string;
  input: unknown;
}

/**
 * Runs a write tool's adapter call, and only this call — the model can
 * propose add_to_cart/update_cart_line/remove_from_cart/create_checkout,
 * but nothing reaches CommerceAdapter until the host app's UI confirms it
 * and calls this.
 */
export async function handleToolConfirmRequest({ request, commerce, defaultCartId }: HandleToolConfirmRequestOptions): Promise<Response> {
  const body = (await request.json()) as ToolConfirmBody;

  if (!WRITE_TOOL_NAMES.has(body.tool as ToolName)) {
    return Response.json({ error: `Not a write tool: ${body.tool}` }, { status: 400 });
  }

  const executors = createWriteToolExecutors(commerce, { defaultCartId });
  const run = executors[body.tool as keyof typeof executors] as (input: unknown) => Promise<unknown>;

  try {
    const output = await run(body.input);
    return Response.json({ output });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 400 });
  }
}

export { createShopperTools, createWriteToolExecutors } from "./tools.js";
export type { WriteToolExecutorOptions, WriteToolExecutors } from "./tools.js";
