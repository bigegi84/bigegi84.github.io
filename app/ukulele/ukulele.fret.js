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
    mouse: {
      down: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("ukulele-fret-", "").split("-");
        const note = ukuleleState.fret[x][y];
        ukuleleState.tone.triggerAttack([note]);
        ukuleleFret.action.animate([x, y], true);
      },
      up: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("ukulele-fret-", "").split("-");
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
    const fretView = [];
    for (var x in ukuleleState.fret) {
      const yHtml = [];
      for (var y in ukuleleState.fret[x]) {
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
          </div>
        );
      }
      fretView.push(
        <div key={x} id="ukulele-fret-' + x + '" className="ukulele-fret-line">
          {yHtml}
        </div>
      );
    }
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
        {show ? <div>{fretView}</div> : null}
      </div>
    );
  },
};
