const bassFret = {
  action: {
    mouse: {
      down: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("fret-", "").split("-");
        const note = bassState.fret[x][y];
        bassState.tone.triggerAttack([note]);
        // fretAnimate([fretLine, fretNumber], true);
      },
      up: (e) => {
        const id = e.currentTarget.id;
        const [x, y] = id.replace("fret-", "").split("-");
        const note = bassState.fret[x][y];
        bassState.tone.triggerRelease([note]);
      },
    },
  },
  view: () => {
    const fret = bassState.fret;
    const view = [];
    for (var x in fret) {
      const fretLine = [];
      for (var y in fret[x]) {
        fretLine.push(
          <div
            key={y}
            id={"fret-" + x + "-" + y}
            className="fret"
            onMouseDown={(e) => bassFret.action.mouse.down(e)}
            onMouseUp={(e) => bassFret.action.mouse.up(e)}
          >
            {fret[x][y]}
          </div>
        );
      }
      view.push(
        <div key={x} id={"fret-" + x} className="fret-line">
          {fretLine}
        </div>
      );
    }
    return <div>{view}</div>;
  },
};
