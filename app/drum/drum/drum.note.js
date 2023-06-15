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
      const map = note.map((e) => "#drum-note-" + e);
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
      down: ([code]) => {
        drumNote.action.soundPlay([code]);
        drumNote.action.animate([code], true);
      },
      up: ([code]) => {
        drumNote.action.animate([code], false);
      },
    },
    soundPlay: (code) => {
      const promiseList = code.map(
        (it) =>
          new Promise(() => {
            $("#drum-sound-" + it)
              .clone()[0]
              .play();
          })
      );
      Promise.all(promiseList);
    },
  },
  noteList: () => {
    return drumState.note.map(([key, name, child], i) => (
      <div key={i}>
        {child.map(([cKey, cName, cUrl], cI) => (
          <div
            key={i}
            id={"drum-note-" + key + "-" + cKey}
            className="drum-note"
            onMouseDown={() => drumNote.action.mouse.down([code])}
            onMouseOut={() => drumNote.action.mouse.up([code])}
            onMouseUp={() => drumNote.action.mouse.up([code])}
          >
            {title}
            <br />"{code}"
          </div>
        ))}
      </div>
    ));

    const list = note.map(([code, title], i) => {
      return (
        <div
          key={i}
          id={"drum-note-" + code}
          className="drum-note"
          onMouseDown={() => drumNote.action.mouse.down([code])}
          onMouseOut={() => drumNote.action.mouse.up([code])}
          onMouseUp={() => drumNote.action.mouse.up([code])}
        >
          {title}
          <br />"{code}"
        </div>
      );
    });
    return <div className="row-a">{list}</div>;
  },
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
