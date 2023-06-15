const drum = {
  action: {
    key: {
      down: (e) => {
        if (drumState.depressed[e.key]) return;
        drumState.depressed[e.key] = true;
        drumNote.action.soundPlay([
          drumState.keymap[drumState.keymap.value][e.key],
        ]);
      },
      up: (e) => {
        drumState.depressed[e.key] = false;
      },
    },
  },
  view: () => {
    return (
      <div
        className="column-a"
        tabIndex={0}
        onKeyDown={(e) => drum.action.key.down(e)}
        onKeyUp={(e) => drum.action.key.up(e)}
      >
        <drumAudio.view />
        <drumNote.view />
        <drumSheet.view />
      </div>
    );
  },
};
