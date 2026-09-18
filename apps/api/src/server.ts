import { getAdapters } from "./adapters.js";
import { createApp } from "./app.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;

const { commerce } = getAdapters();
const app = createApp(commerce);

app.listen(PORT, () => {
  console.log(`apps/api listening on http://localhost:${PORT}`);
});
