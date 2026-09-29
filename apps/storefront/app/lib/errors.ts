import { isNativeCommerceError, type NativeErrorCode } from "@commerce/adapter-native";

const STATUS_BY_CODE: Record<NativeErrorCode, number> = {
  not_found: 404,
  invalid_input: 400,
  insufficient_inventory: 409,
  cart_closed: 409,
  checkout_closed: 409,
  payment_declined: 402,
  invalid_state: 409,
};

/**
 * Maps an adapter error to something safe to show a shopper. Expected
 * backend errors carry a shopper-facing message; anything else is logged
 * and replaced with a generic one so internals never leak into the UI.
 */
export function toUserError(err: unknown): { message: string; status: number; fieldErrors: Record<string, string> } {
  if (isNativeCommerceError(err)) {
    return { message: err.message, status: STATUS_BY_CODE[err.code], fieldErrors: err.fieldErrors };
  }
  console.error(err);
  return { message: "Something went wrong. Please try again.", status: 500, fieldErrors: {} };
}
