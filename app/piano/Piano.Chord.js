const _pianoChord = {
  getFormula: (id) => {
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
  handleAnimate: (id, press = true) => {
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
      $("#chord-" + x + "-" + y).animate(
        {
          backgroundColor: x.search("b") == -1 ? "#C2DEDC" : "#116A7B",
        },
        0,
        "easeOutExpo"
      );
    }
  },
  handleMouseDown: (id) => {
    let formula = _pianoChord.getFormula(id);
    let jqCode = [];
    formula.forEach((f) => {
      f.split(",").forEach((x) => {
        jqCode.push(x);
      });
    });
    let ms = 0;
    jqCode.forEach((it) => {
      setTimeout(() => {
        _pianoNote.handleMouseDown(it);
      }, ms);
      ms = ms + PianoStore.delayMs;
    });
    _pianoChord.handleAnimate(id, true);
    // chordInfo(formula.join(" - "));
  },
  handleMouseUp: (id) => {
    let formula = _pianoChord.getFormula(id);
    let jqCode = [];
    formula.forEach((f) => {
      f.split(",").forEach((x) => {
        jqCode.push(x);
      });
    });
    let ms = 0;
    jqCode.forEach((it) => {
      setTimeout(() => {
        _pianoNote.handleMouseUp(it);
      }, ms);
      ms = ms + PianoStore.delayMs;
    });
    _pianoChord.handleAnimate(id,false)
    // chordInfo(formula.join(" - "));
  },
};

const ChordList = () => {
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
          onMouseDown={(e) => _pianoChord.handleMouseDown(e.target.id)}
          onMouseUp={(e) => _pianoChord.handleMouseUp(e.target.id)}
        >
          {y.replace("Over", "/")}
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
};

const PianoChord = () => {
  return (
    <div id="chord" className="chord-container">
      {ChordList()}
    </div>
  );
};
