const bassStore = mobx.observable({
  theme: {
    pianoWhite: {
      backgroundColor: "#CDC2AE",
      textColor: "white",
    },
    pianoBlack: { backgroundColor: "#116A7B", textColor: "white" },
  },
  delayMs: 0,
  depressed: {},
  playType: {
    name: "(Kiri) 2 Bas - (Kanan) Akor",
    code: "twoBassAndChord",
  },
  keymapActive: true,
  sustain: { active: true, ms: 1500 },
});
