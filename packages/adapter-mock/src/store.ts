import type { Cart, CartLine, CheckoutSession, Product, Variant } from "@commerce/core";
import productsFixture from "./fixtures/products.json" with { type: "json" };
import { MOCK_CURRENCY, normalizeProduct, type RawProduct } from "./normalize.js";

interface VariantEntry {
  product: Product;
  variant: Variant;
}

function zeroMoney() {
  return { amount: 0, currencyCode: MOCK_CURRENCY };
}

/**
 * In-memory seed data + cart state for the mock adapter. Shared by
 * MockCommerceAdapter and MockMerchantAdapter so merchant reads see
 * exactly what shoppers can (and can't) see.
 */
export class MockStore {
  readonly products = new Map<string, Product>();
  readonly productsByHandle = new Map<string, string>();
  readonly variantIndex = new Map<string, VariantEntry>();
  readonly carts = new Map<string, Cart>();

  private cartCounter = 0;
  private lineCounter = 0;
  private checkoutCounter = 0;

  constructor(raw: RawProduct[] = productsFixture as RawProduct[]) {
    for (const rawProduct of raw) {
      const product = normalizeProduct(rawProduct);
      this.products.set(product.id, product);
      this.productsByHandle.set(product.handle, product.id);
      for (const variant of product.variants) {
        this.variantIndex.set(variant.id, { product, variant });
      }
    }
  }

  createCart(): Cart {
    const id = `mock:cart:${++this.cartCounter}`;
    const cart: Cart = {
      id,
      lines: [],
      subtotal: zeroMoney(),
      total: zeroMoney(),
      totalTax: null,
      currencyCode: MOCK_CURRENCY,
    };
    this.carts.set(id, cart);
    return cart;
  }

  private getCartOrThrow(cartId: string): Cart {
    const cart = this.carts.get(cartId);
    if (!cart) throw new Error(`Cart not found: ${cartId}`);
    return cart;
  }

  private recomputeTotals(cart: Cart): void {
    const amount = cart.lines.reduce((sum, line) => sum + line.lineTotal.amount, 0);
    cart.subtotal = { amount, currencyCode: MOCK_CURRENCY };
    cart.total = { amount, currencyCode: MOCK_CURRENCY };
  }

  addCartLine(cartId: string, variantId: string, quantity: number): Cart {
    const cart = this.getCartOrThrow(cartId);
    const entry = this.variantIndex.get(variantId);
    if (!entry) throw new Error(`Variant not found: ${variantId}`);

    const existing = cart.lines.find((l) => l.variantId === variantId);
    if (existing) {
      existing.quantity += quantity;
      existing.lineTotal = { amount: existing.unitPrice.amount * existing.quantity, currencyCode: MOCK_CURRENCY };
    } else {
      const line: CartLine = {
        id: `mock:cart-line:${++this.lineCounter}`,
        variantId,
        productId: entry.product.id,
        title: entry.product.title,
        variantTitle: entry.variant.title,
        quantity,
        unitPrice: entry.variant.price,
        lineTotal: { amount: entry.variant.price.amount * quantity, currencyCode: MOCK_CURRENCY },
        image: entry.variant.image ?? entry.product.images[0] ?? null,
      };
      cart.lines.push(line);
    }

    this.recomputeTotals(cart);
    return cart;
  }

  updateCartLine(cartId: string, lineId: string, quantity: number): Cart {
    const cart = this.getCartOrThrow(cartId);
    const line = cart.lines.find((l) => l.id === lineId);
    if (!line) throw new Error(`Cart line not found: ${lineId}`);

    if (quantity <= 0) {
      cart.lines = cart.lines.filter((l) => l.id !== lineId);
    } else {
      line.quantity = quantity;
      line.lineTotal = { amount: line.unitPrice.amount * quantity, currencyCode: MOCK_CURRENCY };
    }

    this.recomputeTotals(cart);
    return cart;
  }

  removeCartLine(cartId: string, lineId: string): Cart {
    const cart = this.getCartOrThrow(cartId);
    cart.lines = cart.lines.filter((l) => l.id !== lineId);
    this.recomputeTotals(cart);
    return cart;
  }

  createCheckout(cartId: string): CheckoutSession {
    const cart = this.getCartOrThrow(cartId);
    const id = `mock:checkout:${++this.checkoutCounter}`;
    return {
      id,
      cartId: cart.id,
      url: `https://mock-shop.example.com/checkout/${id}`,
    };
  }
}
