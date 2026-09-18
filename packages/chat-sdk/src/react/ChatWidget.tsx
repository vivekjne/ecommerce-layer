import type { Cart, CheckoutSession, Connection, Product } from "@commerce/core";
import { WRITE_TOOL_NAMES } from "@commerce/core";
import type { UIMessage } from "ai";
import { type FormEvent, type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { CartPreview } from "./CartPreview.js";
import { ConfirmCard } from "./ConfirmCard.js";
import { AlertIcon, ChatBubbleIcon, CloseIcon, ExternalLinkIcon, SendIcon } from "./icons.js";
import { ProductCard, ProductCards } from "./ProductCards.js";
import { useShopChat } from "./useShopChat.js";

/**
 * The SDK types tool parts precisely when UIMessage is parameterized with
 * InferUITools<typeof tools> — but `tools` lives server-side (it closes
 * over CommerceAdapter) and this widget only needs the handful of fields
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
          <ExternalLinkIcon aria-hidden="true" className="h-3.5 w-3.5" />
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
    <div role="status" aria-label="Assistant is typing" className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-neutral-100 px-4 py-3 dark:bg-neutral-900">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

const DEFAULT_SUGGESTIONS = ["Show me some hoodies", "What jackets do you have under $100?", "What's in my cart?"];

function EmptyState({ onPick, suggestions }: { onPick: (text: string) => void; suggestions: string[] }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-semibold text-white shadow-sm">
        AI
      </div>
      <p className="mt-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">How can I help you shop today?</p>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">I&apos;ll always check with you before changing anything.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-indigo-800 dark:hover:text-indigo-400"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export interface ChatWidgetProps {
  /** Resource route backing the chat stream. Defaults to "/api/chat". */
  chatApi?: string;
  /** Resource route that runs a confirmed write tool. Defaults to "/api/tool-confirm". */
  confirmApi?: string;
  title?: string;
  subtitle?: string;
  suggestions?: string[];
  /** Called after any write tool completes (approved or declined) — a host app can use this to refresh its own cart badge etc. */
  onCartChanged?: () => void;
}

/**
 * A floating chat bubble that opens into a slide-over panel. Mount once,
 * outside <Outlet/> (e.g. in a root layout), so it persists across route
 * navigations instead of losing conversation state on every page change.
 */
export function ChatWidget({
  chatApi = "/api/chat",
  confirmApi = "/api/tool-confirm",
  title = "Shopping Assistant",
  subtitle = "Powered by Claude",
  suggestions = DEFAULT_SUGGESTIONS,
  onCartChanged,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, addToolOutput, status, error, clearError } = useShopChat({ chatApi });
  const headingId = useId();
  const composerId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const busy = status === "streaming" || status === "submitted";

  function close() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  // Non-modal dialog: focus moves in on open (so screen readers announce
  // it immediately) but nothing traps Tab — the rest of the page stays
  // reachable, per the ARIA APG's non-modal dialog pattern.
  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") close();
  }

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
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close shopping assistant" : "Open shopping assistant"}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <CloseIcon aria-hidden="true" className="h-5 w-5" /> : <ChatBubbleIcon aria-hidden="true" className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-end sm:inset-auto sm:bottom-24 sm:right-5">
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-labelledby={headingId}
            tabIndex={-1}
            onKeyDown={handlePanelKeyDown}
            className="flex h-full w-full flex-col bg-white shadow-2xl outline-none sm:h-[600px] sm:w-96 sm:rounded-2xl sm:border sm:border-neutral-200 dark:bg-neutral-950 sm:dark:border-neutral-800"
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
              <div aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
                AI
              </div>
              <div className="flex-1">
                <h2 id={headingId} className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h2>
                <div className="text-xs text-neutral-400 dark:text-neutral-500">{subtitle}</div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-900"
              >
                <CloseIcon aria-hidden="true" className="h-4 w-4" />
              </button>
            </header>

            {messages.length === 0 ? (
              <EmptyState onPick={submitText} suggestions={suggestions} />
            ) : (
              <div role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        if (!part.text) return null;
                        return (
                          <p
                            key={index}
                            className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
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
                            <div key={index} className="w-full max-w-[90%]">
                              <ConfirmCard
                                toolName={toolName}
                                input={part.input}
                                confirmApi={confirmApi}
                                onApprove={(output) => {
                                  addToolOutput({ tool: toolName, toolCallId: part.toolCallId, output });
                                  onCartChanged?.();
                                }}
                                onDecline={() => {
                                  addToolOutput({
                                    tool: toolName,
                                    toolCallId: part.toolCallId,
                                    state: "output-error",
                                    errorText: "The shopper declined this action.",
                                  });
                                  onCartChanged?.();
                                }}
                              />
                            </div>
                          );
                        }

                        if (part.state === "output-available") {
                          return (
                            <div key={index} className="w-full max-w-[90%]">
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
              <div role="alert" className="flex items-center justify-between gap-3 border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                <span className="flex items-center gap-1.5">
                  <AlertIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {error.message || "Something went wrong."}
                </span>
                <button type="button" onClick={clearError} className="shrink-0 font-medium underline underline-offset-2 hover:no-underline">
                  Dismiss
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="shrink-0 border-t border-neutral-200 p-3 dark:border-neutral-800">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 py-1.5 pl-3.5 pr-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus-within:ring-indigo-950">
                <label htmlFor={composerId} className="sr-only">
                  Message the shopping assistant
                </label>
                <input
                  id={composerId}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about products, sizes, your cart…"
                  disabled={busy}
                  className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none disabled:opacity-50 dark:text-neutral-100"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send message"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition-opacity hover:opacity-90 disabled:opacity-30"
                >
                  <SendIcon aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
