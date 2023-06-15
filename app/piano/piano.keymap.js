const pianoKeymap = {
  depressed: {},
  handleKeyDown: (e) => {
    if (!pianoStore.keymapActive) return;
    e.preventDefault();
    if (pianoKeymap.depressed[e.key]) return;
    pianoKeymap.depressed[e.key] = true;
    var str = pianoState.keymap[pianoState.keymap.value][e.key];
    if (str) {
      const chordId = "chord-" + str[0] + "-" + str[1];
      let formula = pianoChord.action.formula(chordId);
      const jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          pianoNote.action.mouseDown(it);
        }, ms);
        ms = ms + pianoStore.delayMs;
      });
      pianoChord.action.animate(chordId);
      // chordAnimate(chordId);
      // lastChord = jqCode;
    }
  },
  handleKeyUp: (e) => {
    pianoKeymap.depressed[e.key] = false;
    var str = pianoState.keymap[pianoState.keymap.value][e.key];
    if (str) {
      const chordId = "chord-" + str[0] + "-" + str[1];
      let formula = pianoChord.action.formula(chordId);
      const jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          pianoNote.action.mouseUp(it);
        }, ms);
        ms = ms + pianoStore.delayMs;
      });
      pianoChord.action.animate(chordId, false);
      // chordInfo(formula.join(" - "));
    }
  },
};