      const T = /*__TIMING__*/ null;
      const CODES = /*__CODES__*/ {};
      const FRAMES = /*__FRAMES__*/ {};

      // ---------------- code highlighting ----------------
      const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const KW = "function|const|let|var|return|async|await|import|export|default|from|new|if|else|throw|type|true|false|null|typeof";
      const RE = new RegExp("(\\/\\/.*$)|(\"[^\"]*\"|'[^']*'|`[^`]*`)|(&lt;\\/?[A-Za-z][\\w.]*)|\\b(" + KW + ")\\b|\\b(\\d+)\\b|\\b([A-Za-z_$][\\w$]*)(?=\\()", "g");
      function highlight(line) {
        return esc(line).replace(RE, (m, cm, st, tg, kw, nu, fn) =>
          cm ? '<span class="cm">' + cm + "</span>" : st ? '<span class="st">' + st + "</span>" : tg ? '<span class="tg">' + tg + "</span>" : kw ? '<span class="kw">' + kw + "</span>" : nu ? '<span class="nu">' + nu + "</span>" : '<span class="fn">' + fn + "</span>"
        );
      }
