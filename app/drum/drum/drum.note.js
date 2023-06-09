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
    mouseDown: ([code]) => {
      drumNote.action.soundPlay([code]);
    },
    soundPlay: ([code]) => {
      const promiseList = code.split(",").map((it) => {
        return new Promise(() => {
          $("#sound-" + it)
            .clone()[0]
            .play();
        });
      });
      Promise.all(promiseList);
    },
  },
  noteList: () => {
    const note = drumNote.state.note;
    const list = note.map(([code, title], i) => {
      return (
        <div
          key={i}
          id={"note-" + code}
          className="note"
          onMouseDown={() => drumNote.action.mouseDown([code])}
        >
          {title}
          <br />"{code}"
        </div>
      );
    });
    return <div className="row-a">{list}</div>;
  },
  view: () => {
    return <div>{drumNote.noteList()}</div>;
  },
};
