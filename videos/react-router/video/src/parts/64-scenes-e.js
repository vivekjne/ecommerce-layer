
      // ---------- acting: the characters react to who is speaking ----------
      (function () {
        const ids = Object.keys(T.lines);
        ids.forEach((id, k) => {
          const sp = T.lines[id].speaker;
          if (sp === "sam") {
            tilt("#sam", L(id, 0.1), 7, 0.6);
            face("#byte", "q", L(id));
          } else if (k > 0 && T.lines[ids[k - 1]].speaker === "sam") {
            face("#byte", "h", L(id));
          } else if (k > 1 && T.lines[ids[k - 2]].speaker === "sam") {
            face("#byte", "n", L(id));
          }
        });
      })();
