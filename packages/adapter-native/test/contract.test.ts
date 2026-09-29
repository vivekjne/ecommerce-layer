import { runCommerceContractTests } from "@commerce/core/test/contract";
import { createNativeBackend } from "../src/index.js";

runCommerceContractTests("native", () => createNativeBackend({ databasePath: ":memory:" }));
