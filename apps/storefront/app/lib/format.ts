import type { Money } from "@commerce/core";

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(money.amount / 100);
}
