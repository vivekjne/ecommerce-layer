import { createMockAdapters } from "@commerce/adapter-mock";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("GET /products", () => {
  it("returns a normalized, cursor-paginated connection", async () => {
    const { commerce } = createMockAdapters();
    const app = createApp(commerce);

    const res = await request(app).get("/products?first=5");

    expect(res.status).toBe(200);
    expect(res.body.edges.length).toBeGreaterThan(0);
    expect(res.body.edges.length).toBeLessThanOrEqual(5);
    expect(res.body.pageInfo).toHaveProperty("hasNextPage");
    expect(Number.isInteger(res.body.edges[0].node.minPrice.amount)).toBe(true);
  });

  it("applies a free-text query filter", async () => {
    const { commerce } = createMockAdapters();
    const app = createApp(commerce);

    const res = await request(app).get("/products?query=hoodie&first=10");

    expect(res.status).toBe(200);
    expect(res.body.edges.length).toBeGreaterThan(0);
    for (const edge of res.body.edges) {
      const haystack = `${edge.node.title} ${edge.node.description}`.toLowerCase();
      expect(haystack).toContain("hoodie");
    }
  });
});

describe("GET /products/:id", () => {
  it("returns the product for a valid id", async () => {
    const { commerce } = createMockAdapters();
    const app = createApp(commerce);

    const list = await request(app).get("/products?first=1");
    const id = list.body.edges[0].node.id as string;

    const res = await request(app).get(`/products/${encodeURIComponent(id)}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it("returns 404 for an unknown id", async () => {
    const { commerce } = createMockAdapters();
    const app = createApp(commerce);

    const res = await request(app).get("/products/not-a-real-id");
    expect(res.status).toBe(404);
  });
});
