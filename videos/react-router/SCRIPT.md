# React Router Framework Mode: build an online store

Draft script for review. Target length: about 19 to 20 minutes (about 2,400 spoken words plus demo pauses). Version covered: React Router 8 (the current release; the same APIs apply to 7).

## Rules for the narration
- Tutorial voice only. Nothing like "as you can see", "in the diagram", "on the left", "watch the
  animation", "with animations", "real code we ran". Say what to do and why; the picture carries the rest.
- One idea per sentence. Names of code things are spoken naturally ("use loader data", "use fetcher").
- Every code sample on screen is from a real app that I build and run (see Demo plan).

## Cast (each has a different voice)
| Character | Role | Voice |
| --- | --- | --- |
| **Byte** (green robot) | Teacher, explains and shows | male, calm (`am_michael`) |
| **Sam** (purple) | Learner, asks the questions a new developer asks | female (`af_nova`) |
| **Mallory** (orange, masked) | Bug and troublemaker: bad input, missing pages, crashes | British male (`bm_george`) |
| **Guard** (yellow, shield) | Security and middleware, only in the auth chapter | deep male (`am_onyx`) |

## Demo plan (code on the left, live preview on the right)
The store ("Nova Market") is a real React Router 8 app that I create, run and drive with a browser.
The preview panes are real screenshots and recordings of that app, and the code panes are the real files.
Split-screen demos: setup, products loader, search, pending UI, checkout action and validation,
cart with a fetcher (optimistic UI), streaming reviews, error boundary, auth middleware.
Everything else uses full-screen code, diagrams and short cards.

## Chapters and rough timing
| # | Chapter | Time |
| --- | --- | --- |
| 1 | Intro: what we build | 0:45 |
| 2 | Project setup and root.tsx | 1:15 |
| 3 | Routing: routes.ts, dynamic, layouts, prefix, splat | 1:45 |
| 4 | Route modules and generated types | 0:50 |
| 5 | Loaders: list, product page, 404, search | 2:10 |
| 6 | Navigation and pending UI | 1:20 |
| 7 | Actions and forms: checkout and validation | 2:00 |
| 8 | Sessions and cookies: the cart | 1:20 |
| 9 | Fetchers: add to cart, optimistic UI, live search | 2:15 |
| 10 | Revalidation | 0:55 |
| 11 | Streaming with Suspense | 1:10 |
| 12 | Error boundaries | 1:05 |
| 13 | Middleware: protect the account area | 1:10 |
| 14 | Client loaders and actions | 0:55 |
| 15 | Resource routes | 0:50 |
| 16 | Head tags, headers, handle | 0:55 |
| 17 | Rendering strategies | 0:45 |
| 18 | Finishing touches: view transitions, testing, deploying | 0:55 |
| 19 | Recap | 0:35 |

---

## 1. Intro (Byte, Sam)
BYTE: Welcome to JavaScript Demystified. Today we build Nova Market, a complete online store, with React Router in framework mode.
SAM: A real store? With products, a cart, and checkout?
BYTE: Yes. Along the way you will learn routes, loaders, actions, fetchers, sessions, streaming, error boundaries, and middleware.
SAM: That is a lot of ground. Where do we start?
BYTE: With one command.

## 2. Project setup and root (Byte, Sam)  [DEMO: terminal left, running app right]
BYTE: Create the project with create react router, install the packages, and start the dev server.
BYTE: The app folder holds everything. The file routes dot t s lists your URLs. The file root dot t s x renders the page around every route.
SAM: What goes in root?
BYTE: The html and body tags. Inside the head, the Links and Meta components. Inside the body, an Outlet for the current page, then ScrollRestoration and Scripts.
SAM: Why do we need Scripts?
BYTE: It loads the JavaScript that makes the page interactive. Without it, you get plain server rendered html.
BYTE: The last file is react router dot config dot t s. That is where you choose how the app renders. We come back to it.

## 3. Routing (Byte, Sam, Mallory)
BYTE: Routes are configured in app routes dot t s. Each entry has a URL pattern, and the file of a route module.
BYTE: The home page is an index route. The catalog is a route called products.
SAM: How do I build a page for a single product?
BYTE: Use a dynamic segment. A colon, then a name: products, slash, colon slug.
BYTE: Now nesting. Give the whole shop a layout route, with a header and a footer.
BYTE: A layout route adds no URL segment. Its child routes render inside its Outlet.
SAM: So the header stays, and only the page changes?
BYTE: Exactly. Nested routes are also how React Router loads data in parallel.
BYTE: The prefix helper adds a path in front of several routes, without a parent file. We use it for the account area: orders, and settings.
SAM: And when somebody types a URL that does not exist?
BYTE: Add a splat route. A star at the end matches everything else, so it works as a not found page.
SAM: Can I skip the config and use file names instead?
BYTE: Yes. The fs routes package reads a file naming convention, and you can even mix both.

## 4. Route modules and types (Byte, Sam)
BYTE: Every file in your route config is a route module. Its default export is the component.
BYTE: Around it, you can export a loader, an action, meta, links, headers, and an error boundary.
BYTE: React Router generates types for each route. Import Route from the plus types folder that sits next to your file.
SAM: Do params get types too?
BYTE: They do. In the product route, params dot slug is a string. Loader data and action data are typed as well.

## 5. How data flows (Byte, Sam)  [DIAGRAM: the read, write, read loop]
BYTE: Before more code, learn the loop that React Router is built on.
BYTE: A request comes in. The loaders of the matching routes run, and their data goes to the components. The page renders.
SAM: And when the user changes something?
BYTE: They submit a form. The action runs and does the write. Then the loaders run again, and the page updates with fresh data.
BYTE: Read, write, read again. You never copy server data into state, and you never refresh it by hand.
SAM: So what is state for?
BYTE: The interface only. An open menu, a focused input, a selected tab. Server data lives in loaders.
BYTE: Loaders and actions run on the server. Client loaders and client actions run in the browser. Your components run in both places.

## 6. Fetching data from an API (Byte, Sam)  [DEMO: loader calls the catalog API]
BYTE: Nova Market gets its products from a catalog API. In the loader, call fetch with the API url, and return the parsed json.
SAM: Why not fetch inside the component with use effect?
BYTE: A loader starts before the page renders. There is no blank screen, no loading flag, and the request comes from your server, not the browser.
BYTE: That means no CORS problems, and your API key never reaches the client.
BYTE: Nested routes load in parallel. The layout loader and the page loader start at the same time.
BYTE: When one loader needs two calls, start both, then wait for them together with Promise dot all.
SAM: What if the API fails?
BYTE: Check response dot ok. If it is false, throw data with the status, and the error boundary takes over.
BYTE: A loader can return strings, numbers, dates, maps, sets, and even promises. The component receives them typed, with no extra work.
BYTE: A child route can read the data of a parent with use route loader data. That is how the header shows the cart count.
BYTE: Some data only exists in the browser. For that, use a client loader. We come to it later.

## 7. Loaders (Byte, Sam, Mallory)  [DEMO: loader code left, products page right]
BYTE: A loader provides data to a route before it renders. Export an async function named loader, and return an object.
BYTE: The component receives that object as the loader data prop.
SAM: Where does the data come from?
BYTE: From anywhere. Put your database code in a file that ends in dot server. Server files are never bundled for the browser, and neither is the loader.
SAM: So I can query the database directly, without an API?
BYTE: Directly.
BYTE: On the first visit, the loader runs on the server and the html arrives with the products in it. On later navigations, React Router calls the loader for you with a fetch.
BYTE: Now the product page. Read params dot slug, and look the product up.
SAM: What if someone asks for a product that does not exist?
BYTE: Throw data, with a four oh four status. The nearest error boundary renders it. We add one soon.
BYTE: Search belongs in the url. A form with method get and an input named q navigates to products, question mark, q equals.
BYTE: In the loader, read the request url, and get the q search parameter, then filter.
SAM: Why not keep the query in state?
BYTE: A url can be shared, bookmarked, and it survives a refresh.

## 8. Navigation and pending UI (Byte, Sam)  [DEMO: slow loader, header progress bar]
BYTE: Use Link for ordinary links. It renders a real anchor, so it works before JavaScript loads.
BYTE: Use NavLink for navigation menus. It knows when a link is active, or pending, and passes both to your class name, style, and children.
SAM: What does pending mean?
BYTE: The user clicked, and the loaders of the next page are still running.
BYTE: For a global indicator, read the navigation from use navigation. When its state is not idle, show a progress bar in the layout.
BYTE: Inside loaders and actions, use redirect to send users somewhere else.
BYTE: The use navigate hook exists too. Keep it for moments when the user is not clicking anything, like a timeout.

## 9. Actions and forms (Byte, Sam, Mallory)  [DEMO: checkout form left, preview right]
BYTE: Actions handle writes. Export an async function named action from the route module.
BYTE: Render a Form with method post. React Router calls the action of the matching route, with the form data on the request.
BYTE: Read it with request dot form data, and get the fields you need.
MALLORY: I will submit an empty email address.
BYTE: That is why we validate. If a field is wrong, return the errors with data, and a four hundred status.
BYTE: The component receives them as action data, so you can show each message next to its field.
SAM: Why the four hundred status?
BYTE: Only successful responses revalidate your loaders. A failed validation does not need a reload.
BYTE: When the order is valid, create it, and return redirect to the confirmation page.
BYTE: For a pending state, use navigation dot state, or check navigation dot form data to disable the button.
BYTE: If you see question mark index in a url, that is how React Router targets an index route. It appears automatically.

## 10. Sessions and cookies (Byte, Sam)
BYTE: The cart has to survive between requests. That is what sessions are for.
BYTE: Create cookie session storage in a file called sessions dot server. Give it a cookie name, http only, same site lax, and a secret.
BYTE: In a loader or action, call get session with the cookie header of the request.
BYTE: Read values with get, write them with set, and send the session back with commit session, inside a set cookie header.
SAM: What if I forget to commit?
BYTE: Then the change is lost. Every change needs a commit.
BYTE: Flash gives you a value that is read once. It is perfect for messages like added to cart.
BYTE: To log out, call destroy session and redirect.

## 11. Fetchers (Byte, Sam, Mallory)  [DEMO: product grid left, cart badge right]
BYTE: A Form navigates. Sometimes you want to save something, and stay right where you are.
BYTE: That is a fetcher. Call use fetcher, and render fetcher dot Form with method post and an action pointing at the cart route.
SAM: So the url does not change?
BYTE: Right, and there is no new history entry. If the url should change, use Form. If not, use a fetcher.
BYTE: A fetcher has its own state. Check fetcher dot state, and show adding, while it is not idle.
BYTE: When the action finishes, every loader on the page revalidates, so the cart count updates by itself.
BYTE: Now make it feel instant. Fetcher dot form data holds what the user just submitted.
BYTE: Read the quantity from it, and render the next state before the server answers. That is an optimistic user interface.
SAM: What if the item is out of stock?
BYTE: Return the error from the action. It arrives as fetcher dot data, and the optimistic value simply goes away.
BYTE: Fetchers also load data. Point a fetcher form with method get at a search route, and submit it while the user types.
BYTE: You can also call fetcher dot load with any route url. It runs that loader, and gives you the data, with no navigation at all.
BYTE: The results appear in fetcher dot data. That is your live search.
BYTE: And use fetchers reads every active fetcher, which is how the header can show a pending cart count.

## 12. Revalidation (Byte, Sam)
BYTE: After every successful action, React Router runs the loaders of the page again. That is why your ui is never out of date.
SAM: Even the expensive ones?
BYTE: You can opt out. Export should revalidate from a route, and return false for requests that cannot change its data.
BYTE: Always return the default should revalidate value for everything else.
BYTE: To skip a single request, pass default should revalidate false to the form, the link, or fetcher submit.
BYTE: Use the revalidator hook when you want a refresh without a submission, like polling stock levels.

## 13. Streaming (Byte, Sam)  [DEMO: slow reviews, page renders first]
BYTE: Reviews come from a slow service. Do not make the whole page wait for them.
BYTE: In the loader, return the promise without awaiting it. The critical data is awaited, and the slow data is streamed.
BYTE: In the component, wrap the reviews in Suspense, with a fallback, and read the promise with Await.
SAM: Can I use the use hook from React instead?
BYTE: Yes. Pass the promise to a small component, and call use on it.
BYTE: The page renders right away. When the reviews arrive, they replace the fallback.
BYTE: Pending promises are rejected after about five seconds. Export stream timeout from the server entry to change that.

## 14. Error boundaries (Byte, Sam, Mallory)  [DEMO: broken route shows boundary]
BYTE: When a loader, an action, or a component throws, the closest error boundary renders in place of the route.
BYTE: Export error boundary from the root. Use is route error response to detect thrown responses with a status. Handle real errors, and unknown values, too.
MALLORY: I broke the reviews. Nobody will see a white page now.
BYTE: Put a boundary in the product route as well. Only that part of the page shows the error, and the layout and header stay.
BYTE: Boundaries are for surprises and for four oh fours. Use action data for form validation.

## 15. Middleware (Byte, Sam, Guard)  [DEMO: account page redirects to login]
GUARD: I protect the account area.
BYTE: Middleware runs before your loaders and actions, from the parent route down to the child, and back up after the response.
BYTE: Create a typed context with create context. Then export a middleware array from the account layout route.
GUARD: Nobody gets in without a session.
BYTE: The middleware reads the session. If there is no user, it throws a redirect to login. Otherwise it stores the user in context.
BYTE: Every child loader then reads that user from context.
BYTE: Add a logging middleware in the root, and you can time every request.
SAM: Is there a client version?
BYTE: Client middleware runs in the browser during navigations. It does not return a response.

## 16. Client loaders and actions (Byte, Sam)
BYTE: Some data only exists in the browser, like recently viewed products in local storage.
BYTE: Export a client loader. It runs only in the browser, on navigations.
BYTE: It can call the server loader too, and merge the results.
BYTE: To also run it on the first page load, set hydrate to true, and export a hydrate fallback to show while it runs.
BYTE: Client action works the same way, for writes that never need the server.

## 17. Resource routes (Byte, Sam)
BYTE: A route without a default export is a resource route. It serves data, not a page.
BYTE: The invoice route returns a file download. A products route returns json. A webhook route handles posts in its action.
BYTE: To link to one, use a normal anchor, or Link with reload document. Otherwise the router tries a client navigation.

## 18. Head tags, headers, handle (Byte, Sam)
BYTE: In React 19, render title and meta elements inside your route component. Each product page gets its own title and description.
BYTE: The meta export still works, and the last matching route wins.
BYTE: The links export adds stylesheets and preloads. The headers export sets cache control for public pages.
BYTE: Handle attaches anything to a route, like a breadcrumb label, which you read with use matches.

## 19. Rendering strategies (Byte, Sam)
BYTE: In the config file, ssr true is the default, so every page is server rendered.
BYTE: Set ssr to false and you get a single page app.
BYTE: Or keep server rendering and add a prerender list. The about page and the policies are built once, at build time.

## 20. Finishing touches (Byte, Sam)
BYTE: Forms work before JavaScript loads, because they are plain html forms. That is progressive enhancement, and you get it by default.
BYTE: React 19 view transitions can animate the outlet between pages. Wrap it in a ViewTransition component in your layout.
BYTE: To test components that use router hooks, render them with create routes stub.
BYTE: To ship, run the build, and start it with react router serve, or use a template for your hosting platform.

## 21. Recap (Byte, Sam)
BYTE: You now have a complete store.
BYTE: Routes map urls to modules. Loaders read data. Actions write it, and loaders refresh on their own.
BYTE: Fetchers save without navigating. Sessions remember users. Streaming, error boundaries, and middleware make it fast, safe, and resilient.
SAM: Thank you, Byte. Now let me build one.
BYTE: See you next time.
