const pianoNote = {
  action: {
    animate: (note, press = true) => {
      if (press)
        $("#piano-note-" + note).animate(
          {
            backgroundColor: "#88FFAA",
          },
          300
        );
      if (!press) {
        $("#piano-note-" + note).animate({
          backgroundColor:
            note.search("b") == -1
              ? pianoStore.theme.pianoWhite.backgroundColor
              : pianoStore.theme.pianoBlack.backgroundColor,
        });
      }
    },
    animateClear: () => {
      $(".piano-note").each((i, obj) => {
        const note = obj.id.replace("piano-note-", "");
        $("#" + obj.id).animate({
          backgroundColor:
            note.search("b") == -1
              ? pianoStore.theme.pianoWhite.backgroundColor
              : pianoStore.theme.pianoBlack.backgroundColor,
        });
      });
    },
    mouseDown: (note) => {
      if (note != null && note != "") {
        pianoState.tone.triggerAttack([note]);
        pianoNote.action.animate(note, true);
        pianoStore.info.pressed.push(note);
      }
    },
    mouseUp: (note) => {
      pianoState.tone.triggerRelease(
        [note],
        pianoStore.sustaining
          ? Tone.now() + pianoStore.sustainMs / 1000
          : Tone.now()
      );
      pianoNote.action.animate(note, false);
      pianoStore.info.pressed.pop(note);
    },
    noteList: pianoState.note.map((it, i) => {
      if (it.search("b") == -1) {
        return (
          <div
            key={i}
            id={"piano-note-" + it}
            className={"note piano-white piano-" + it}
            onMouseDown={() => pianoNote.action.mouseDown(it)}
            onMouseUp={() => pianoNote.action.mouseUp(it)}
          >
            <p className="piano-note-info-white">{it}</p>
          </div>
        );
      } else {
        return (
          <div key={i} className="piano-black">
            <div
              id={"piano-note-" + it}
              className={"note piano-black-raised piano-" + it}
              onMouseDown={() => pianoNote.action.mouseDown(it)}
              onMouseUp={() => pianoNote.action.mouseUp(it)}
            >
              <p className="piano-note-info-black">{it}</p>
            </div>
          </div>
        );
      }
    }),
    soundClear: () => {
      pianoState.tone.triggerRelease(pianoState.note);
    },
  },
  view: () => {
    const [show, setShow] = React.useState(true);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            Piano
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
          <div className="piano">
            <div className="piano-container">
              <span className="piano-brand">bigegi84</span>
              <mobxReact.Observer>
                {() => (
                  <span className="piano-brand">
                    {pianoStore.info.pressed.join(" ")}
                  </span>
                )}
              </mobxReact.Observer>
              <div className="piano-keys">{pianoNote.action.noteList}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
