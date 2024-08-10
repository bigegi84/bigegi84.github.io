const drum = {
  action: {
    key: {
      down: (e) => {
        if (drumState.depressed[e.key]) return;
        drumState.depressed[e.key] = true;
        const note = drumState.keymap[drumState.keymap.value][e.key];
        let find = false;
        drumState.note.forEach(([, , child], i) => {
          child.forEach(([cKey, ,], cI) => {
            if (cKey == note) find = [i, cI];
          });
        });
        if (find) {
          drumNote.action.soundPlay([find]);
          drumNote.action.animate([find], true);
        }
      },
      up: (e) => {
        drumState.depressed[e.key] = false;
        const note = drumState.keymap[drumState.keymap.value][e.key];
        let find = false;
        drumState.note.forEach(([, , child], i) => {
          child.forEach(([cKey, ,], cI) => {
            if (cKey == note) find = [i, cI];
          });
        });
        if (find) drumNote.action.animate([find], false);
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
