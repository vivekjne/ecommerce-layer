import { createMockAdapters } from "@commerce/adapter-mock";
import { describe, expect, it } from "vitest";
import { defaultSelection, findVariant } from "../app/lib/variants.js";

describe("variants", () => {
  it("defaultSelection prefers an available variant", async () => {
    const { commerce } = createMockAdapters();
    // Stretch Fit Cap: both variants are out of stock in the fixture.
    const product = await commerce.getProduct({ handle: "stretch-fit-cap" });
    expect(product).not.toBeNull();
    const selection = defaultSelection(product!);
    const variant = findVariant(product!, selection);
    expect(variant).toBeDefined();
  });

  it("findVariant matches on every option, not a subset", async () => {
    const { commerce } = createMockAdapters();
    const product = await commerce.getProduct({ handle: "midnight-runner-hoodie" });
    expect(product).not.toBeNull();

    const variant = findVariant(product!, { Color: "Cobalt Blue", Size: "M" });
    expect(variant?.selectedOptions).toEqual([
      { name: "Color", value: "Cobalt Blue" },
      { name: "Size", value: "M" },
    ]);

    // Only a Color match, no Size chosen — must not loosely match.
    expect(findVariant(product!, { Color: "Cobalt Blue" })).toBeUndefined();
  });
});
