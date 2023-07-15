const pianoStore = mobx.observable({
  theme: {
    pianoWhite: {
      backgroundColor: "#CDC2AE",
      textColor: "white",
    },
    pianoBlack: { backgroundColor: "#116A7B", textColor: "white" },
  },
  info: {
    pressed: [],
  },
  delayMs: 0,
  depressed: {},
  sustaining: true,
  sustainMs: 1500,
  playType: {
    name: "(Kiri) 2 Bas - (Kanan) Akor",
    code: "twoBassAndChord",
  },
  keymapActive: true,
  keymap: "jp",
  sheet: {
    data: [],
    selected: "bigegi84 - Omong Kosong",
    playing: false,
    playText: "Mainkan",
  },
});
