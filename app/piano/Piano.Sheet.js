const searchChord = (chRaw) => {
  const ch = chRaw.replace("#", "").replace("/", "Over");
  const chLine = ch.charAt(1) == "b" ? ch.substring(0, 2) : ch.charAt(0);
  return "chord-" + chLine + "-" + ch;
};
let playTimeout = [];
const _pianoSheet = {
  store: mobx.observable({
    selected: "Mahalini - Sisa Rasa Ritme",
    playing: false,
    song,
  }),
  option: () => {
    let i = 0;
    const list = [];
    for (const key in _pianoSheet.store.song) {
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
    _pianoSheet.store.leftText = _pianoSheet.store.song[selected][0];
    _pianoSheet.store.rightText = _pianoSheet.store.song[selected][1];
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
  playText: (text) => {
    let sec = 0;
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
  action: {
    stop: () => {
      playTimeout.forEach((it) => clearTimeout(it));
      // $(".chord").mouseup();
      // $(".note").mouseup();
      playTimeout = [];
    },
  },
};

const SheetList = () => {
  const selected = _pianoSheet.store.selected;
  const currentSong = _pianoSheet.store.song[selected];
  return _pianoSheet.store.song[selected].map(([name, value], ia) => {
    return (
      <div key={ia}>
        <strong>{name}</strong>
        {value.map(([part, pValue], ib) => {
          return (
            <div key={ib} className="field">
              <input
                type="text"
                value={currentSong[ia][1][ib][0]}
                onChange={(e) => (currentSong[ia][1][ib][0] = e.target.value)}
                onFocus={() => (PianoStore.keymapActive = false)}
              />
              <textarea
                rows="4"
                cols="50"
                value={currentSong[ia][1][ib][1]}
                onChange={(e) => (currentSong[ia][1][ib][1] = e.target.value)}
                onFocus={() => (PianoStore.keymapActive = false)}
              />
              <i
                className={
                  "fas" + (_pianoSheet.store.playing ? " fa-stop" : " fa-play")
                }
                onClick={() => {
                  if (!_pianoSheet.store.playing) {
                    _pianoSheet.store.playing = true;
                    _pianoSheet.playText(currentSong[ia][1][ib][1]);
                  } else {
                    _pianoSheet.store.playing = false;
                    _pianoSheet.action.stop();
                  }
                }}
              />
              <i
                className="fas fa-plus"
                onClick={() => {
                  currentSong[ia][1].push(["", ""]);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  });
};

const PianoSheet = () => {
  React.useEffect(() => {
    const selected = _pianoSheet.store.selected;
    _pianoSheet.store.leftText = _pianoSheet.store.song[selected][0];
    _pianoSheet.store.rightText = _pianoSheet.store.song[selected][1];
  });
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
      <mobxReact.Observer>{() => SheetList()}</mobxReact.Observer>
      <a id="downloadA" style={{ display: "none" }}></a>
      <button
        onClick={() => {
          const selected = _pianoSheet.store.selected;
          const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(
              JSON.stringify(_pianoSheet.store.song[selected])
            );
          const dlAnchorElem = document.getElementById("downloadA");
          dlAnchorElem.setAttribute("href", dataStr);
          dlAnchorElem.setAttribute("download", selected + ".json");
          dlAnchorElem.click();
        }}
      >
        Export
      </button>
      <button onClick={() => _pianoSheet.handlePlay()} id="play">
        Mainkan
      </button>
    </div>
  );
};
