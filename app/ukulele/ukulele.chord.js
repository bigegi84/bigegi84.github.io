const ukuleleChord = {
  action: {
    animate: ([x, y], press = true) => {
      if (press)
        $("#ukulele-chord-" + x + "-" + y).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      if (!press) {
        $("#ukulele-chord-" + x + "-" + y).animate({
          backgroundColor:
            x.search("b") == -1
              ? ukuleleStore.theme.chord.backgroundColor
              : ukuleleStore.theme.chordMol.backgroundColor,
        });
      }
    },
    findKey: ([x, y]) => {
      let res = null;
      const [mode, type] = ukuleleStore.mode;
      for (const key in ukuleleState.keymap[mode][type]) {
        const [kx, ky] = ukuleleState.keymap[mode][type][key];
        if (kx == x && ky == y) {
          res = <div>{key.replace("Arrow", "")}</div>;
        }
      }
      return res;
    },
    key: {
      down: (e) => {
        const [mode, type] = ukuleleStore.mode;
        const [x, y] = ukuleleState.keymap.Chord[type][e.key];
        ukuleleChord.action.sound.play([x, y]);
      },
      up: (e) => {
        const [mode, type] = ukuleleStore.mode;
        const [x, y] = ukuleleState.keymap.Chord[type][e.key];
        ukuleleChord.action.sound.stop([x, y]);
      },
    },
    mouse: {
      down: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("ukulele-chord-", "").split("-");
        ukuleleChord.action.sound.play([x, y]);
      },
      up: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("ukulele-chord-", "").split("-");
        ukuleleChord.action.sound.stop([x, y]);
      },
    },
    rederChord: () => {
      const view = [];
      for (const x in ukuleleState.chord) {
        const yHtml = [];
        for (const y in ukuleleState.chord[x]) {
          yHtml.push(
            <div
              key={y}
              id={"ukulele-chord-" + x + "-" + y}
              className={
                y.search("b") == -1 ? "ukulele-chord" : "ukulele-chord-mol"
              }
              onMouseDown={(e) => ukuleleChord.action.mouse.down(e)}
              onMouseOut={(e) => ukuleleChord.action.mouse.up(e)}
              onMouseUp={(e) => ukuleleChord.action.mouse.up(e)}
            >
              {y}
              <mobxReact.Observer>
                {() =>
                  ukuleleStore.mode[0] == "Chord"
                    ? ukuleleChord.action.findKey([x, y])
                    : null
                }
              </mobxReact.Observer>
            </div>
          );
        }
        view.push(
          <div key={x} id={"ukulele-chord-line-" + x} className="column-a">
            {yHtml}
          </div>
        );
      }
      return <div className="row-a">{view}</div>;
    },
    sound: {
      play: ([x, y]) => {
        const chord = ukuleleState.chord[x][y];
        const formula = [];
        for (var i = 0; i < chord.length; i++) {
          formula.push([4 - i, chord.charAt(i)]);
        }
        let ms = 0;
        formula.forEach(([nx, ny]) => {
          setTimeout(() => {
            const note = ukuleleState.fret[nx][ny];
            ukuleleState.tone.triggerAttack([note]);
            ukuleleFret.action.animate([nx, ny]);
          }, ms);
          ms = ms + ukuleleStore.chord.delay.ms;
        });
        ukuleleChord.action.animate([x, y], true);
      },
      stop: ([x, y]) => {
        const chord = ukuleleState.chord[x][y];
        const formula = [];
        for (var i = 0; i < chord.length; i++) {
          formula.push([4 - i, chord.charAt(i)]);
        }
        let ms = 0;
        formula.forEach(([nx, ny]) => {
          setTimeout(() => {
            const note = ukuleleState.fret[nx][ny];
            ukuleleState.tone.triggerRelease(
              [note],
              ukuleleStore.sustain.active
                ? Tone.now() + ukuleleStore.sustain.ms / 1000
                : Tone.now()
            );
            ukuleleFret.action.animate([nx, ny], false);
          }, ms);
          ms = ms + ukuleleStore.chord.delay.ms;
        });
        ukuleleChord.action.animate([x, y], false);
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
        {show ? ukuleleChord.action.rederChord() : null}
      </div>
    );
  },
};
