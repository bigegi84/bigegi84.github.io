const PianoNote = {
  action: {
    animate: (note, press = true) => {
      if (press)
        $("#note-" + note).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      if (!press) {
        $("#note-" + note).animate({
          backgroundColor:
            note.search("b") == -1
              ? PianoStore.theme.pianoWhite.backgroundColor
              : PianoStore.theme.pianoBlack.backgroundColor,
        });
      }
    },
    animateClear: () => {
      $(".note").each((i, obj) => {
        const note = obj.id.replace("note-", "");
        $("#" + obj.id).animate({
          backgroundColor:
            note.search("b") == -1
              ? PianoStore.theme.pianoWhite.backgroundColor
              : PianoStore.theme.pianoBlack.backgroundColor,
        });
      });
    },
    mouseDown: (note) => {
      if (note != null && note != "") {
        PianoState.tone.triggerAttack([note]);
        PianoNote.action.animate(note, true);
      }
    },
    mouseUp: (note) => {
      if (PianoStore.sustaining)
        PianoState.tone.triggerRelease(
          [note],
          Tone.now() + PianoStore.sustainMs / 1000
        );
      if (!PianoStore.sustaining) PianoState.tone.triggerRelease([note]);
      PianoNote.action.animate(note, false);
    },
    noteList: PianoState.note.map((it, i) => {
      if (it.search("b") == -1) {
        return (
          <div
            key={i}
            id={"note-" + it}
            className={"note piano-white piano-" + it}
            onMouseDown={() => PianoNote.action.mouseDown(it)}
            onMouseUp={() => PianoNote.action.mouseUp(it)}
          >
            <p className="note-info-white">{it}</p>
          </div>
        );
      } else {
        return (
          <div key={i} className="piano-black">
            <div
              id={"note-" + it}
              className={"note piano-black-raised piano-" + it}
              onMouseDown={() => PianoNote.action.mouseDown(it)}
              onMouseUp={() => PianoNote.action.mouseUp(it)}
            >
              <p className="note-info-black">{it}</p>
            </div>
          </div>
        );
      }
    }),
    soundClear: () => {
      PianoState.tone.triggerRelease(PianoState.note);
    },
  },
  view: () => {
    const [show, setShow] = React.useState(true);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong style={{ alignSelf: "center" }}>Piano</strong>
          <div className="circle-a" onClick={() => setShow(!show)}>
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? (
          <div className="piano">
            <div className="piano-container">
              <span className="piano-brand">bigegi84</span>
              <div className="piano-keys">{PianoNote.action.noteList}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
