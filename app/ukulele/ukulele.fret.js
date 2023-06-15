const ukuleleFret = {
  action: {
    animate: ([x, y], press = true) => {
      if (press)
        $("#ukulele-fret-" + x + "-" + y).animate({
          backgroundColor: "#88FFAA",
        });
      if (!press) {
        $("#ukulele-fret-" + x + "-" + y).animate({
          backgroundColor: ukuleleStore.theme.fret.backgroundColor,
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
        const [x, y] = ukuleleState.keymap.Solo[type][e.key];
        ukuleleFret.action.sound.play([x, y]);
      },
      up: (e) => {
        const [mode, type] = ukuleleStore.mode;
        const [x, y] = ukuleleState.keymap.Solo[type][e.key];
        ukuleleFret.action.sound.stop([x, y]);
      },
    },
    mouse: {
      down: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("ukulele-fret-", "").split("-");
        ukuleleFret.action.sound.play([x, y]);
      },
      up: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("ukulele-fret-", "").split("-");
        ukuleleFret.action.sound.stop([x, y]);
      },
    },
    render: {
      fret: () => {
        const fretView = [];
        for (const x in ukuleleState.fret) {
          const yHtml = [];
          for (const y in ukuleleState.fret[x]) {
            yHtml.push(
              <div
                key={y}
                id={"ukulele-fret-" + x + "-" + y}
                className="ukulele-fret"
                onMouseDown={(e) => ukuleleFret.action.mouse.down(e)}
                onMouseOut={(e) => ukuleleFret.action.mouse.up(e)}
                onMouseUp={(e) => ukuleleFret.action.mouse.up(e)}
              >
                {ukuleleState.fret[x][y]}
                <mobxReact.Observer>
                  {() =>
                    ukuleleStore.mode[0] == "Solo"
                      ? ukuleleFret.action.findKey([x, y])
                      : null
                  }
                </mobxReact.Observer>
              </div>
            );
          }
          fretView.push(
            <div
              key={x}
              id="ukulele-fret-' + x + '"
              className="ukulele-fret-line"
            >
              {yHtml}
            </div>
          );
        }
        return fretView;
      },
    },
    sound: {
      play: ([x, y]) => {
        const note = ukuleleState.fret[x][y];
        ukuleleState.tone.triggerAttack([note]);
        ukuleleFret.action.animate([x, y], true);
      },
      stop: ([x, y]) => {
        const note = ukuleleState.fret[x][y];
        ukuleleState.tone.triggerRelease(
          [note],
          ukuleleStore.sustain.active
            ? Tone.now() + ukuleleStore.sustain.ms / 1000
            : Tone.now()
        );
        ukuleleFret.action.animate([x, y], false);
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
            Fret
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
          <div>
            <ukuleleFret.action.render.fret />
          </div>
        ) : null}
      </div>
    );
  },
};
