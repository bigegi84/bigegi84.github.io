const piano = {
  view: () => {
    pianoInit();
    return (
      <div
        className="conlumn-a"
        style={{ padding: "3em" }}
        tabIndex={0}
        onKeyDown={(e) => pianoKeymap.action.key.down(e)}
        onKeyUp={(e) => pianoKeymap.action.key.up(e)}
      >
        <h2 id="title" style={bigegi84theme.style}>
          bigegi84 - Piano
        </h2>
        <div className="major column-a">
          <div id="top" className="column-a">
            <pianoConfig.view />
            <pianoSheet.view />
          </div>
          <div id="middle" className="column-a">
            <pianoNote.view />
          </div>
          <div id="bottom">
            <pianoChord.view />
          </div>
        </div>
      </div>
    );
  },
};
