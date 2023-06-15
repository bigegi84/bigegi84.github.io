const drumState = {
  depressed: {},
  keymap: {
    value: "a",
    a: {
      " ": "ho",
      q: "ho",
      w: "ho",

      e: "rc",
      r: "rc",

      y: "ts",
      u: "ts",

      2: "s",
      i: "s",
      o: "s",
      p: "s",
      "[": "s",

      h: "tm",
      j: "tm",

      k: "b",
      l: "b",
      ";": "b",
      "'": "b",

      a: "hc",
      s: "hc",

      d: "c",

      n: "tf",
      m: "tf",
    },
  },
  note: [
    ["b", "Bass"],
    ["s", "Snare"],
    ["hc", "Hihat Closed"],
    ["ho", "Hihat Open"],
    ["c", "Crash"],
    ["rc", "Ride Crash"],
    ["ts", "Tomtom Small"],
    ["tm", "Tomtom Medium"],
    ["tf", "Tomtom Floor"],
  ],
};
