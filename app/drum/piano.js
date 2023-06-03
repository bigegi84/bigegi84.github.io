(() => {
  const depress = {};
  const note = {
    bass: "bass",
    snare: "snare",
    hihatClosed: "hihat-closed",
    hihatOpen: "hihat-open",
    crash: "crash",
    rideCrash: "ride-crash",
    tomtomSmall: "tomtom-small",
    tomtomMedium: "tomtom-medium",
    tomtomFloor: "tomtom-floor",
  };
  const keymap = {
    " ": note.hihatOpen,
    q: note.hihatOpen,
    w: note.hihatOpen,

    e: note.rideCrash,
    r: note.rideCrash,

    y: note.tomtomSmall,
    u: note.tomtomSmall,

    i: note.snare,
    o: note.snare,
    p: note.snare,

    h: note.tomtomMedium,
    j: note.tomtomMedium,

    k: note.bass,
    l: note.bass,
    ";": note.bass,

    a: note.hihatClosed,
    s: note.hihatClosed,

    d: note.crash,

    n: note.tomtomFloor,
    m: note.tomtomFloor,
  };
  $(document).keydown((e) => {
    e.preventDefault();
    const note = keymap[e.key];
    if (depress[e.key]) return;
    if (note) {
      $("#sound-" + note)
        .clone()[0]
        .play();
      depress[e.key] = true;
    }
  });
  $(document).keyup((e) => {
    depress[e.key] = false;
  });
})();
