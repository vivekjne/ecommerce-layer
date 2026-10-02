      // Intro: the four questions
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);
      const items = [["1", "Higher-order functions", "c1"], ["2", "Currying", "c2"], ["3", "Event flow", "c3"], ["4", "Memoization", "c5"]];
      const bxs = items.map((it, i) => box("it" + i, { x: 60, y: 500 + i * 190, w: 960, h: 160, cls: it[2], fs: 58, html: '<code>' + it[0] + '</code> &nbsp;' + it[1] }));
      const w = ["higher", "currying", "events", "memoization"];
      bxs.forEach((b, i) => appear(b, WD("s1c", w[i]) - 0.3));
      cheer("#sam", L("s1d", 0.2));
