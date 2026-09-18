import { describe, expect, it } from "vitest";
import { isWriteTool, toolSchemas, WRITE_TOOL_NAMES } from "../src/tools.js";
import { STOREFRONT_SYSTEM_PROMPT } from "../src/systemPrompt.js";

describe("tool schemas", () => {
  it("exposes every declared tool name as a schema entry", () => {
    expect(Object.keys(toolSchemas)).toEqual(
      expect.arrayContaining([
        "search_products",
        "get_product",
        "get_cart",
        "add_to_cart",
        "update_cart_line",
        "remove_from_cart",
        "create_checkout",
      ]),
    );
  });

  it("marks exactly the mutating tools as write tools", () => {
    expect(WRITE_TOOL_NAMES.size).toBe(4);
    expect(isWriteTool("add_to_cart")).toBe(true);
    expect(isWriteTool("search_products")).toBe(false);
  });

  it("validates a well-formed search_products input", () => {
    const result = toolSchemas.search_products.inputSchema.safeParse({ query: "hoodie", first: 5 });
    expect(result.success).toBe(true);
  });

  it("rejects get_product input with both id and handle", () => {
    const result = toolSchemas.get_product.inputSchema.safeParse({ id: "1", handle: "a" });
    expect(result.success).toBe(false);
  });
});

describe("system prompt", () => {
  it("is a non-empty string", () => {
    expect(STOREFRONT_SYSTEM_PROMPT.length).toBeGreaterThan(0);
  });
});
