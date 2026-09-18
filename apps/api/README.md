# apps/api

Normalized REST API (`GET /products`, `GET /products/:id`, ...) backed by
whichever adapter `getAdapters()` resolves to. Built in Step 4, wired to
`@commerce/adapter-mock` first.
