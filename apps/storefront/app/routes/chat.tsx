import type { Cart, CheckoutSession, Connection, Product } from "@commerce/core";
import { WRITE_TOOL_NAMES } from "@commerce/core";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls, type UIMessage } from "ai";
import { type FormEvent, useState } from "react";
import { CartPreview } from "../components/CartPreview.js";
import { ConfirmCard } from "../components/ConfirmCard.js";
import { AlertIcon, ExternalLinkIcon, SendIcon } from "../components/icons.js";
import { ProductCard, ProductCards } from "../components/ProductCards.js";

/**
 * The SDK types tool parts precisely when UIMessage is parameterized with
 * InferUITools<typeof tools> — but `tools` lives server-side (it closes
 * over CommerceAdapter) and this route only needs the handful of fields
 * below, so a minimal local shape is simpler than wiring that generic
 * through client and server.
 */
interface GenericToolPart {
  type: `tool-${string}`;
  toolCallId: string;
  state: "input-streaming" | "input-available" | "output-available" | "output-error";
  input?: unknown;
  output?: unknown;
  errorText?: string;
}

function isToolPart(part: UIMessage["parts"][number]): part is UIMessage["parts"][number] & GenericToolPart {
  return part.type.startsWith("tool-");
}

function ToolResult({ toolName, output }: { toolName: string; output: unknown }) {
  switch (toolName) {
    case "search_products": {
      const connection = output as Connection<Product>;
      return <ProductCards products={connection.edges.map((e) => e.node)} />;
    }
    case "get_product": {
      const product = output as Product | null;
      return product ? <ProductCard product={product} /> : <div className="text-sm text-neutral-400">Product not found.</div>;
    }
    case "get_cart":
    case "add_to_cart":
    case "update_cart_line":
    case "remove_from_cart": {
      const cart = output as Cart | null;
      return cart ? <CartPreview cart={cart} /> : <div className="text-sm text-neutral-400">No cart yet.</div>;
    }
    case "create_checkout": {
      const checkout = output as CheckoutSession;
      return (
        <a
          href={checkout.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500"
        >
          Go to checkout
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </a>
      );
    }
    default:
      return (
        <pre className="overflow-x-auto rounded-lg bg-neutral-100 p-2 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
          {JSON.stringify(output, null, 2)}
        </pre>
      );
  }
}

function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-neutral-100 px-4 py-3 dark:bg-neutral-900">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

const SUGGESTIONS = ["Show me some hoodies", "What jackets do you have under $100?", "What's in my cart?"];

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-semibold text-white shadow-sm">
        AI
      </div>
      <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">How can I help you shop today?</h2>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Ask about products, sizes, or your cart — I&apos;ll always check with you before changing anything.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm text-neutral-700 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-indigo-800 dark:hover:text-indigo-400"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatRoute() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, addToolOutput, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  const busy = status === "streaming" || status === "submitted";

  function submitText(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submitText(input);
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-neutral-200 bg-white/80 px-5 py-4 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">AI</div>
          <div>
            <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Shopping Assistant</div>
            <div className="text-xs text-neutral-400 dark:text-neutral-500">Powered by Claude</div>
          </div>
        </header>

        {messages.length === 0 ? (
          <EmptyState onPick={submitText} />
        ) : (
          <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto px-4 py-5">
            {messages.map((message) => (
              <div key={message.id} className={`flex flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    if (!part.text) return null;
                    return (
                      <p
                        key={index}
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          message.role === "user"
                            ? "rounded-br-sm bg-indigo-600 text-white"
                            : "rounded-bl-sm bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                        }`}
                      >
                        {part.text}
                      </p>
                    );
                  }

                  if (isToolPart(part)) {
                    const toolName = part.type.slice("tool-".length);
                    const isWrite = WRITE_TOOL_NAMES.has(toolName as never);

                    if (part.state === "input-available" && isWrite) {
                      return (
                        <div key={index} className="w-full max-w-[85%]">
                          <ConfirmCard
                            toolName={toolName}
                            input={part.input}
                            onApprove={(output) => addToolOutput({ tool: toolName, toolCallId: part.toolCallId, output })}
                            onDecline={() =>
                              addToolOutput({
                                tool: toolName,
                                toolCallId: part.toolCallId,
                                state: "output-error",
                                errorText: "The shopper declined this action.",
                              })
                            }
                          />
                        </div>
                      );
                    }

                    if (part.state === "output-available") {
                      return (
                        <div key={index} className="w-full max-w-[85%]">
                          <ToolResult toolName={toolName} output={part.output} />
                        </div>
                      );
                    }

                    if (part.state === "output-error") {
                      return (
                        <div key={index} className="text-xs font-medium text-red-600 dark:text-red-400">
                          {part.errorText}
                        </div>
                      );
                    }

                    return null;
                  }

                  return null;
                })}
              </div>
            ))}
            {status === "submitted" && <TypingIndicator />}
          </div>
        )}

        {error && (
          <div className="flex items-center justify-between gap-3 border-t border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
            <span className="flex items-center gap-2">
              <AlertIcon className="h-4 w-4 shrink-0" />
              {error.message || "Something went wrong. Please try again."}
            </span>
            <button type="button" onClick={clearError} className="shrink-0 font-medium underline underline-offset-2 hover:no-underline">
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="border-t border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 pl-4 pr-1.5 py-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus-within:ring-indigo-950">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about products, sizes, or your cart…"
              disabled={busy}
              className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none disabled:opacity-50 dark:text-neutral-100"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition-opacity hover:opacity-90 disabled:opacity-30"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
