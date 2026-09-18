import type { Cart } from "@commerce/core";
import { formatMoney } from "../lib/format.js";

export function CartPreview({ cart }: { cart: Cart }) {
  if (cart.lines.length === 0) {
    return <div className="cart-preview empty-state">Cart is empty.</div>;
  }

  return (
    <div className="cart-preview">
      {cart.lines.map((line) => (
        <div key={line.id} className="cart-line">
          {line.image && <img src={line.image.url} alt={line.image.altText ?? line.title} className="cart-line-image" />}
          <div className="cart-line-body">
            <div className="cart-line-title">
              {line.title} — {line.variantTitle}
            </div>
            <div className="cart-line-meta">
              Qty {line.quantity} × {formatMoney(line.unitPrice)}
            </div>
          </div>
          <div className="cart-line-total">{formatMoney(line.lineTotal)}</div>
        </div>
      ))}
      <div className="cart-total">
        <span>Total</span>
        <span>{formatMoney(cart.total)}</span>
      </div>
    </div>
  );
}
