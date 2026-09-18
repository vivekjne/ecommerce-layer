import type { Cart, CheckoutSession, Connection, Product } from "@commerce/core";
import { WRITE_TOOL_NAMES } from "@commerce/core";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls, type UIMessage } from "ai";
import { type FormEvent, useState } from "react";
import { CartPreview } from "../components/CartPreview.js";
import { ConfirmCard } from "../components/ConfirmCard.js";
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
      return product ? <ProductCard product={product} /> : <div className="empty-state">Product not found.</div>;
    }
    case "get_cart":
    case "add_to_cart":
    case "update_cart_line":
    case "remove_from_cart": {
      const cart = output as Cart | null;
      return cart ? <CartPreview cart={cart} /> : <div className="empty-state">No cart yet.</div>;
    }
    case "create_checkout": {
      const checkout = output as CheckoutSession;
      return (
        <a className="checkout-link" href={checkout.url} target="_blank" rel="noreferrer">
          Go to checkout →
        </a>
      );
    }
    default:
      return <pre className="tool-result-raw">{JSON.stringify(output, null, 2)}</pre>;
  }
}

export default function ChatRoute() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, addToolOutput, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  const busy = status === "streaming" || status === "submitted";

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div className="chat-page">
      <header className="chat-header">Shopping Assistant</header>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message chat-message-${message.role}`}>
            {message.parts.map((part, index) => {
              if (part.type === "text") {
                return part.text ? (
                  <p key={index} className="chat-text">
                    {part.text}
                  </p>
                ) : null;
              }

              if (isToolPart(part)) {
                const toolName = part.type.slice("tool-".length);
                const isWrite = WRITE_TOOL_NAMES.has(toolName as never);

                if (part.state === "input-available" && isWrite) {
                  return (
                    <ConfirmCard
                      key={index}
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
                  );
                }

                if (part.state === "output-available") {
                  return <ToolResult key={index} toolName={toolName} output={part.output} />;
                }

                if (part.state === "output-error") {
                  return (
                    <div key={index} className="tool-error">
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
        {status === "submitted" && <div className="chat-message chat-message-assistant">…</div>}
      </div>

      {error && (
        <div className="chat-error">
          <span>{error.message || "Something went wrong. Please try again."}</span>
          <button type="button" onClick={clearError}>
            Dismiss
          </button>
        </div>
      )}

      <form className="chat-composer" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about products, sizes, or your cart…"
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
