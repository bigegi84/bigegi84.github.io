const guitarState = {
  lastChord: null,
  chord: {
    C: {
      CPower: "x35xxx",
      C: "332010",
      Cm: "0333",
      Cmaj7: "0002",
      Cm7: "3333",
      C6: "0000",
      C7: "0001",
      C9: "0201",
    },
    Db: {
      DbPower: "x46xxx",
      Db: "1114",
      Dbm: "1101",
      Dbmaj7: "1113",
      Dbm7: "4444",
      Db6: "1111",
      Db7: "1112",
      Db9: "1312",
    },
    D: {
      DPower: "x57xxx",
      D: "xx0232",
      Dm: "2210",
      Dmaj7: "1113",
      Dm7: "2213",
      D6: "2222",
      D7: "2223",
      D9: "2423",
    },
    Eb: {
      EbPower: "x68xxx",
      Eb: "3331",
      Ebm: "3321",
      Ebmaj7: "3335",
      Ebm7: "3324",
      Eb6: "3333",
      Eb7: "3334",
      Eb9: "0111",
    },
    E: {
      EPower: "02xxxx",
      E: "022100",
      Em: "022000",
      Emaj7: "1302",
      Em7: "0202",
      E6: "1020",
      E7: "1202",
      E9: "1222",
    },
    F: {
      FPower:"13xxxx",
      F: "2010",
      Fm: "1013",
      Fmaj7: "2413",
      Fm7: "1313",
      F6: "2213",
      F7: "2310",
      F9: "2333",
    },
    Gb: {
      GbPower: "24xxxx",
      Gb: "3121",
      Gbm: "244222",
      Gbmaj7: "0111",
      Gbm7: "2424",
      Gb6: "3324",
      Gb7: "3424",
      Gb9: "1101",
    },
    G: {
      GPower: "35xxxx",
      G: "320003",
      Gm: "0231",
      Gmaj7: "0222",
      Gm7: "0211",
      G6: "0202",
      G7: "0212",
      G9: "2212",
    },
    Ab: {
      AbPower: "46xxxx",
      Ab: "5343",
      Abm: "1342",
      Abmaj7: "1333",
      Abm7: "0322",
      Ab6: "1313",
      Ab7: "1323",
      Ab9: "3323",
      Abm9: "3342",
    },
    A: {
      APower: "57xxxx",
      A: "x02220",
      Am: "x02210",
      Amaj7: "1100",
      Am7: "0433",
      A6: "2424",
      A7: "0100",
      A9: "0102",
    },
    Bb: {
      BbPower: "x13xxx",
      Bb: "3211",
      Bbm: "x13321",
      Bbmaj7: "3210",
      Bbm7: "1111",
      Bb6: "0211",
      Bb7: "1211",
      Bb9: "1213",
    },
    B: {
      BPower: "x24xxx",
      B: "4322",
      Bm: "x24432",
      Bmaj7: "3322",
      Bm7: "2222",
      B6: "1322",
      B7: "2322",
      B9: "2324",
    },
  },
  depressed: {},
  fret: {
    1: {
      0: "E5",
      1: "F5",
      2: "Gb5",
      3: "G5",
      4: "Ab5",
      5: "A5",
      6: "Bb5",
      7: "B5",
      8: "C6",
      9: "Db6",
      10: "D6",
      11: "Eb6",
      12: "E6",
    },
    2: {
      0: "B4",
      1: "C5",
      2: "Db5",
      3: "D5",
      4: "Eb5",
      5: "E5",
      6: "F5",
      7: "Gb5",
      8: "G5",
      9: "Ab5",
      10: "A5",
      11: "Bb5",
      12: "B5",
    },
    3: {
      0: "G4",
      1: "Ab4",
      2: "A4",
      3: "Bb4",
      4: "B4",
      5: "C5",
      6: "Db5",
      7: "D5",
      8: "Eb5",
      9: "E5",
      10: "F5",
      11: "Gb5",
      12: "G5",
    },
    4: {
      0: "D4",
      1: "Eb4",
      2: "E4",
      3: "F4",
      4: "Gb4",
      5: "G4",
      6: "Ab4",
      7: "A4",
      8: "Bb4",
      9: "B4",
      10: "C5",
      11: "Db5",
      12: "D5",
    },
    5: {
      0: "A3",
      1: "Bb3",
      2: "B3",
      3: "C4",
      4: "Db4",
      5: "D4",
      6: "Eb4",
      7: "E4",
      8: "F4",
      9: "Gb4",
      10: "G4",
      11: "Ab4",
      12: "A4",
    },
    6: {
      0: "E3",
      1: "F3",
      2: "Gb3",
      3: "G3",
      4: "Ab3",
      5: "A3",
      6: "Bb3",
      7: "B3",
      8: "C4",
      9: "Db4",
      10: "D4",
      11: "Eb4",
      12: "E4",
    },
  },
  keymap: {
    Chord: {
      jp: {
        " ": "lastChord",

        1: ["C", "CPower"],
        q: ["C", "Cm"],
        a: ["C", "Cmaj7"],
        z: ["C", "Cm7"],

        "!": ["C", "C6"],
        Q: ["C", "C7"],
        A: ["C", "C9"],
        // Z: ["C", "Cm7"],

        2: ["Db", "DbPower"],
        w: ["Db", "Dbm"],
        s: ["Db", "Dbmaj7"],
        x: ["Db", "Dbm7"],

        "@": ["Db", "Db6"],
        W: ["Db", "Db7"],
        S: ["Db", "Db9"],
        // X: ["Db", "Dbm7"],

        3: ["D", "DPower"],
        e: ["D", "Dm"],
        d: ["D", "Dmaj7"],
        c: ["D", "Dm7"],

        "#": ["D", "D6"],
        E: ["D", "D7"],
        D: ["D", "D9"],
        // C: ["D", "Dm7"],

        4: ["Eb", "Eb"],
        r: ["Eb", "Ebm"],
        f: ["Eb", "Ebmaj7"],
        v: ["Eb", "Ebm7"],

        $: ["Eb", "Eb6"],
        R: ["Eb", "Eb7"],
        F: ["Eb", "Eb9"],
        // V: ["Eb", "Ebm7"],

        5: ["E", "EPower"],
        t: ["E", "Em"],
        g: ["E", "Emaj7"],
        b: ["E", "Em7"],

        "%": ["E", "E6"],
        T: ["E", "E7"],
        G: ["E", "E9"],
        // B: ["E", "Em7"],

        6: ["F", "F"],
        y: ["F", "Fm"],
        h: ["F", "Fmaj7"],
        n: ["F", "Fm7"],

        "^": ["F", "F6"],
        Y: ["F", "F7"],
        H: ["F", "F9"],
        // N: ["F", "Fm7"],

        7: ["Gb", "GbPower"],
        u: ["Gb", "Gbm"],
        j: ["Gb", "Gbmaj7"],
        m: ["Gb", "Gbm7"],

        "&": ["Gb", "Gb6"],
        U: ["Gb", "Gb7"],
        J: ["Gb", "Gb9"],
        // M: ["Gb", "Gbm7"],

        8: ["G", "GPower"],
        i: ["G", "Gm"],
        k: ["G", "Gmaj7"],
        ",": ["G", "Gm7"],

        "*": ["G", "G6"],
        I: ["G", "G7"],
        K: ["G", "G9"],
        // "<": ["G", "Gm7"],

        9: ["Ab", "Ab"],
        o: ["Ab", "Abm"],
        l: ["Ab", "Abmaj7"],
        ".": ["Ab", "Abm7"],

        "(": ["Ab", "Ab6"],
        O: ["Ab", "Ab7"],
        L: ["Ab", "Ab9"],
        ">": ["Ab", "Abm9"],

        0: ["A", "APower"],
        p: ["A", "Am"],
        ";": ["A", "Amaj7"],
        "/": ["A", "Am7"],

        ")": ["A", "A6"],
        P: ["A", "A7"],
        ":": ["A", "A9"],
        // "?": ["A", "Am7"],

        "-": ["Bb", "Bb"],
        "[": ["Bb", "Bbm"],
        "'": ["Bb", "Bbmaj7"],
        ArrowLeft: ["Bb", "Bbm7"],

        _: ["Bb", "Bb6"],
        "{": ["Bb", "Bb7"],
        '"': ["Bb", "Bb8"],
        // ArrowLeft: ["Bb", "Bbm7"],

        "^": ["B", "BPower"],
        "]": ["B", "Bm"],
        "\\": ["B", "Bmaj7"],
        ArrowUp: ["B", "Bm7"],

        "+": ["B", "B6"],
        "}": ["B", "B7"],
        "|": ["B", "B9"],
        // ArrowUp: ["B", "Bm7"],
      },
      us: {
        " ": "reverse",

        1: ["C", "C"],
        q: ["C", "Cm"],
        a: ["C", "Cmaj7"],
        z: ["C", "Cm7"],

        "!": ["C", "C6"],
        Q: ["C", "C7"],
        A: ["C", "C9"],
        // Z: ["C", "Cm7"],

        2: ["Db", "Db"],
        w: ["Db", "Dbm"],
        s: ["Db", "Dbmaj7"],
        x: ["Db", "Dbm7"],

        "@": ["Db", "Db6"],
        W: ["Db", "Db7"],
        S: ["Db", "Db9"],
        // X: ["Db", "Dbm7"],

        3: ["D", "D"],
        e: ["D", "Dm"],
        d: ["D", "Dmaj7"],
        c: ["D", "Dm7"],

        "#": ["D", "D6"],
        E: ["D", "D7"],
        D: ["D", "D9"],
        // C: ["D", "Dm7"],

        4: ["Eb", "Eb"],
        r: ["Eb", "Ebm"],
        f: ["Eb", "Ebmaj7"],
        v: ["Eb", "Ebm7"],

        $: ["Eb", "Eb6"],
        R: ["Eb", "Eb7"],
        F: ["Eb", "Eb9"],
        // V: ["Eb", "Ebm7"],

        5: ["E", "E"],
        t: ["E", "Em"],
        g: ["E", "Emaj7"],
        b: ["E", "Em7"],

        "%": ["E", "E6"],
        T: ["E", "E7"],
        G: ["E", "E9"],
        // B: ["E", "Em7"],

        6: ["F", "F"],
        y: ["F", "Fm"],
        h: ["F", "Fmaj7"],
        n: ["F", "Fm7"],

        "^": ["F", "F6"],
        Y: ["F", "F7"],
        H: ["F", "F9"],
        // N: ["F", "Fm7"],

        7: ["Gb", "Gb"],
        u: ["Gb", "Gbm"],
        j: ["Gb", "Gbmaj7"],
        m: ["Gb", "Gbm7"],

        "&": ["Gb", "Gb6"],
        U: ["Gb", "Gb7"],
        J: ["Gb", "Gb9"],
        // M: ["Gb", "Gbm7"],

        8: ["G", "G"],
        i: ["G", "Gm"],
        k: ["G", "Gmaj7"],
        ",": ["G", "Gm7"],

        "*": ["G", "G6"],
        I: ["G", "G7"],
        K: ["G", "G9"],
        // "<": ["G", "Gm7"],

        9: ["Ab", "Ab"],
        o: ["Ab", "Abm"],
        l: ["Ab", "Abmaj7"],
        ".": ["Ab", "Abm7"],

        "(": ["Ab", "Ab6"],
        O: ["Ab", "Ab7"],
        L: ["Ab", "Ab9"],
        ">": ["Ab", "Abm9"],

        0: ["A", "A"],
        p: ["A", "Am"],
        ";": ["A", "Amaj7"],
        "/": ["A", "Am7"],

        ")": ["A", "A6"],
        P: ["A", "A7"],
        ":": ["A", "A9"],
        // "?": ["A", "Am7"],

        "-": ["Bb", "Bb"],
        "[": ["Bb", "Bbm"],
        "'": ["Bb", "Bbmaj7"],
        ArrowLeft: ["Bb", "Bbm7"],

        _: ["Bb", "Bb6"],
        "{": ["Bb", "Bb7"],
        '"': ["Bb", "Bb8"],
        // ArrowLeft: ["Bb", "Bbm7"],

        "=": ["B", "B"],
        "]": ["B", "Bm"],
        "\\": ["B", "Bmaj7"],
        ArrowUp: ["B", "Bm7"],

        "+": ["B", "B6"],
        "}": ["B", "B7"],
        "|": ["B", "B9"],
        // ArrowUp: ["B", "Bm7"],
      },
    },
    Solo: {
      us: {
        1: [1, 0],
        2: [1, 1],
        3: [1, 2],
        4: [1, 3],
        5: [1, 4],
        6: [1, 5],
        7: [1, 6],
        8: [1, 7],
        9: [1, 8],
        0: [1, 9],
        "-": [1, 10],
        "=": [1, 11],

        q: [2, 0],
        w: [2, 1],
        e: [2, 2],
        r: [2, 3],
        t: [2, 4],
        y: [2, 5],
        u: [2, 6],
        i: [2, 7],
        o: [2, 8],
        p: [2, 9],
        "[": [2, 10],
        "]": [2, 11],

        a: [3, 0],
        s: [3, 1],
        d: [3, 2],
        f: [3, 3],
        g: [3, 4],
        h: [3, 5],
        j: [3, 6],
        k: [3, 7],
        l: [3, 8],
        ";": [3, 9],
        "'": [3, 10],
        "\\": [3, 11],

        z: [4, 0],
        x: [4, 1],
        c: [4, 2],
        v: [4, 3],
        b: [4, 4],
        n: [4, 5],
        m: [4, 6],
        ",": [4, 7],
        ".": [4, 8],
        "/": [4, 9],
      },
    },
  },
  tone: {
    value: "nylon",
    distortion: new Tone.Sampler({
      urls: {
        E3: "E3.mp3",
        A3: "A3.mp3",
        D4: "D4.mp3",
      },
      release: 1,
      baseUrl: "../../asset/sound/guitar/distortion/",
    }).toDestination(),
    nylon: new Tone.Sampler({
      urls: {
        B1: "B1.mp3",

        D2: "D2.mp3",
        E2: "E2.mp3",
        Gb2: "Gb2.mp3",
        Ab2: "Ab2.mp3",
        A2: "A2.mp3",
        B2: "B2.mp3",

        Db3: "Db3.mp3",
        D3: "D3.mp3",
        E3: "E3.mp3",
        Gb3: "Gb3.mp3",
        G3: "G3.mp3",
        A3: "A3.mp3",
        B3: "B3.mp3",

        Db4: "Db4.mp3",
        Eb4: "Eb4.mp3",
        E4: "E4.mp3",
        Gb4: "Gb4.mp3",
        Ab4: "Ab4.mp3",
        A4: "A4.mp3",
        B4: "B4.mp3",

        Db5: "Db5.mp3",
        // D5: "D5.mp3",
        E5: "E5.mp3",
        Gb5: "Gb5.mp3",
        G5: "G5.mp3",
        Ab5: "Ab5.mp3",
        A5: "A5.mp3",
        Bb5: "Bb5.mp3",
      },
      release: 1,
      baseUrl: "../../asset/sound/guitar/nylon/",
    }).toDestination(),
  },
};
