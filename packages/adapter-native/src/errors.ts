export type NativeErrorCode =
  | "not_found"
  | "invalid_input"
  | "insufficient_inventory"
  | "cart_closed"
  | "checkout_closed"
  | "payment_declined"
  | "invalid_state";

/**
 * Every expected failure from the native backend (bad input, out of stock,
 * declined card) is a NativeCommerceError with a shopper-safe message, so
 * callers can show `message` directly and map `code` to an HTTP status.
 */
export class NativeCommerceError extends Error {
  constructor(
    readonly code: NativeErrorCode,
    message: string,
    readonly fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "NativeCommerceError";
  }
}

export function isNativeCommerceError(err: unknown): err is NativeCommerceError {
  return err instanceof NativeCommerceError;
}
