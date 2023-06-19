const bassFret = {
  action: {
    animate: ([x, y], press = true) => {
      if (press)
        $("#fret-" + x + "-" + y).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      else
        $("#fret-" + x + "-" + y).animate({
          backgroundColor: "#deb887",
        });
    },
    findKey: ([x, y]) => {
      let res = "";
      for (const key in bassState.keymap) {
        const [xa, ya] = bassState.keymap[key];
        if (xa == parseInt(x) && ya == parseInt(y)) {
          res = key;
        }
      }
      return res;
    },
    mouse: {
      down: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("fret-", "").split("-");
        const note = bassState.fret[x][y];
        bassState.tone.triggerAttack([note]);
        bassFret.action.animate([x, y], true);
      },
      up: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("fret-", "").split("-");
        const note = bassState.fret[x][y];
        bassState.tone.triggerRelease(
          [note],
          bassStore.sustain.active
            ? Tone.now() + bassStore.sustain.ms / 1000
            : Tone.now()
        );
        bassFret.action.animate([x, y], false);
      },
    },
  },
  view: () => {
    const fret = bassState.fret;
    const view = [];
    for (const x in fret) {
      const fretLine = [];
      for (const y in fret[x]) {
        fretLine.push(
          <div
            key={y}
            id={"fret-" + x + "-" + y}
            className="bass-fret"
            onMouseDown={(e) => bassFret.action.mouse.down(e)}
            onMouseOut={(e) => bassFret.action.mouse.up(e)}
            onMouseUp={(e) => bassFret.action.mouse.up(e)}
          >
            {fret[x][y]}
            <br />
            {bassFret.action.findKey([x, y])}
          </div>
        );
      }
      view.push(
        <div key={x} id={"fret-" + x} className="bass-fret-line">
          {fretLine}
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
        {show ? <div>{view}</div> : null}
      </div>
    );
  },
};
