const PianoChord = {
  action: {
    animate: (id, press = true) => {
      const x = id.replace("chord-", "").split("-")[0];
      const y = id.replace("chord-", "").split("-")[1];
      if (press)
        $("#chord-" + x + "-" + y).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      if (!press) {
        $("#chord-" + x + "-" + y).animate({
          backgroundColor: x.search("b") == -1 ? "#C2DEDC" : "#116A7B",
        });
      }
    },
    animateClear: () => {
      $(".chord").each((i, obj) => {
        const [line, chord] = obj.id.replace("chord-", "").split("-");
        $("#" + obj.id).animate({
          backgroundColor: line.search("b") == -1 ? "#C2DEDC" : "#116A7B",
        });
      });
    },
    chordList: () => {
      const chord = PianoState.chord;
      const view = [];
      let ix = 0;
      for (var x in chord) {
        const list = [];
        let iy = 0;
        for (var y in chord[x]) {
          list.push(
            <div
              key={iy}
              id={"chord-" + x + "-" + y}
              className={"chord" + (x.search("b") != -1 ? " chord-mol" : "")}
              onMouseDown={(e) => PianoChord.action.mouseDown(e.target.id)}
              onMouseUp={(e) => PianoChord.action.mouseUp(e.target.id)}
            >
              {y.replace("Over", "/")}
              <br />
              {PianoChord.action.hint([x, y])}
            </div>
          );
          iy++;
        }
        view.push(
          <div key={ix} id={"chord-line-" + x} className="chord-group">
            {list}
          </div>
        );
        ix++;
      }
      return view;
    },
    formula: (id) => {
      const x = id.replace("chord-", "").split("-")[0];
      const y = id.replace("chord-", "").split("-")[1];
      let formula = [PianoState.chord[x][y]];
      if (
        PianoStore.playType.code == "twoBassAndChord" &&
        y.search("Bass2") == -1
      ) {
        let bass = x + "Bass2";
        if (y.search("Over") != -1) bass = y + "Bass2";
        formula = [PianoState.chord[x][bass], ...formula];
      }
      return formula;
    },
    hint: ([line, ch]) => {
      for (const key in PianoState.keymap) {
        const [x, y] = PianoState.keymap[key];
        if (line == x && ch == y) return key.replace("Arrow", "");
      }
      return "";
    },
    mouseDown: (id) => {
      let formula = PianoChord.action.formula(id);
      let jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          PianoNote.action.mouseDown(it);
        }, ms);
        ms = ms + PianoStore.delayMs;
      });
      PianoChord.action.animate(id, true);
      // chordInfo(formula.join(" - "));
    },
    mouseUp: (id) => {
      let formula = PianoChord.action.formula(id);
      let jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          PianoNote.action.mouseUp(it);
        }, ms);
        ms = ms + PianoStore.delayMs;
      });
      PianoChord.action.animate(id, false);
      // chordInfo(formula.join(" - "));
    },
  },
  view: () => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong style={{ alignSelf: "center" }}>Chord</strong>
          <div className="circle-a" onClick={() => setShow(!show)}>
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? (
          <div id="chord" className="chord-container">
            {PianoChord.action.chordList()}
          </div>
        ) : null}
      </div>
    );
  },
};
