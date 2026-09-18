import { useState } from "react";

const ACTION_LABELS: Record<string, string> = {
  add_to_cart: "Add to cart",
  update_cart_line: "Update quantity",
  remove_from_cart: "Remove from cart",
  create_checkout: "Proceed to checkout",
};

interface ConfirmCardProps {
  toolName: string;
  input: unknown;
  onApprove: (output: unknown) => void;
  onDecline: () => void;
}

/**
 * The human-confirmation gate CLAUDE.md requires for write tools. The model
 * calling add_to_cart/update_cart_line/remove_from_cart/create_checkout only
 * gets this far — nothing reaches CommerceAdapter until Confirm is clicked,
 * which POSTs to /api/tool-confirm and feeds the real result back to the
 * chat via addToolOutput.
 */
export function ConfirmCard({ toolName, input, onApprove, onDecline }: ConfirmCardProps) {
  const [status, setStatus] = useState<"pending" | "loading" | "error">("pending");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleConfirm() {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/tool-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: toolName, input }),
      });
      const body = (await res.json()) as { output?: unknown; error?: string };
      if (!res.ok || body.error) {
        setStatus("error");
        setErrorMessage(body.error ?? "Something went wrong.");
        return;
      }
      onApprove(body.output);
    } catch {
      setStatus("error");
      setErrorMessage("Network error — please try again.");
    }
  }

  return (
    <div className="confirm-card">
      <div className="confirm-card-title">{ACTION_LABELS[toolName] ?? toolName}</div>
      <pre className="confirm-card-input">{JSON.stringify(input, null, 2)}</pre>
      {status === "error" && <div className="confirm-card-error">{errorMessage}</div>}
      <div className="confirm-card-actions">
        <button type="button" onClick={handleConfirm} disabled={status === "loading"}>
          {status === "loading" ? "Working…" : "Confirm"}
        </button>
        <button type="button" onClick={onDecline} disabled={status === "loading"}>
          Cancel
        </button>
      </div>
    </div>
  );
}
