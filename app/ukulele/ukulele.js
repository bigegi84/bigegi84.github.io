const ukulele = {
  action: {
    key: {
      down: (e) => {
        if (ukuleleState.depressed[e.key]) return;
        ukuleleState.depressed[e.key] = true;
        if (ukuleleStore.mode[0] == "Chord") ukuleleChord.action.key.down(e);
        if (ukuleleStore.mode[0] == "Solo") ukuleleFret.action.key.down(e);
      },
      up: (e) => {
        ukuleleState.depressed[e.key] = false;
        if (ukuleleStore.mode[0] == "Chord") ukuleleChord.action.key.up(e);
        if (ukuleleStore.mode[0] == "Solo") ukuleleFret.action.key.up(e);
      },
    },
  },
  view: () => {
    ukuleleInit();
    return (
      <div
        style={{ padding: "3em" }}
        className={"column-a"}
        tabIndex={0}
        onKeyDown={(e) => ukulele.action.key.down(e)}
        onKeyUp={(e) => ukulele.action.key.up(e)}
      >
        <h1 style={bigegi84theme.style}>bigegi84 - Ukulele</h1>
        <ukuleleInfo.view />
        <ukuleleConfig.view />
        <ukuleleFret.view />
        <ukuleleChord.view />
      </div>
    );
  },
};
