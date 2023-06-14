const ukuleleStore = mobx.observable({
  chord: { delay: { ms: 10 } },
  mode: ["Chord", "us"],
  sustain: { active: true, ms: 1500 },
  theme: {
    fret: {
      backgroundColor: "#83764f",
    },
    chord: {
      backgroundColor: "#a0d8b3",
    },
    chordMol: {
      backgroundColor: "#008080",
    },
  },
});
