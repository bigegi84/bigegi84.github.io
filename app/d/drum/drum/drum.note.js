const drumNote = {
  state: {
    bpm: 0,
    lastTime: null,
    note: [
      ["b", "Bass"],
      ["s", "Snare"],
      ["hc", "Hihat Closed"],
      ["ho", "Hihat Open"],
      ["c", "Crash"],
      ["rc", "Ride Crash"],
      ["ts", "Tomtom Small"],
      ["tm", "Tomtom Medium"],
      ["tf", "Tomtom Floor"],
    ],
  },
  action: {
    animate: (note, press = true) => {
      const map = note.map(([x, y]) => {
        const [key, , child] = drumState.note[x];
        const [cKey, ,] = child[y];
        return `#drum-note-${key}-${cKey}`;
      });
      if (press) {
        $(map.join(",")).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      } else {
        $(map.join(",")).animate(
          {
            backgroundColor: "#526d82",
          },
          0
        );
      }
    },
    mouse: {
      down: ([x, y]) => {
        drumNote.action.soundPlay([[x, y]]);
        drumNote.action.animate([[x, y]], true);
      },
      up: ([x, y]) => {
        drumNote.action.animate([[x, y]], false);
      },
    },
    soundPlay: (code) => {
      Promise.all(
        code.map(([x, y]) => {
          const [key, , child] = drumState.note[x];
          const [cKey, ,] = child[y];
          return new Promise(() => {
            $("#drum-sound-" + key + "-" + cKey)
              .clone()[0]
              .play();
          });
        })
      );
    },
  },
  noteList: () =>
    drumState.note.map(([key, name, child], i) => (
      <div key={i} className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            {name}
          </strong>
        </div>
        <div className="row-a">
          {child.map(([cKey, cName], cI) => (
            <div
              key={cI}
              id={"drum-note-" + key + "-" + cKey}
              className="drum-note"
              onMouseDown={() => drumNote.action.mouse.down([i, cI])}
              onMouseOut={() => drumNote.action.mouse.up([i, cI])}
              onMouseUp={() => drumNote.action.mouse.up([i, cI])}
            >
              {cName}
              <br />"{cKey}"
            </div>
          ))}
        </div>
      </div>
    )),
  view: () => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            Not
          </strong>
          <div
            style={bigegi84theme.styleCircle}
            className="circle-a"
            onClick={() => setShow(!show)}
          >
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? drumNote.noteList() : null}
      </div>
    );
  },
};
