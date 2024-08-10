const drumSheet = {
  state: {
    playTimeout: [],
  },
  store: mobx.observable({
    selected: "Blast",
    playing: false,
    playText: "Mainkan",
    song: drumSong,
  }),
  option: () => {
    let i = 0;
    const list = [];
    for (const key in drumSheet.store.song) {
      list.push(
        <option key={i} value={key}>
          {key}
        </option>
      );
      i++;
    }
    return list;
  },
  action: {
    change: (e) => {
      drumSheet.store.selected = e.target.value;
    },
    play: () => {
      const selected = drumSheet.store.selected;
      const [bpm, text] = drumSheet.store.song[selected];
      const sheet = text.map((it) => it[1]).join(" ");
      document.getElementById("sound-sheet").play();
      document.getElementById("sound-sheet").volume = 0.2;
      drumSheet.action.playText([bpm, sheet]);
    },
    playText: ([bpm, text]) => {
      const playTimeout = drumSheet.state.playTimeout;
      const bps = bpm / 60;
      const ms = 1000 / bps;
      let sec = 0;
      text.split(" ").forEach((it) => {
        const [note, duration] = it.split("-");
        const timeoutA = setTimeout(() => {
          if (note != "break") {
            drumNote.action.soundPlay(note.split(","));
            drumNote.action.animate(note.split(","), true);
          }
        }, sec * ms);
        const timeoutB = setTimeout(() => {
          if (note != "break") drumNote.action.animate(note.split(","), false);
        }, (sec + 0.1) * ms);
        sec += parseFloat(duration);
        playTimeout.push(timeoutA);
        playTimeout.push(timeoutB);
      });
    },
    stop: () => {
      document.getElementById("sound-sheet").pause();
      document.getElementById("sound-sheet").currentTime = 0;
      let playTimeout = drumSheet.state.playTimeout;
      playTimeout.forEach((it) => clearTimeout(it));
      // $(".chord").mouseup();
      // $(".note").mouseup();
      playTimeout = [];
    },
    upload: (e) => {
      var sound = document.getElementById("sound-sheet");
      var reader = new FileReader();
      reader.onload = function (e) {
        sound.src = this.result;
        sound.controls = true;
        console.log("file ready");
        // sound.play();
      };
      reader.readAsDataURL(e.target.files[0]);
    },
  },
  form: () => {
    const selected = drumSheet.store.selected;
    const currentSong = drumSheet.store.song[selected];
    const [bpm, text] = drumSheet.store.song[selected];
    const iBpm = 0;
    const iText = 1;
    const iName = 0;
    const iValue = 1;
    const iEnable = 2;
    return (
      <div className="column-a">
        <div className="field column-a">
          <strong>BPM: {bpm}</strong>
          <input
            type="number"
            value={currentSong[iBpm]}
            onChange={(e) => (currentSong[iBpm] = parseFloat(e.target.value))}
            // onFocus={() => (PinoStore.keymapActive = false)}
          />
          {text.map(([], i) => (
            <div key={i} className="column-a">
              <input
                type="text"
                value={currentSong[iText][i][iName]}
                onChange={(e) =>
                  (currentSong[iText][i][iName] = e.target.value)
                }
              />
              <textarea
                rows="2"
                cols="50"
                value={currentSong[iText][i][iValue]}
                onChange={(e) =>
                  (currentSong[iText][i][iValue] = e.target.value)
                }
              />
              <div className="row-a">
                <i
                  className={
                    "fas" +
                    (!currentSong[iText][i][iEnable] ? " fa-ban" : " fa-music")
                  }
                  onClick={() => {
                    const enable = currentSong[iText][i][iEnable];
                    if (enable) {
                      currentSong[iText][i][iEnable] = false;
                    } else {
                      currentSong[iText][i][iEnable] = true;
                    }
                  }}
                />
                <i
                  className={
                    "fas" + (drumSheet.store.playing ? " fa-stop" : " fa-play")
                  }
                  onClick={() => {
                    if (!drumSheet.store.playing) {
                      drumSheet.store.playing = true;
                      drumSheet.playText(currentSong[iText][i][iValue]);
                    } else {
                      drumSheet.store.playing = false;
                      drumSheet.action.stop();
                    }
                  }}
                />
                <i
                  className="fas fa-plus"
                  onClick={() => {
                    currentSong[iText].push(["", "", false]);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  view: () => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="column-a">
        <div className="column-a">
          <strong style={{ alignSelf: "center" }}>Lembar</strong>
          <div className="circle-a" onClick={() => setShow(!show)}>
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? (
          <div className="column-a">
            <div className="field">
              <select
                onChange={(e) => drumSheet.action.change(e)}
                name="sheet-select"
                id="sheet-select"
              >
                {drumSheet.option()}
              </select>
            </div>
            <div className="column-a">
              <mobxReact.Observer>{() => drumSheet.form()}</mobxReact.Observer>
            </div>
          </div>
        ) : null}
        <a id="downloadA" style={{ display: "none" }}></a>
        <button
          onClick={() => {
            const selected = drumSheet.store.selected;
            const dataStr =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(
                JSON.stringify(drumSheet.store.song[selected])
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
                if (!drumSheet.store.playing) {
                  drumSheet.store.playing = true;
                  drumSheet.store.playText = "Berhenti";
                  drumSheet.action.play();
                } else {
                  drumSheet.store.playing = false;
                  drumSheet.store.playText = "Mainkan";
                  drumSheet.action.stop();
                }
              }}
              id="play"
            >
              {drumSheet.store.playText}
            </button>
          )}
        </mobxReact.Observer>
        <mobxReact.Observer>
          {() => (
            <div>
              <audio id="sound-sheet"></audio>
              <input
                type="file"
                id="musicFile"
                onChange={(e) => drumSheet.action.upload(e)}
                accept="audio/*"
              />
            </div>
          )}
        </mobxReact.Observer>
      </div>
    );
  },
};
