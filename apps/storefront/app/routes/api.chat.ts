import { STOREFRONT_SYSTEM_PROMPT } from "@commerce/core";
import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from "ai";
import type { ActionFunctionArgs } from "react-router";
import { getAdapters } from "../lib/adapters.js";
import { createShopperTools } from "../lib/tools.js";

export async function action({ request }: ActionFunctionArgs) {
  const { messages } = (await request.json()) as { messages: UIMessage[] };
  const { commerce } = getAdapters();

  const result = streamText({
    model: anthropic(process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5"),
    system: STOREFRONT_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: createShopperTools(commerce),
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
