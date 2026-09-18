import type { CommerceAdapter } from "@commerce/core";
import { Router } from "express";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function parseIntParam(value: unknown, fallback: number): number {
  if (typeof value !== "string") return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function stringParam(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function createProductsRouter(commerce: CommerceAdapter): Router {
  const router = Router();

  router.get("/products", async (req, res, next) => {
    try {
      const first = clamp(parseIntParam(req.query.first, 10), 1, 50);
      const after = stringParam(req.query.after);
      const minPriceRaw = stringParam(req.query.minPrice);
      const maxPriceRaw = stringParam(req.query.maxPrice);

      const result = await commerce.searchProducts({
        first,
        after,
        filters: {
          query: stringParam(req.query.query),
          productType: stringParam(req.query.productType),
          vendor: stringParam(req.query.vendor),
          minPrice: minPriceRaw !== undefined ? parseIntParam(minPriceRaw, 0) : undefined,
          maxPrice: maxPriceRaw !== undefined ? parseIntParam(maxPriceRaw, 0) : undefined,
        },
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  router.get("/products/:id", async (req, res, next) => {
    try {
      const product = await commerce.getProduct({ id: req.params.id });
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
