const guitarFret = {
  action: {
    animate: ([x, y], press = true) => {
      if (press)
        $("#guitar-fret-" + x + "-" + y).animate({
          backgroundColor: "#88FFAA",
        });
      if (!press) {
        $("#guitar-fret-" + x + "-" + y).animate({
          backgroundColor: guitarStore.theme.fret.backgroundColor,
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
        const [mode, type] = guitarStore.mode;
        const [x, y] = guitarState.keymap.Solo[type][e.key];
        guitarFret.action.sound.play([x, y]);
      },
      up: (e) => {
        const [mode, type] = guitarStore.mode;
        const [x, y] = guitarState.keymap.Solo[type][e.key];
        guitarFret.action.sound.stop([x, y]);
      },
    },
    mouse: {
      down: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("guitar-fret-", "").split("-");
        guitarFret.action.sound.play([x, y]);
      },
      up: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("guitar-fret-", "").split("-");
        guitarFret.action.sound.stop([x, y]);
      },
    },
    render: {
      fret: () => {
        const fretView = [];
        for (const x in guitarState.fret) {
          const yHtml = [];
          for (const y in guitarState.fret[x]) {
            yHtml.push(
              <div
                key={y}
                id={"guitar-fret-" + x + "-" + y}
                className="guitar-fret"
                onMouseDown={(e) => guitarFret.action.mouse.down(e)}
                onMouseOut={(e) => guitarFret.action.mouse.up(e)}
                onMouseUp={(e) => guitarFret.action.mouse.up(e)}
              >
                {guitarState.fret[x][y]}
                <mobxReact.Observer>
                  {() =>
                    guitarStore.mode[0] == "Solo"
                      ? guitarFret.action.findKey([x, y])
                      : null
                  }
                </mobxReact.Observer>
              </div>
            );
          }
          fretView.push(
            <div key={x} id={"guitar-fret-" + x} className="guitar-fret-line">
              {yHtml}
            </div>
          );
        }
        return fretView;
      },
    },
    sound: {
      play: ([x, y]) => {
        const note = guitarState.fret[x][y];
        guitarState.tone[guitarState.tone.value].triggerAttack([note]);
        guitarFret.action.animate([x, y], true);
      },
      stop: ([x, y]) => {
        const note = guitarState.fret[x][y];
        guitarState.tone[guitarState.tone.value].triggerRelease(
          [note],
          guitarStore.sustain.active
            ? Tone.now() + guitarStore.sustain.ms / 1000
            : Tone.now()
        );
        guitarFret.action.animate([x, y], false);
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
            <guitarFret.action.render.fret />
          </div>
        ) : null}
      </div>
    );
  },
};
