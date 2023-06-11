const searchChord = (chRaw) => {
  const ch = chRaw.replace("#", "").replace("/", "Over");
  const chLine = ch.charAt(1) == "b" ? ch.substring(0, 2) : ch.charAt(0);
  return "chord-" + chLine + "-" + ch;
};
let playTimeout = [];
const PianoSheet = {
  store: mobx.observable({
    selected: "bigegi84 - Omong Kosong",
    playing: false,
    playText: "Mainkan",
    song,
  }),
  action: {
    change: (e) => {
      const selected = e.target.value;
      PianoSheet.store.selected = selected;
    },
    option: () => {
      let i = 0;
      const list = [];
      for (const key in PianoSheet.store.song) {
        list.push(
          <option key={i} value={key}>
            {key}
          </option>
        );
        i++;
      }
      return list;
    },
    play: () => {
      const selected = PianoSheet.store.selected;
      const currentSong = PianoSheet.store.song[selected];
      currentSong.map(([name, value], ia) => {
        let text = [];
        value.forEach(([part, pValue, enable], ib) => {
          if (enable) text.push(pValue);
        });
        PianoSheet.action.playText(text.join(" "));
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
          if (it.search("#") == -1) PianoNote.action.mouseDown(code);
          if (it.search("#") != -1) PianoChord.action.mouseDown(code);
        }, sec * 1000);
        const timeoutB = setTimeout(() => {
          if (it.search("#") == -1) PianoNote.action.mouseUp(code);
          if (it.search("#") != -1) PianoChord.action.mouseUp(code);
        }, (sec + duration) * 1000);
        sec += duration;
        playTimeout.push(timeoutA);
        playTimeout.push(timeoutB);
      });
    },
    sheetList: () => {
      const selected = PianoSheet.store.selected;
      const currentSong = PianoSheet.store.song[selected];
      return PianoSheet.store.song[selected].map(([name, value], ia) => {
        return (
          <div key={ia} className="column-a">
            <strong>{name}</strong>
            {value.map(([part, pValue], ib) => {
              return (
                <div key={ib} className="field column-a">
                  <input
                    type="text"
                    value={currentSong[ia][1][ib][0]}
                    onChange={(e) =>
                      (currentSong[ia][1][ib][0] = e.target.value)
                    }
                    onFocus={() => (PianoStore.keymapActive = false)}
                  />
                  <textarea
                    rows="2"
                    cols="50"
                    value={currentSong[ia][1][ib][1]}
                    onChange={(e) =>
                      (currentSong[ia][1][ib][1] = e.target.value)
                    }
                    onFocus={() => (PianoStore.keymapActive = false)}
                  />
                  <div className="row-a">
                    <i
                      className={
                        "fas" +
                        (!currentSong[ia][1][ib][2] ? " fa-ban" : " fa-music")
                      }
                      onClick={() => {
                        const enable = currentSong[ia][1][ib][2];
                        if (enable) {
                          currentSong[ia][1][ib][2] = false;
                        } else {
                          currentSong[ia][1][ib][2] = true;
                        }
                      }}
                    />
                    <i
                      className={
                        "fas" +
                        (PianoSheet.store.playing ? " fa-stop" : " fa-play")
                      }
                      onClick={() => {
                        if (!PianoSheet.store.playing) {
                          PianoSheet.store.playing = true;
                          PianoSheet.playText(currentSong[ia][1][ib][1]);
                        } else {
                          PianoSheet.store.playing = false;
                          PianoSheet.action.stop();
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
                </div>
              );
            })}
          </div>
        );
      });
    },
    stop: () => {
      playTimeout.forEach((it) => clearTimeout(it));
      PianoNote.action.soundClear();
      PianoNote.action.animateClear();
      PianoChord.action.animateClear();
      playTimeout = [];
    },
  },
  view: () => {
    const [sheetShow, setSheetShow] = React.useState(false);
    const [menuShow, setMenuShow] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong style={{ alignSelf: "center" }}>Lembar</strong>
          <div className="circle-a" onClick={() => setSheetShow(!sheetShow)}>
            <i
              className={
                "fas" + (sheetShow ? " fa-angle-up" : " fa-angle-down")
              }
            />
          </div>
        </div>
        {sheetShow ? (
          <div className="column-a">
            <div className="field">
              <select
                onChange={(e) => PianoSheet.action.change(e)}
                name="sheet-select"
                id="sheet-select"
              >
                {PianoSheet.action.option()}
              </select>
            </div>
            <div className="row-a">
              <mobxReact.Observer>
                {() => PianoSheet.action.sheetList()}
              </mobxReact.Observer>
            </div>
          </div>
        ) : null}
        <div className="row-a">
          <strong style={{ alignSelf: "center" }}>Menu</strong>
          <div className="circle-a" onClick={() => setMenuShow(!menuShow)}>
            <i
              className={"fas" + (menuShow ? " fa-angle-up" : " fa-angle-down")}
            />
          </div>
        </div>
        {menuShow ? (
          <div className="row-a">
            <a id="downloadA" style={{ display: "none" }}></a>
            <button
              onClick={() => {
                const selected = PianoSheet.store.selected;
                const dataStr =
                  "data:text/json;charset=utf-8," +
                  encodeURIComponent(
                    JSON.stringify(PianoSheet.store.song[selected])
                  );
                const dlAnchorElem = document.getElementById("downloadA");
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute("download", selected + ".json");
                dlAnchorElem.click();
              }}
            >
              Export
            </button>
            <mobxReact.Observer>
              {() => (
                <button
                  className="button small"
                  onClick={() => {
                    if (!PianoSheet.store.playing) {
                      PianoSheet.store.playing = true;
                      PianoSheet.store.playText = "Berhenti";
                      PianoSheet.action.play();
                    } else {
                      PianoSheet.store.playing = false;
                      PianoSheet.store.playText = "Mainkan";
                      PianoSheet.action.stop();
                    }
                  }}
                  id="play"
                >
                  {PianoSheet.store.playText}
                </button>
              )}
            </mobxReact.Observer>
          </div>
        ) : null}
      </div>
    );
  },
};
