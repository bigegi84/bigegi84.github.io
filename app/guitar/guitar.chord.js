const guitarChord = {
  action: {
    animate: ([x, y], press = true) => {
      if (press)
        $("#guitar-chord-" + x + "-" + y).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      if (!press) {
        $("#guitar-chord-" + x + "-" + y).animate({
          backgroundColor:
            x.search("b") == -1
              ? guitarStore.theme.chord.backgroundColor
              : guitarStore.theme.chordMol.backgroundColor,
        });
      }
    },
    findKey: ([x, y]) => {
      let res = null;
      const [mode, type] = guitarStore.mode;
      for (const key in guitarState.keymap[mode][type]) {
        const [kx, ky] = guitarState.keymap[mode][type][key];
        if (kx == x && ky == y) {
          res = <div>{key.replace("Arrow", "")}</div>;
        }
      }
      return res;
    },
    key: {
      down: (e) => {
        if (e.key == " ") e.preventDefault();
        const [mode, type] = guitarStore.mode;
        const code = guitarState.keymap.Chord[type][e.key];
        if (code == "lastChord") {
          guitarChord.action.sound.play(guitarState.lastChord);
        } else {
          const [x, y] = guitarState.keymap.Chord[type][e.key];
          guitarChord.action.sound.play([x, y]);
        }
      },
      up: (e) => {
        const [mode, type] = guitarStore.mode;
        const code = guitarState.keymap.Chord[type][e.key];
        if (code == "lastChord") {
          guitarChord.action.sound.stop(guitarState.lastChord);
        } else {
          const [x, y] = guitarState.keymap.Chord[type][e.key];
          guitarChord.action.sound.stop([x, y]);
        }
      },
    },
    mouse: {
      down: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("guitar-chord-", "").split("-");
        guitarChord.action.sound.play([x, y]);
      },
      up: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("guitar-chord-", "").split("-");
        guitarChord.action.sound.stop([x, y]);
      },
    },
    rederChord: () => {
      const view = [];
      for (const x in guitarState.chord) {
        const yHtml = [];
        for (const y in guitarState.chord[x]) {
          yHtml.push(
            <div
              key={y}
              id={"guitar-chord-" + x + "-" + y}
              className={
                y.search("b") == -1 ? "guitar-chord" : "guitar-chord-mol"
              }
              onMouseDown={(e) => guitarChord.action.mouse.down(e)}
              onMouseOut={(e) => guitarChord.action.mouse.up(e)}
              onMouseUp={(e) => guitarChord.action.mouse.up(e)}
            >
              {y}
              <mobxReact.Observer>
                {() =>
                  guitarStore.mode[0] == "Chord"
                    ? guitarChord.action.findKey([x, y])
                    : null
                }
              </mobxReact.Observer>
            </div>
          );
        }
        view.push(
          <div key={x} id={"guitar-chord-line-" + x} className="column-a">
            {yHtml}
          </div>
        );
      }
      return <div className="row-a">{view}</div>;
    },
    sound: {
      play: ([x, y]) => {
        guitarState.lastChord = [x, y];
        const chord = guitarState.chord[x][y];
        const formula = [];
        for (var i = 0; i < chord.length; i++) {
          if (chord.charAt(i) && chord.charAt(i) != "x")
            formula.push([6 - i, chord.charAt(i)]);
        }
        let ms = 0;
        formula.forEach(([nx, ny]) => {
          setTimeout(() => {
            const note = guitarState.fret[nx][ny];
            guitarState.tone[guitarState.tone.value].triggerAttack([note]);
            guitarFret.action.animate([nx, ny]);
          }, ms);
          ms = ms + guitarStore.chord.delay.ms;
        });
        guitarChord.action.animate([x, y], true);
      },
      stop: ([x, y]) => {
        const chord = guitarState.chord[x][y];
        const formula = [];
        for (var i = 0; i < chord.length; i++) {
          formula.push([6 - i, chord.charAt(i)]);
        }
        let ms = 0;
        formula.forEach(([nx, ny]) => {
          setTimeout(() => {
            const note = guitarState.fret[nx][ny];
            guitarState.tone[guitarState.tone.value].triggerRelease(
              [note],
              guitarStore.sustain.active
                ? Tone.now() + guitarStore.sustain.ms / 1000
                : Tone.now()
            );
            guitarFret.action.animate([nx, ny], false);
          }, ms);
          ms = ms + guitarStore.chord.delay.ms;
        });
        guitarChord.action.animate([x, y], false);
      },
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
            {bigegi84localization["Chord"]["id"]}
          </strong>
          <div
            style={bigegi84theme.styleCircle}
            className="circle-a"
            onClick={() => setShow(!show)}
          >
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? guitarChord.action.rederChord() : null}
      </div>
    );
  },
};
