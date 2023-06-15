const guitarStore = mobx.observable({
  chord: { delay: { ms: 10 } },
  mode: ["Chord", "jp"],
  sustain: { active: true, ms: 1000 },
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
