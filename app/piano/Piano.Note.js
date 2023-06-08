const noteAnimate = (note, press = true) => {
  if (press)
    $("#note-" + note).animate(
      {
        backgroundColor: "#88FFAA",
      },
      0
    );
  if (!press) {
    $("#note-" + note).animate(
      {
        backgroundColor:
          note.search("b") == -1
            ? PianoStore.theme.pianoWhite.backgroundColor
            : PianoStore.theme.pianoBlack.backgroundColor,
      },
      300,
      "easeOutExpo"
    );
  }
};
const _pianoNote = {
  handleMouseDown: (note) => {
    console.log(note);
    PianoState.tone.triggerAttack([note]);
    noteAnimate(note, true);
  },
  handleMouseUp: (note) => {
    if (PianoStore.sustaining)
      PianoState.tone.triggerRelease(
        [note],
        Tone.now() + PianoStore.sustainMs / 1000
      );
    if (!PianoStore.sustaining) PianoState.tone.triggerRelease([note]);
    noteAnimate(note, false);
  },
};
const NoteList = PianoState.note.map((it, i) => {
  if (it.search("b") == -1) {
    return (
      <div
        key={i}
        id={"note-" + it}
        className={"note piano-white piano-" + it}
        onMouseDown={() => _pianoNote.handleMouseDown(it)}
        onMouseUp={() => _pianoNote.handleMouseUp(it)}
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
          onMouseDown={() => -pianoNote.handleMouseDown(it)}
          onMouseUp={() => _pianoNote.handleMouseUp(it)}
        >
          <p className="note-info-black">{it}</p>
        </div>
      </div>
    );
  }
});

const PianoNote = () => {
  return (
    <div className="piano">
      <div className="piano-container">
        <span className="piano-brand">bigegi84</span>
        <div className="piano-keys">{NoteList}</div>
      </div>
    </div>
  );
};
