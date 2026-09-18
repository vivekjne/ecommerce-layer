import type { CommerceAdapter } from "@commerce/core";
import express, { type NextFunction, type Request, type Response } from "express";
import { createProductsRouter } from "./routes/products.js";

export function createApp(commerce: CommerceAdapter): express.Express {
  const app = express();
  app.use(express.json());
  app.use(createProductsRouter(commerce));

  // Express only treats a 4-arg handler as an error handler; _req/_next must stay in the signature.
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
