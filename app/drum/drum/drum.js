const drum = {
  action: {
    key: {
      down: (e) => {
        if (drumState.depressed[e.key]) return;
        drumState.depressed[e.key] = true;
        const note = drumState.keymap[drumState.keymap.value][e.key];
        if (note) {
          drumNote.action.soundPlay([note]);
          drumNote.action.animate([note], true);
        }
      },
      up: (e) => {
        drumState.depressed[e.key] = false;
        const note = drumState.keymap[drumState.keymap.value][e.key];
        if (note) drumNote.action.animate([note], false);
      },
    },
  },
  view: () => {
    return (
      <div
        style={{ padding: "3em" }}
        className="column-a"
        tabIndex={0}
        onKeyDown={(e) => drum.action.key.down(e)}
        onKeyUp={(e) => drum.action.key.up(e)}
      >
        <h1 style={bigegi84theme.style}>bigegi84 - Drum</h1>
        <drumAudio.view />
        <drumNote.view />
        <drumSheet.view />
      </div>
    );
  },
};
