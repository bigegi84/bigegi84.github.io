const guitar = {
  action: {
    key: {
      down: (e) => {
        if (guitarState.depressed[e.key]) return;
        guitarState.depressed[e.key] = true;
        if (guitarStore.mode[0] == "Chord") guitarChord.action.key.down(e);
        if (guitarStore.mode[0] == "Solo") guitarFret.action.key.down(e);
      },
      up: (e) => {
        guitarState.depressed[e.key] = false;
        if (guitarStore.mode[0] == "Chord") guitarChord.action.key.up(e);
        if (guitarStore.mode[0] == "Solo") guitarFret.action.key.up(e);
      },
    },
  },
  view: () => {
    return (
      <div
        style={{ padding: "3em" }}
        className="column-a"
        tabIndex={0}
        onKeyDown={(e) => guitar.action.key.down(e)}
        onKeyUp={(e) => guitar.action.key.up(e)}
      >
        <h1 style={bigegi84theme.style}>bigegi84 - Guitar</h1>
        <guitarInfo.view />
        <guitarConfig.view />
        <guitarFret.view />
        <guitarChord.view />
      </div>
    );
  },
};
