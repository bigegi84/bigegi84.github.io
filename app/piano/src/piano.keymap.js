const PianoKeymap = {
  depressed: {},
  handleKeyDown: (e) => {
    if (!PianoStore.keymapActive) return;
    e.preventDefault();
    if (PianoKeymap.depressed[e.key]) return;
    PianoKeymap.depressed[e.key] = true;
    var str = PianoState.keymap[e.key];
    if (str) {
      const chordId = "chord-" + str[0] + "-" + str[1];
      let formula = PianoChord.action.formula(chordId);
      const jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          PianoNote.action.mouseDown(it);
        }, ms);
        ms = ms + PianoStore.delayMs;
      });
      PianoChord.action.animate(chordId);
      // chordAnimate(chordId);
      // lastChord = jqCode;
    }
  },
  handleKeyUp: (e) => {
    PianoKeymap.depressed[e.key] = false;
    var str = PianoState.keymap[e.key];
    if (str) {
      const chordId = "chord-" + str[0] + "-" + str[1];
      let formula = PianoChord.action.formula(chordId);
      const jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          PianoNote.action.mouseUp(it);
        }, ms);
        ms = ms + PianoStore.delayMs;
      });
      PianoChord.action.animate(chordId, false);
      // chordInfo(formula.join(" - "));
    }
  },
};
