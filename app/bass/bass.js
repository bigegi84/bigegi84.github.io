const bass = {
  action: {
    key: {
      down: (e) => {
        const [x, y] = bassState.keymap[e.key];
        if (x == null && y == null) return;
        if (bassState.depressed[e.key]) {
          return;
        }
        if (x != null && y != null) {
          bassState.tone.triggerAttack([bassState.fret[x][y]]);
          bassFret.action.animate([x, y], true);
          bassState.depressed[e.key] = true;
        }
      },
      up: (e) => {
        // e.preventDefault();
        const [x, y] = bassState.keymap[e.key];
        if (x == null && y == null) return;
        if (x != null && y != null) {
          bassState.tone.triggerRelease(
            [bassState.fret[x][y]],
            bassStore.sustain.active
              ? Tone.now() + bassStore.sustain.ms / 1000
              : Tone.now()
          );
          bassFret.action.animate([x, y], false);
          bassState.depressed[e.key] = false;
        }
      },
    },
  },
  view: () => {
    bassInit();
    return (
      <div
        className="column-a"
        style={{ padding: "3em" }}
        tabIndex={0}
        onKeyDown={(e) => bass.action.key.down(e)}
        onKeyUp={(e) => bass.action.key.up(e)}
      >
        <h2 style={bigegi84theme.style}>bigegi84 - Bass</h2>
        <bassConfig.view />
        <bassFret.view />
      </div>
    );
  },
};
