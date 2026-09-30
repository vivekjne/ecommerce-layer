      const T = /*__TIMING__*/ null;
      const CODE = {
        "s5-a": `\x3cdiv id="root">\x3c/div>
\x3cscript src="/bundle.js">\x3c/script>`,
        "s5-b": `createRoot(document.getElementById("root"))
  .render(\x3cProducts />);`,
        "s5-c": `function Products() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  if (!items) return \x3cSpinner />;
  return \x3cList items={items} />;
}`,
        "s8-a": `function App() {
  return (
    \x3cmain>
      \x3ch1>Hello SSR\x3c/h1>
      \x3cCounter />
    \x3c/main>
  );
}

// Counter: a button with useState(0)
renderToString(\x3cApp />);`,
        "s9-c": `import { hydrateRoot } from "react-dom/client";
hydrateRoot(
  document.getElementById("root"),
  \x3cApp />
);`,
        "s11-c": `\x3cSuspense fallback={\x3cp>Loading reviews...\x3c/p>}>
  \x3cReviews />
\x3c/Suspense>`,
        "s13-a": `async function ProductPage({ id }) {
  const p = await db.product.find(id);
  return (
    \x3carticle>
      \x3ch1>{p.name}\x3c/h1>
      \x3cp>{p.price}\x3c/p>
      \x3cLikeButton id={id} />
    \x3c/article>
  );
}`,
        "s13-b": `"use client";
export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  // ...onClick toggles liked`,
        "s14-c": `6:I["./LikeButton.js",["like"],"default"]
0:["$","article",null,{"children":[
  ["$","h1",null,{"children":"Sneakers"}],
  ["$","p",null,{"children":"59 USD"}],
  ["$","$L6",null,{"id":7}]
]}]`,
        "s15-us": `"use server";
export async function like(id) {
  await db.likes.add(id);   // runs on the server
}`,
      };

      // ---------------- code highlighting ----------------
      const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const KW = "function|const|let|var|return|async|await|import|export|default|from|new|if|else";
      const RE = new RegExp("(\\/\\/.*$)|(\"[^\"]*\"|'[^']*')|(&lt;\\/?[A-Za-z][\\w.]*)|\\b(" + KW + ")\\b|\\b(\\d+)\\b|\\b([A-Za-z_$][\\w$]*)(?=\\()", "g");
      function highlight(line) {
        return esc(line).replace(RE, (m, cm, st, tg, kw, nu, fn) =>
          cm ? '<span class="cm">' + cm + "</span>" : st ? '<span class="st">' + st + "</span>" : tg ? '<span class="tg">' + tg + "</span>" : kw ? '<span class="kw">' + kw + "</span>" : nu ? '<span class="nu">' + nu + "</span>" : '<span class="fn">' + fn + "</span>"
        );
      }
      Object.keys(CODE).forEach((id) => {
        const el = document.getElementById(id);
        const ft = el.querySelector(".ft") ? el.querySelector(".ft").outerHTML : "";
        el.innerHTML = ft + CODE[id].split("\n").map((l) => '<span class="cl">' + (l ? highlight(l) : "&nbsp;") + "</span>").join("");
      });

      // ---------------- real outputs (from verify/*.out.txt) ----------------
      function consoleLines(id, rows) {
        const el = document.getElementById(id);
        el.insertAdjacentHTML("beforeend", rows.map((r, i) => '<span class="out ' + (r[1] || "") + '" id="' + id + "-r" + i + '">' + esc(r[0]) + "</span>").join(""));
      }
      consoleLines("s8-o", [
        ["\x3cmain>", "pk"],
        ["  \x3ch1>Hello SSR\x3c/h1>", "pk"],
        ["  \x3cbutton>Clicked \x3c!-- -->0\x3c!-- --> times\x3c/button>", "pk"],
        ["\x3c/main>", "pk"],
      ]);
      consoleLines("s11-o", [
        ["\x3cmain>\x3ch1>Shop\x3c/h1>", "pk"],
        ["  \x3c!--$?-->\x3ctemplate id=\"B:0\">\x3c/template>", "dim"],
        ["  \x3cp>Loading reviews...\x3c/p>\x3c!--/$-->\x3c/main>", "pk"],
        ["   ...later, in the same response...", "dim"],
        ["\x3cdiv hidden id=\"S:0\">\x3cp>Reviews loaded\x3c/p>\x3c/div>", "cy"],
        ["\x3cscript> ... $RC(\"B:0\",\"S:0\") \x3c/script>", "cy"],
      ]);

      // ---------------- icons, actors, windows ----------------
      const I = (b, extra) => '<svg viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round">' + b + "</svg>";
      const ICONS = {
        piggy: I('<ellipse cx="46" cy="58" rx="34" ry="24" fill="#f472b6"/><circle cx="82" cy="60" r="11" fill="#f9a8d4"/><path d="M28 40 l-4 -14 l16 8z" fill="#f472b6"/><circle cx="60" cy="52" r="4" fill="#1f2140"/><rect x="24" y="76" width="9" height="14" rx="4" fill="#f472b6"/><rect x="56" y="76" width="9" height="14" rx="4" fill="#f472b6"/><circle cx="40" cy="24" r="10" fill="#fbbf24" stroke="#1f2140" stroke-width="3"/>'),
        bolt: I('<path d="M58 6 L22 56 H46 L38 94 L80 40 H54z" fill="#fbbf24" stroke="#1f2140" stroke-width="4"/>'),
        hourglass: I('<path d="M24 10 H76 M24 90 H76 M30 10 C30 40 50 44 50 50 C50 56 30 60 30 90 M70 10 C70 40 50 44 50 50 C50 56 70 60 70 90" stroke="#fb7185" stroke-width="7"/><path d="M38 84 H62 L50 66z" fill="#fbbf24"/>'),
        weight: I('<path d="M28 34 H72 L88 88 H12z" fill="#a78bfa" stroke="#1f2140" stroke-width="4"/><circle cx="50" cy="22" r="10" stroke="#a78bfa" stroke-width="7"/><text x="50" y="76" text-anchor="middle" font-family="Inter,Arial" font-weight="900" font-size="24" fill="#1f2140">JS</text>'),
        eyeoff: I('<path d="M8 50 C24 24 76 24 92 50 C76 76 24 76 8 50z" stroke="#b4bdf2" stroke-width="6"/><circle cx="50" cy="50" r="12" fill="#b4bdf2"/><path d="M16 88 L86 12" stroke="#fb7185" stroke-width="9"/>'),
        lock: I('<path d="M28 46 V32 a22 22 0 0 1 44 0 V46" stroke="#22d3ee" stroke-width="9"/><rect x="18" y="44" width="64" height="48" rx="10" fill="#22d3ee" stroke="#1f2140" stroke-width="4"/><circle cx="50" cy="66" r="7" fill="#1f2140"/>'),
        cart: I('<path d="M6 16 H20 L32 62 H80 L90 28 H26" stroke="#a78bfa" stroke-width="8"/><circle cx="40" cy="80" r="8" fill="#a78bfa"/><circle cx="72" cy="80" r="8" fill="#a78bfa"/>'),
        doc: I('<path d="M22 8 H62 L80 26 V92 H22z" fill="#fde68a" stroke="#1f2140" stroke-width="4"/><path d="M62 8 V26 H80" stroke="#1f2140" stroke-width="4"/><path d="M32 44 H68 M32 58 H68 M32 72 H56" stroke="#1f2140" stroke-width="5"/>'),
        mix: I('<circle cx="36" cy="50" r="28" fill="#a78bfa" opacity=".9"/><circle cx="64" cy="50" r="28" fill="#22d3ee" opacity=".85"/>'),
      };
      document.querySelectorAll(".ico").forEach((el) => { el.innerHTML = ICONS[el.dataset.i]; });

      const ACTORS = {
        server: () => '<svg viewBox="0 0 200 250">' + [10, 90, 170].map((y, i) =>
          '<rect x="6" y="' + y + '" width="188" height="70" rx="14" fill="#2a3580" stroke="#a78bfa" stroke-width="5"/>' +
          '<circle class="led" cx="36" cy="' + (y + 35) + '" r="8" fill="' + ["#86efac", "#22d3ee", "#fbbf24"][i] + '"/>' +
          '<rect x="64" y="' + (y + 22) + '" width="100" height="10" rx="5" fill="#a78bfa" opacity=".6"/><rect x="64" y="' + (y + 40) + '" width="70" height="10" rx="5" fill="#a78bfa" opacity=".4"/>'
        ).join("") + "</svg>",
        db: () => '<svg viewBox="0 0 160 200"><path d="M10 40 V150 a70 24 0 0 0 140 0 V40" fill="#3b2f0f" stroke="#fbbf24" stroke-width="6"/><ellipse cx="80" cy="40" rx="70" ry="24" fill="#5a4514" stroke="#fbbf24" stroke-width="6"/><path d="M10 84 a70 24 0 0 0 140 0 M10 120 a70 24 0 0 0 140 0" stroke="#fbbf24" stroke-width="5" fill="none"/></svg>',
        atom: () => '<svg viewBox="0 0 200 180"><g stroke="#22d3ee" stroke-width="8" fill="none"><ellipse cx="100" cy="90" rx="88" ry="32"/><ellipse cx="100" cy="90" rx="88" ry="32" transform="rotate(60 100 90)"/><ellipse cx="100" cy="90" rx="88" ry="32" transform="rotate(120 100 90)"/></g><circle cx="100" cy="90" r="14" fill="#22d3ee"/></svg>',
      };
      document.querySelectorAll("[data-ico]").forEach((el) => { el.insertAdjacentHTML("afterbegin", ACTORS[el.dataset.ico]()); });
      document.getElementById("s12-atom").innerHTML = ACTORS.atom();

      // browser windows -------------------------------------------------
      function pageLayers(p, W, H, page) {
        const hb = H;                       // body height
        const shop = '<div class="pimg" style="left:0;top:0;width:' + W + 'px;height:46px;background:#6a4df0"></div>' +
          '<div class="ptx" style="left:18px;top:8px;font-size:24px;color:#fff">My Shop</div>' +
          '<div class="pimg" style="left:' + (W - 150) + 'px;top:14px;width:26px;height:18px;background:#c4b5fd"></div><div class="pimg" style="left:' + (W - 110) + 'px;top:14px;width:26px;height:18px;background:#c4b5fd"></div><div class="pimg" style="left:' + (W - 70) + 'px;top:14px;width:26px;height:18px;background:#c4b5fd"></div>' +
          '<div class="pimg" style="left:24px;top:68px;width:' + Math.round(W * 0.4) + 'px;height:' + (hb - 100) + 'px;background:linear-gradient(135deg,#f472b6,#fbbf24)"></div>' +
          '<div class="pimg" style="left:' + (24 + Math.round(W * 0.4 * 0.22)) + 'px;top:' + (68 + Math.round((hb - 100) * 0.3)) + 'px;width:' + Math.round(W * 0.4 * 0.56) + 'px;height:' + Math.round((hb - 100) * 0.4) + 'px;background:#fff;opacity:.85;border-radius:60px 60px 24px 24px"></div>';
        const x2 = Math.round(W * 0.47);
        let title, price, extra;
        if (page === "8" || page === "9") {
          title = '<div class="ptx" style="left:' + x2 + 'px;top:80px;font-size:' + (page === "9" ? 46 : 32) + 'px">Hello SSR</div>';
          price = "";
          extra = '<div class="pbtn" id="' + p + '-btn" style="left:' + x2 + 'px;top:' + (page === "9" ? 190 : 140) + 'px;font-size:' + (page === "9" ? 34 : 22) + 'px;padding:' + (page === "9" ? "16px 34px" : "10px 22px") + '">Clicked 0 times</div>';
        } else if (page === "14") {
          title = '<div class="ptx" style="left:' + x2 + 'px;top:70px;font-size:28px">Sneakers</div>';
          price = '<div class="ptx" style="left:' + x2 + 'px;top:112px;font-size:22px;color:#b3123f">59 USD</div>';
          extra = '<div class="pbtn" id="' + p + '-like" style="left:' + x2 + 'px;top:150px;font-size:22px;background:#0a7fbf;box-shadow:0 5px 0 #075a87">Like</div>';
        } else {
          title = '<div class="ptx" style="left:' + x2 + 'px;top:76px;font-size:34px">Sneakers</div>';
          price = '<div class="ptx" style="left:' + x2 + 'px;top:126px;font-size:26px;color:#b3123f">59 USD</div>';
          extra = '<div class="sk" style="left:' + x2 + 'px;top:180px;width:' + Math.round(W * 0.42) + 'px;height:14px;background:#cfd6ff"></div><div class="sk" style="left:' + x2 + 'px;top:206px;width:' + Math.round(W * 0.34) + 'px;height:14px;background:#cfd6ff"></div><div class="pbtn" style="left:' + x2 + 'px;top:' + Math.min(hb - 70, 250) + 'px">Add to cart</div>';
        }
        const full = '<div class="pg" id="' + p + '-full" style="inset:0;opacity:0">' + shop + title + price + extra + "</div>";
        const sk = '<div class="pg" id="' + p + '-sk" style="inset:0;opacity:0"><div class="sk" style="left:0;top:0;width:' + W + 'px;height:46px;background:#cfd6ff"></div><div class="sk" style="left:24px;top:68px;width:' + Math.round(W * 0.4) + 'px;height:' + (hb - 100) + 'px"></div><div class="sk" style="left:' + x2 + 'px;top:76px;width:' + Math.round(W * 0.38) + 'px;height:30px"></div><div class="sk" style="left:' + x2 + 'px;top:126px;width:' + Math.round(W * 0.22) + 'px;height:24px"></div></div>';
        const sp = '<div class="spin" id="' + p + '-sp" style="left:' + (W / 2 - 32) + 'px;top:' + (hb / 2 - 32) + 'px;opacity:0"></div>';
        const rt = '<div class="pg" id="' + p + '-root" style="left:' + (W / 2 - 150) + 'px;top:' + (hb / 2 - 34) + 'px;width:300px;height:68px;border:4px dashed #9aa3d9;border-radius:14px;font:700 22px/60px JetBrains Mono,DejaVu Sans Mono,monospace;color:#6b7299;text-align:center;opacity:0">div#root</div>';
        return full + sk + sp + rt;
      }
      function reviewsPage(p, W, H) {
        const shop = '<div class="pimg" style="left:0;top:0;width:' + W + 'px;height:46px;background:#6a4df0"></div><div class="ptx" style="left:18px;top:8px;font-size:24px;color:#fff">My Shop</div>' +
          '<div class="pimg" style="left:24px;top:68px;width:190px;height:150px;background:linear-gradient(135deg,#f472b6,#fbbf24)"></div>' +
          '<div class="ptx" style="left:236px;top:72px;font-size:34px">Sneakers</div><div class="ptx" style="left:236px;top:124px;font-size:26px;color:#b3123f">59 USD</div>' +
          '<div class="sk" style="left:236px;top:170px;width:300px;height:14px;background:#cfd6ff"></div><div class="sk" style="left:236px;top:196px;width:230px;height:14px;background:#cfd6ff"></div>';
        const fb = '<div class="pg" id="' + p + '-fb" style="left:24px;top:250px;width:' + (W - 48) + 'px;height:190px;opacity:0"><div class="sk" style="left:0;top:0;width:' + (W - 48) + 'px;height:190px;border-radius:16px;background:#e6e9ff"></div><div class="spin" style="left:20px;top:60px;width:56px;height:56px"></div><div class="ptx" style="left:100px;top:74px;font-size:28px;color:#4a4f7a">Loading reviews...</div></div>';
        const rev = [0, 1, 2].map((i) => '<div class="pg" id="' + p + '-rv' + i + '" style="left:24px;top:' + (250 + i * 66) + 'px;width:' + (W - 48) + 'px;height:56px;background:#eef0ff;border-radius:14px;opacity:0"><div class="ptx" style="left:16px;top:12px;font-size:24px;color:#b7791f">★★★★★</div><div class="sk" style="left:170px;top:20px;width:' + (W - 300) + 'px;height:14px;background:#b9c1f5"></div></div>').join("");
        return '<div class="pg" id="' + p + '-full" style="inset:0">' + shop + fb + rev + "</div>";
      }
      document.querySelectorAll(".win").forEach((el) => {
        const W = +el.dataset.w, H = +el.dataset.h, p = el.dataset.page;
        el.style.width = W + "px"; el.style.height = H + "px";
        const bodyH = H - 46;
        const inner = p === "11" ? reviewsPage("s" + p, W, bodyH) : pageLayers(p === "1" ? el.id : "s" + p, W, bodyH, p);
        el.innerHTML = '<div class="bar"><i></i><i></i><i></i><b>' + el.dataset.url + '</b></div><div class="body">' + inner + "</div>";
      });
      // pages 1 use per-window ids; other pages use the section id prefix. Normalise page ids used by the timeline:
      // s1-wa-*, s1-wb-*, s2-*, s4-*, s7-*, s8-*, s9-*, s11-*, s14-*
      const PG = (win) => "#" + win;

      // s3: flat-pack shelf, box and truck --------------------------------
      function shelfHTML(p) {
        const planks = [[0, 0, 24, 300], [306, 0, 24, 300], [24, 0, 282, 22], [24, 100, 282, 22], [24, 200, 282, 22], [24, 278, 282, 22]];
        const books = [[40, 22, 26, 78, "#f472b6"], [72, 34, 22, 66, "#22d3ee"], [100, 26, 30, 74, "#fbbf24"], [190, 30, 28, 70, "#a78bfa"], [224, 22, 24, 78, "#86efac"], [60, 122, 40, 78, "#fb7185"], [106, 134, 28, 66, "#22d3ee"], [220, 126, 30, 74, "#fbbf24"], [256, 122, 30, 78, "#a78bfa"], [50, 222, 30, 56, "#86efac"], [86, 232, 26, 46, "#f472b6"]];
        return planks.map((r, i) => '<div class="pl" id="' + p + "-pl" + i + '" style="left:' + r[0] + "px;top:" + r[1] + "px;width:" + r[2] + "px;height:" + r[3] + 'px"></div>').join("") +
          books.map((r, i) => '<div class="bk" id="' + p + "-bk" + i + '" style="left:' + r[0] + "px;top:" + r[1] + "px;width:" + r[2] + "px;height:" + r[3] + "px;background:" + r[4] + '"></div>').join("");
      }
      document.getElementById("s3-shelfL").innerHTML = shelfHTML("s3l");
      document.getElementById("s3-shelfR").innerHTML = shelfHTML("s3r");
      document.getElementById("s3-boxL").innerHTML = '<div id="s3-box" style="position:absolute;left:0;top:40px;width:240px;height:160px;background:#c8935a;border:5px solid #7a4f24;border-radius:10px"><div style="position:absolute;left:100px;top:0;width:40px;height:100%;background:#e6c79a"></div><div style="position:absolute;left:14px;top:96px;font:800 24px Inter,Arial;color:#3a2410">Parts + manual</div></div><div id="s3-flapL" style="position:absolute;left:-6px;top:6px;width:130px;height:40px;background:#b98249;border:5px solid #7a4f24;border-radius:8px;transform-origin:0 100%"></div><div id="s3-flapR" style="position:absolute;left:116px;top:6px;width:130px;height:40px;background:#b98249;border:5px solid #7a4f24;border-radius:8px;transform-origin:100% 100%"></div>';
      document.getElementById("s3-truck").innerHTML = '<svg viewBox="0 0 260 160" style="display:block;width:100%;overflow:visible"><rect x="6" y="20" width="170" height="100" rx="12" fill="#5b4bd6" stroke="#a78bfa" stroke-width="5"/><path d="M176 50 H222 L252 86 V120 H176z" fill="#7c6cf0" stroke="#a78bfa" stroke-width="5"/><rect x="190" y="60" width="34" height="26" rx="4" fill="#bdf1ff"/><circle cx="58" cy="126" r="20" fill="#0d1230" stroke="#f4f6ff" stroke-width="6"/><circle cx="206" cy="126" r="20" fill="#0d1230" stroke="#f4f6ff" stroke-width="6"/><text x="90" y="80" text-anchor="middle" font-family="Inter,Arial" font-weight="900" font-size="30" fill="#f4f6ff">SERVER</text></svg>';
