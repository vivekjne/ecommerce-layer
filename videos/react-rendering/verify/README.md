# Verification of the code shown in the video

Every output on screen was produced by running real React (19.x) code. Run from this folder
after `npm install react@19 react-dom@19 react-server-dom-webpack@19`:

| Scene | Script | Output file | Command |
| --- | --- | --- | --- |
| SSR (`renderToString`) | `ssr.mjs` | `ssr.out.txt` | `node ssr.mjs` |
| Streaming with `Suspense` | `stream.mjs` | `stream.out.txt` | `node stream.mjs` |
| RSC payload | `rsc.mjs` | `rsc.out.txt` | `node --conditions react-server rsc.mjs` |

What was changed for display (nothing else):

- **SSR output** is shown indented over several lines. The real output is one line:
  `<main><h1>Hello SSR</h1><button>Clicked <!-- -->0<!-- --> times</button></main>`.
  The `<!-- -->` comments are React's text-node separators.
- **Streaming output**: the real response also contains a small inline script that defines
  the swap function; the video abbreviates it as `<script> ... $RC("B:0","S:0") </script>`.
- **RSC payload**: this was captured from a development build, which appends debug fields to
  each element (`"$1","$3",1`). Those are trimmed and the tree is indented. The client
  reference line `6:I["./LikeButton.js",["like"],"default"]` and the `"$L6"` placeholder are
  exactly as produced. The Node script builds the client reference by hand (no bundler), which
  is what a bundler plugin does for a file marked `"use client"`.

The narration claims that come from documentation rather than from a script here
(client-side navigation fetches only the payload, server components are the default in the
Next.js App Router, imports of a `"use client"` file join the client bundle, server functions
are public endpoints) are taken from the React and Next.js docs.
