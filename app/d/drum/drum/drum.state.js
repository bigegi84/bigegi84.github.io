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
    [
      "drum",
      "Drum",
      [
        ["b", "Bass", "../../../asset/sound/drum/bass-5a.ogg"],
        ["s", "Snare", "../../../asset/sound/drum/snare-5a.ogg"],
        ["hc", "Hihat Closed", "../../../asset/sound/drum/hihat-closed-b1.ogg"],
        ["ho", "Hihat Open", "../../../asset/sound/drum/hihat-open-b1.ogg"],
        ["c", "Crash", "../../../asset/sound/drum/crash.ogg"],
        ["rc", "Ride Crash", "../../../asset/sound/drum/ride-crash.ogg"],
        ["ts", "Tomtom Small", "../../../asset/sound/drum/tomtom-small-5a.ogg"],
        [
          "tm",
          "Tomtom Medium",
          "../../../asset/sound/drum/tomtom-medium-5a.ogg",
        ],
        ["tf", "Tomtom Floor", "../../../asset/sound/drum/tomtom-floor-5a.ogg"],
      ],
    ],
    [
      "trap",
      "Trap",
      [
        [
          "thc",
          "Hihat Closed",
          "../../../asset/sound/drum/trap/_dre-s-closed-hi-hat-5.mp3",
        ],
        ["tk", "Kick", "../../../asset/sound/drum/trap/_Trap_Kick.mp3"],
        ["ts", "Snare", "../../../asset/sound/drum/trap/_Waka_Snare_1_4.mp3"],
      ],
    ],
    [
      "kocak",
      "Kocak",
      [
        [
          "kkn",
          "Kamu Nanya",
          "../../../asset/sound/drum/kocak/sound_effect_kamu_nanya.mp3",
        ],
        [
          "khqe",
          "HQ Explosion",
          "../../../asset/sound/drum/kocak/hq-explosion.mp3",
        ],
      ],
    ],
  ],
};
