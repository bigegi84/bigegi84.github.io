const searchChord = (chRaw) => {
  const ch = chRaw.replace("#", "").replace("/", "Over");
  const chLine = ch.charAt(1) == "b" ? ch.substring(0, 2) : ch.charAt(0);
  return "chord-" + chLine + "-" + ch;
};
let playTimeout = [];
const _pianoSheet = {
  store: mobx.observable({
    selected: "Mahalini - Sisa Rasa Ritme",
    leftText: "",
    rightText: "",
  }),
  option: () => {
    let i = 0;
    const list = [];
    for (const key in song) {
      list.push(
        <option key={i} value={key}>
          {key}
        </option>
      );
      i++;
    }
    return list;
  },
  handleChange: (e) => {
    const selected = e.target.value;
    _pianoSheet.store.leftText = song[selected][0];
    _pianoSheet.store.rightText = song[selected][1];
  },
  playOne: (which) => {
    let sec = 0;
    const text = _pianoSheet.store[which];
    text.split(" ").forEach((it) => {
      const note = it.split("-")[0];
      const duration = parseFloat(it.split("-")[1]);
      const code = note
        .split(",")
        .map((n) => {
          if (n.search("#") == -1) return n;
          if (n.search("#") != -1) return searchChord(n);
        })
        .join(",");
      const timeoutA = setTimeout(() => {
        if (it.search("#") == -1) _pianoNote.handleMouseDown(code);
        if (it.search("#") != -1) _pianoChord.handleMouseDown(code);
      }, sec * 1000);
      const timeoutB = setTimeout(() => {
        if (it.search("#") == -1) _pianoNote.handleMouseUp(code);
        if (it.search("#") != -1) _pianoChord.handleMouseUp(code);
      }, (sec + duration) * 1000);
      sec += duration;
      playTimeout.push(timeoutA);
      playTimeout.push(timeoutB);
    });
  },
  handlePlay: () => {
    // _pianoSheet.playOne("leftText");
    _pianoSheet.playOne("rightText");
  },
};

const PianoSheet = () => {
  return (
    <div className="sheet-container">
      <div className="field">
        <label htmlFor="sheet-select">Lembar</label>
        <select
          onChange={(e) => _pianoSheet.handleChange(e)}
          name="sheet-select"
          id="sheet-select"
        >
          {_pianoSheet.option()}
        </select>
      </div>
      <div className="field">
        <label id="sheet-label-left" htmlFor="sheet-text-left">
          Kiri
        </label>
        <mobxReact.Observer>
          {() => {
            return (
              <textarea
                id="sheet-text-left"
                name="sheet-text-left"
                rows="4"
                cols="50"
                value={_pianoSheet.store.leftText}
                onChange={(e) => {
                  _pianoSheet.store.leftText = e.target.value;
                }}
              />
            );
          }}
        </mobxReact.Observer>
      </div>
      <div className="field">
        <label id="sheet-label-right" htmlFor="sheet-text-right">
          Kanan
        </label>
        <mobxReact.Observer>
          {() => {
            return (
              <textarea
                id="sheet-text-right"
                name="sheet-text-right"
                rows="4"
                cols="50"
                value={_pianoSheet.store.rightText}
                onChange={(e) => {
                  _pianoSheet.store.rightText = e.target.value;
                }}
              />
            );
          }}
        </mobxReact.Observer>
      </div>
      <button onClick={() => _pianoSheet.handlePlay()} id="play">
        Mainkan
      </button>
    </div>
  );
};
