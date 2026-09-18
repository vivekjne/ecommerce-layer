import { runCommerceContractTests } from "@commerce/core/test/contract";
import { createMockAdapters } from "../src/index.js";

runCommerceContractTests("mock", () => createMockAdapters());
