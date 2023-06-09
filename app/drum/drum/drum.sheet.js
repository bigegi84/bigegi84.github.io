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
  handleChange: (e) => {
    const selected = e.target.value;
    drumSheet.store.leftText = drumSheet.store.song[selected][0];
    drumSheet.store.rightText = drumSheet.store.song[selected][1];
  },
  action: {
    play: () => {
      const selected = drumSheet.store.selected;
      const [bpm, text] = drumSheet.store.song[selected];
      drumSheet.action.playText([bpm, text]);
    },
    playText: ([bpm, text]) => {
      const playTimeout = drumSheet.state.playTimeout;
      const bps = bpm / 60;
      const ms = 1000 / bps;
      let sec = 0;
      text.split(" ").forEach((it) => {
        const [note, duration] = it.split("-");
        const timeoutA = setTimeout(() => {
          drumNote.action.soundPlay([note]);
        }, sec * ms);
        sec += parseFloat(duration);
        playTimeout.push(timeoutA);
      });
    },
    stop: () => {
      let playTimeout = drumSheet.state.playTimeout;
      playTimeout.forEach((it) => clearTimeout(it));
      // $(".chord").mouseup();
      // $(".note").mouseup();
      playTimeout = [];
    },
  },
  form: () => {
    const selected = drumSheet.store.selected;
    const currentSong = drumSheet.store.song[selected];
    const [bpm, text] = drumSheet.store.song[selected];
    const iBpm = 0;
    const iText = 1;
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
          <textarea
            rows="2"
            cols="50"
            value={currentSong[iText]}
            onChange={(e) => (currentSong[iText] = e.target.value)}
            //   onFocus={() => (PinoStore.keymapActive = false)}
          />
        </div>
      </div>
    );
  },
  view: () => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong style={{ alignSelf: "center" }}>Lembar</strong>
          <div className="circle-a" onClick={() => setShow(!show)}>
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? (
          <div className="column-a">
            <div className="field">
              <select
                onChange={(e) => drumSheet.handleChange(e)}
                name="sheet-select"
                id="sheet-select"
              >
                {drumSheet.option()}
              </select>
            </div>
            <div className="row-a">
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
            dlAnchorElem.setAttriute("href", dataStr);
            dlAnchorElem.setAttriute("download", selected + ".json");
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
      </div>
    );
  },
};
