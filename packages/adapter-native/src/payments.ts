import { randomUUID } from "node:crypto";
import type { Money } from "@commerce/core";
import { NativeCommerceError } from "./errors.js";

export interface CardDetails {
  number: string;
  /** "MM/YY" */
  expiry: string;
  cvc: string;
  name: string;
}

export interface PaymentResult {
  reference: string;
  brand: string;
  last4: string;
}

/**
 * Seam for a real processor. A production integration (e.g. Stripe) would
 * take a client-side token instead of raw card details, so card numbers
 * never touch this server at all.
 */
export interface PaymentProvider {
  charge(amount: Money, card: CardDetails): Promise<PaymentResult>;
  refund(reference: string, amount: Money): Promise<void>;
}

/** Always declined by TestPaymentProvider, to exercise the failure path. */
export const TEST_DECLINE_CARD = "4000000000000002";

function luhnValid(digits: string): boolean {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

function brandOf(digits: string): string {
  if (digits.startsWith("4")) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  return "Card";
}

/** Field-level card validation shared by every provider; returns field → message. */
export function validateCard(card: CardDetails, today: Date = new Date()): Record<string, string> {
  const errors: Record<string, string> = {};
  const digits = card.number.replace(/[\s-]/g, "");
  if (!/^\d{12,19}$/.test(digits) || !luhnValid(digits)) errors.cardNumber = "Enter a valid card number.";

  const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(card.expiry.trim());
  if (!match) {
    errors.cardExpiry = "Enter the expiry date as MM/YY.";
  } else {
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    // A card is valid through the last day of its expiry month.
    const expiresAt = new Date(Date.UTC(year, month, 1));
    if (month < 1 || month > 12) errors.cardExpiry = "Enter a valid expiry month.";
    else if (expiresAt <= today) errors.cardExpiry = "This card has expired.";
  }

  if (!/^\d{3,4}$/.test(card.cvc.trim())) errors.cardCvc = "Enter the 3 or 4 digit security code.";
  if (!card.name.trim()) errors.cardName = "Enter the name on the card.";
  return errors;
}

/**
 * Test-mode provider: no money moves. Any valid card number is approved
 * except TEST_DECLINE_CARD.
 */
export class TestPaymentProvider implements PaymentProvider {
  async charge(_amount: Money, card: CardDetails): Promise<PaymentResult> {
    const digits = card.number.replace(/[\s-]/g, "");
    if (digits === TEST_DECLINE_CARD) {
      throw new NativeCommerceError("payment_declined", "Your card was declined. Try a different card.");
    }
    return { reference: `test_ch_${randomUUID().replaceAll("-", "")}`, brand: brandOf(digits), last4: digits.slice(-4) };
  }

  async refund(): Promise<void> {}
}
