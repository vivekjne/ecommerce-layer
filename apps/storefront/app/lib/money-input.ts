/**
 * Parses a decimal amount typed by a person ("19.99", "20", "1,299.5") into
 * integer minor units without going through a float. Returns null when the
 * input isn't a plain non-negative amount with at most 2 decimals.
 */
export function parseMoneyInput(value: string): number | null {
  const cleaned = value.trim().replace(/[,$\s]/g, "");
  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(cleaned);
  if (!match) return null;
  return Number(match[1]) * 100 + Number((match[2] ?? "").padEnd(2, "0"));
}

export function formatMoneyInput(amount: number | null | undefined): string {
  return amount == null ? "" : (amount / 100).toFixed(2);
}
