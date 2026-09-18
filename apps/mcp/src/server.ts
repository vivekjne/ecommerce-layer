import { toolSchemas, type ToolName } from "@commerce/core";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getAdapters } from "./adapters.js";
import { createToolHandlers } from "./handlers.js";

const { commerce } = getAdapters();
const handlers = createToolHandlers(commerce);

const server = new McpServer({ name: "commerce-layer", version: "0.1.0" });

for (const name of Object.keys(toolSchemas) as ToolName[]) {
  const { description, inputSchema } = toolSchemas[name];
  const run = handlers[name] as (input: unknown) => Promise<unknown>;

  server.registerTool(name, { description, inputSchema }, async (input: unknown) => {
    const result = await run(input);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  });
}

const transport = new StdioServerTransport();
await server.connect(transport);
