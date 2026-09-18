# apps/mcp

MCP server exposing the 7 shopper tools from `packages/core/src/tools.ts`
(`search_products`, `get_product`, `get_cart`, `add_to_cart`,
`update_cart_line`, `remove_from_cart`, `create_checkout`) as MCP tools,
calling `@commerce/adapter-mock` directly over stdio.

Write tools run as soon as they're called by this server — the human
confirmation CLAUDE.md requires for them is the MCP client's own "allow
this tool call?" prompt, not something implemented here.

## Run it directly

```
pnpm --filter @commerce/mcp start
```

It speaks MCP over stdio, so running it directly just leaves it waiting
for JSON-RPC on stdin — that's expected. It's meant to be launched by an
MCP client, not run standalone.

## Connect to Claude Desktop

Add an entry to Claude Desktop's MCP config file — on macOS
`~/Library/Application Support/Claude/claude_desktop_config.json`, on
Windows `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "commerce-layer": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/apps/mcp/src/server.ts"],
      "cwd": "/absolute/path/to/apps/mcp"
    }
  }
}
```

Replace both paths with the absolute path to this repo's `apps/mcp`
directory, then restart Claude Desktop. The 7 tools above should show up
under the 🔌 tools icon in a new chat — try asking it to search the
catalog or add something to a cart (it'll prompt you to approve the
add-to-cart call before it runs).
