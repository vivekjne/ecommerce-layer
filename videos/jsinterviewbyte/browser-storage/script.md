## Hook
SAM: I switched the site to dark mode, refreshed, and it went right back to light. Why?
BYTE: Because the page forgot. Every refresh starts from scratch, unless the app saves your choice in the browser. (after 0.5)

## localStorage
BYTE: The simplest place is [localStorage|local storage|c]. One call saves the theme: [setItem|set item|c], with a key and a value. (after 0.6)
BYTE: Close the browser, come back next week, and [getItem|get item|c] still returns dark. (after 0.6)
BYTE: Every tab on the same site shares it. Change it in one tab, and the other tabs get a [storage|storage|c] event. (after 0.6)
BYTE: But it only stores strings. Save the number forty two, and you get back the string forty two. (after 0.4)
BYTE: Save an object, and you get object Object. So use [JSON.stringify|JSON dot stringify|c] going in, and [JSON.parse|JSON dot parse|c] coming out. (after 0.6)
BYTE: The limit is about five megabytes per site. In our test, Chrome threw a quota error just under five million characters. (after 0.4)
BYTE: And it is synchronous, so every read and write blocks the page for a moment. Keep it small. (after 0.8)

## sessionStorage
SAM: What if I only need data while the tab is open? Like a half filled checkout form?
BYTE: That is [sessionStorage|session storage|c]. Same methods, but every tab gets its own private copy. (after 0.5)
BYTE: Reload the page, and the draft is still there. Open the site in a new tab, and that tab starts empty. Close the tab, and it is gone. (after 0.8)

## Cookies
SAM: And cookies? They are the oldest one.
BYTE: A cookie is a small string the browser sends back to the server, with every request to that site. (after 0.5)
BYTE: That is the whole point. The server can read it, which is how it remembers that you are logged in. (after 0.5)
BYTE: The server sets one with a [Set-Cookie|set cookie|c] header. In our test, the next request carried it back automatically. (after 0.5)
BYTE: Mark it [HttpOnly|HTTP only|c], and page scripts cannot read it at all. [document.cookie|document dot cookie|c] showed the theme, but not the session id. (after 0.6)
BYTE: Add [Secure|secure|c], so it only travels over HTTPS, and [SameSite|same site|c], to limit when other sites can send it. (after 0.5)
BYTE: But cookies are tiny: about four kilobytes each. Our five thousand character cookie was silently dropped. (after 0.8)

## IndexedDB
SAM: What if my app needs lots of data, like a product catalog that works offline?
BYTE: Then use [IndexedDB|indexed D B|c]. It is a real database, inside the browser. (after 0.5)
BYTE: It stores real objects, not just strings. Our saved order came back with a real date, a real array, and even a file blob. (after 0.6)
BYTE: Writes happen in transactions, so they fully succeed, or not at all. And indexes make lookups fast. (after 0.5)
BYTE: It is asynchronous. The put call returns right away, and the result arrives later, so the page never freezes. (after 0.5)
BYTE: And it holds far more than local storage, often gigabytes, depending on free disk space. (after 0.8)

## Cache API
BYTE: For offline pages, there is the [Cache|cache|c] API. It saves whole requests, together with their responses. (after 0.5)
BYTE: A service worker answers from that cache when the network is down. That is how an app still opens offline. (after 0.8)

## Rules
BYTE: A few rules apply to all of them. First, data belongs to one origin: the scheme, the host, and the port. (after 0.6)
BYTE: Second, the browser may clear it when the disk runs low. [navigator.storage.persist|navigator dot storage dot persist|c] asks it to keep yours. (after 0.6)
BYTE: Third, any script on your page can read local storage, session storage, and IndexedDB. So never keep tokens or secrets there. (after 1.0)

## Which one
SAM: So which one should I pick?
BYTE: The login session: an [HttpOnly|HTTP only|c] cookie. The theme or language: local storage. (after 0.4)
BYTE: A form draft for one tab: session storage. Big or offline data: IndexedDB. Offline pages: the Cache API. (after 0.6)
SAM: Got it. Same browser, different shelves for different things. (after 1.0)
