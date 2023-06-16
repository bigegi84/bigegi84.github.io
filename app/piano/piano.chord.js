const pianoChord = {
  action: {
    animate: (id, press = true) => {
      const x = id.replace("piano-chord-", "").split("-")[0];
      const y = id.replace("piano-chord-", "").split("-")[1];
      if (press)
        $("#piano-chord-" + x + "-" + y).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      if (!press) {
        $("#piano-chord-" + x + "-" + y).animate({
          backgroundColor: x.search("b") == -1 ? "#C2DEDC" : "#116A7B",
        });
      }
    },
    animateClear: () => {
      $(".piano-chord").each((i, obj) => {
        const [line, chord] = obj.id.replace("piano-chord-", "").split("-");
        $("#" + obj.id).animate({
          backgroundColor: line.search("b") == -1 ? "#C2DEDC" : "#116A7B",
        });
      });
    },
    chordList: () => {
      const chord = pianoState.chord;
      const view = [];
      let ix = 0;
      for (const x in chord) {
        const list = [];
        let iy = 0;
        for (const y in chord[x]) {
          list.push(
            <div
              key={iy}
              id={"piano-chord-" + x + "-" + y}
              className={
                "piano-chord" + (x.search("b") != -1 ? " piano-chord-mol" : "")
              }
              onMouseDown={(e) =>
                pianoChord.action.mouseDown(e.currentTarget.id)
              }
              onMouseUp={(e) => pianoChord.action.mouseUp(e.currentTarget.id)}
            >
              {y.replace("Over", "/")}
              <br />
              <mobxReact.Observer>
                {() => <div>{pianoChord.action.hint([x, y])}</div>}
              </mobxReact.Observer>
            </div>
          );
          iy++;
        }
        view.push(
          <div
            key={ix}
            id={"piano-chord-line-" + x}
            className="piano-chord-group"
          >
            {list}
          </div>
        );
        ix++;
      }
      return view;
    },
    formula: (id) => {
      const [x, y] = id.replace("piano-chord-", "").split("-");
      let formula = [pianoState.chord[x][y]];
      if (
        pianoStore.playType.code == "twoBassAndChord" &&
        y.search("Bass2") == -1
      ) {
        let bass = x + "Bass2";
        if (y.search("Over") != -1) bass = y + "Bass2";
        formula = [pianoState.chord[x][bass], ...formula];
      }
      return formula;
    },
    hint: ([line, ch]) => {
      for (const key in pianoState.keymap[pianoStore.keymap]) {
        const [x, y] = pianoState.keymap[pianoStore.keymap][key];
        if (line == x && ch == y) return key.replace("Arrow", "");
      }
      return "";
    },
    mouseDown: (id) => {
      let formula = pianoChord.action.formula(id);
      let jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          pianoNote.action.mouseDown(it);
        }, ms);
        ms = ms + pianoStore.delayMs;
      });
      pianoChord.action.animate(id, true);
      // chordInfo(formula.join(" - "));
    },
    mouseUp: (id) => {
      let formula = pianoChord.action.formula(id);
      let jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          pianoNote.action.mouseUp(it);
        }, ms);
        ms = ms + pianoStore.delayMs;
      });
      pianoChord.action.animate(id, false);
      // chordInfo(formula.join(" - "));
    },
  },
  view: () => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            {pianoLocalization.chord["id"]}
          </strong>
          <div
            style={bigegi84theme.styleCircle}
            className="circle-a"
            onClick={() => setShow(!show)}
          >
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? (
          <div id="piano-chord" className="row-a">
            {pianoChord.action.chordList()}
          </div>
        ) : null}
      </div>
    );
  },
};
