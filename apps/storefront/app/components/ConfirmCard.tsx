import { useState } from "react";
import { AlertIcon, SpinnerIcon } from "./icons.js";

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
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
      <div className="flex items-center gap-2">
        <AlertIcon className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" />
        <div className="text-sm font-semibold text-amber-900 dark:text-amber-200">{ACTION_LABELS[toolName] ?? toolName}</div>
      </div>
      <pre className="mt-2 overflow-x-auto rounded-lg bg-white/60 p-2 text-xs text-neutral-600 dark:bg-black/20 dark:text-neutral-400">
        {JSON.stringify(input, null, 2)}
      </pre>
      {status === "error" && <div className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errorMessage}</div>}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={status === "loading"}
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-neutral-900"
        >
          {status === "loading" && <SpinnerIcon className="h-3.5 w-3.5" />}
          {status === "loading" ? "Working…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={onDecline}
          disabled={status === "loading"}
          className="rounded-lg border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
