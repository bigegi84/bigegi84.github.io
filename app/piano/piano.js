(() => {
  var debug = !true;
  var delayMs = 15;
  var animateMs = 1500;
  let pressed = [];
  var sustaining = true;
  var playType = {
    name: "(Kiri) 2 Bas - (Kanan) Akor",
    code: "twoBassAndChord",
  };
  const note = [
    "G2",
    "Ab2",
    "A2",
    "Bb2",
    "B2",
    "C3",
    "Db3",
    "D3",
    "Eb3",
    "E3",
    "F3",
    "Gb3",
    "G3",
    "Ab3",
    "A3",
    "Bb3",
    "B3",
    "C4",
    "Db4",
    "D4",
    "Eb4",
    "E4",
    "F4",
    "Gb4",
    "G4",
    "Ab4",
    "A4",
    "Bb4",
    "B4",
    "C5",
    "Db5",
    "D5",
    "Eb5",
    "E5",
    "F5",
    "Gb5",
    "G5",
    // "Ab5",
    // "A5",
    // "Bb5",
    // "B5",
  ];
  const pianoDraw = () => {
    let html = '<div class="piano-container"><div class="piano-keys">';
    note.forEach((x) => {
      if (x.search("b") == -1)
        html +=
          '<div id="note-' +
          x +
          '" class="note piano-white piano-' +
          x +
          '"><p class="note-info-white">' +
          x +
          "</p></div>";
      else
        html +=
          '<div class="piano-black"><div id="note-' +
          x +
          '" class="note piano-black-raised piano-' +
          x +
          '"><p class="note-info-black">' +
          x +
          "</p></div></div>";
    });
    html += "</div></div>";
    $("#piano").html(html);
  };
  pianoDraw();
  const pianoAnimate = (id) => {
    $("#" + id).animate(
      {
        backgroundColor: "#88FFAA",
      },
      0
    );
    if (sustaining) {
      setTimeout(() => {
        $("#" + id).animate(
          {
            backgroundColor: id.search("b") == -1 ? "white" : "black",
          },
          300,
          "easeOutExpo"
        );
      }, 1500);
    }
  };
  const pianoSound = () => {
    $(".note").mousedown((e) => {
      const id = e.currentTarget.id;
      if (debug) console.log(e.currentTarget.id);
      if (debug) console.log("#sound-" + id.replace("note-", ""));
      if (id) {
        $("#sound-" + id.replace("note-", ""))
          .clone()[0]
          .play();
        pianoAnimate(id);
      }
    });
  };
  pianoSound();
  const chord = {
    C: {
      C: "C4,E4,G4",
      Cmaj7: "C4,E4,G4,B4",
      C7: "C4,E4,G4,Bb4",
      Cm: "C4,Eb4,G4",
      Cm7: "C4,Eb4,G4,Bb4",
      C7b9: "C4,E4,G4,Bb4,Db5",
      Csus4: "C4,F4,G4",
      C2Bass: "C3,G3",
    },
    Db: {
      Db: "Db4,F4,Ab4",
      Dbmaj7: "Db4,F4,Ab4,C5",
      Db7: "Db4,F4,Ab4,B4",
      Dbm: "Db4,E4,Ab4",
      Dbm7: "Db4,E4,Ab4,B4",
      Db2Bass: "Db3,Ab3",
    },
    D: {
      D: "D4,Gb4,A4",
      Dmaj7: "D4,Gb4,A4,Db5",
      D7: "D4,Gb4,A4,C5",
      Dm: "D4,F4,A4",
      Dm7: "D4,F4,A4,C5",
      D2Bass: "D3,A3",
    },
    Eb: {
      Eb: "Eb4,G4,Bb4",
      Ebmaj7: "Eb4,G4,Bb4,D5",
      Eb7: "Eb4,G4,Bb4,Db5",
      Ebm: "Eb4,Gb4,Bb4",
      Ebm7: "Eb4,Gb4,Bb4,Db5",
      Eb6: "Eb4,G4,Bb4,C5",
      Eb7b9: "Eb4,G4,Bb4,Db5,E5",
      Eb2Bass: "Eb3,Bb3",
    },
    E: {
      E: "E4,Ab4,B4",
      Emaj7: "E4,Ab4,B4,Eb5",
      E7: "E4,Ab4,B4,D5",
      Em: "E4,G4,B4",
      Em7: "E4,G4,B4,D5",
      E2Bass: "E3,B3",
    },
    F: {
      F: "F4,A4,C5",
      Fmaj7: "F4,A4,C5,E5",
      F7: "F4,A4,C5,Eb5",
      Fm: "F4,Ab4,C5",
      Fm7: "F4,Ab4,C5,Eb5",
      F2Bass: "F3,C4",
    },
    Gb: {
      Gb: "Gb4,Bb4,Db5",
      Gbmaj7: "Gb4,Bb4,Db5,F5",
      Gb7: "Gb4,Bb4,Db5,E5",
      Gbm: "Gb4,A4,Db5",
      Gbm7: "Gb4,A4,Db5,E5",
      Gb2Bass: "Gb3,Db4",
    },
    G: {
      G: "G3,B3,D4",
      Gmaj7: "G3,B3,D4,Gb4",
      G7: "G3,B3,D4,F4",
      Gm: "G3,Bb3,D4",
      Gm7: "G3,Bb3,D4,F4",
      Gm7b5: "G3,Bb3,Db4,F4",
      G2Bass: "G2,D3",
    },
    Ab: {
      Ab: "Ab3,C4,Eb4",
      Abmaj7: "Ab3,C4,Eb4,G4",
      Ab7: "Ab3,C4,Eb4,Gb4",
      Abm: "Ab3,B3,Eb4",
      Abm7: "Ab3,B3,Eb4,Gb4",
      Abm9: "Ab3,B3,Eb4,Gb4,Bb4",
      Ab2Bass: "Ab2,Eb3",
    },
    A: {
      A: "A3,Db4,E4",
      Amaj7: "A3,Db4,E4,Ab4",
      A7: "A3,Db4,E4,G4",
      Am: "A3,C4,E4",
      Am7: "A3,C4,E4,G4",
      A2Bass: "A2,E3",
    },
    Bb: {
      Bb: "Bb3,D4,F4",
      Bbmaj7: "Bb3,D4,F4,A4",
      Bb7: "Bb3,D4,F4,Ab4",
      Bbm: "Bb3,Db4,F4",
      Bbm7: "Bb3,Db4,F4,Ab4",
      Bb2Bass: "Bb2,F3",
    },
    B: {
      B: "B3,Eb4,Gb4",
      Bmaj7: "B3,Eb4,Gb4,Bb4",
      B7: "B3,Eb4,Gb4,A4",
      Bm: "B3,D4,Gb4",
      Bm7: "B3,D4,Gb4,A4",
      B2Bass: "B2,Gb3",
    },
  };
  const chordDraw = () => {
    let html = "";
    for (var x in chord) {
      var chordHtml = '<div id="chord-line-' + x + '" class="chord-group">';
      for (var y in chord[x]) {
        chordHtml +=
          '<div id="chord-' +
          x +
          "-" +
          y +
          '" class="chord' +
          (x.search("b") != -1 ? " chord-mol" : "") +
          '">' +
          y +
          "</div>";
      }
      chordHtml += "</div>";
      html += chordHtml;
    }
    $("#chord").html(html);
  };
  chordDraw();
  const chordSound = () => {
    $(".chord").mousedown((e) => {
      const id = e.target.id;
      let formula = [
        chord[id.replace("chord-", "").split("-")[0]][
          id.replace("chord-", "").split("-")[1]
        ],
      ];
      if (debug) console.log(formula);
      if (playType.code == "twoBassAndChord")
        formula = [
          chord[id.replace("chord-", "").split("-")[0]][
            id.replace("chord-", "").split("-")[0] + "2Bass"
          ],
          ...formula,
        ];
      if (debug) console.log(formula);
      let jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push("#note-" + x);
        });
      });
      if (debug) console.log(jqCode);
      // $(jqCode.join(",")).mousedown();
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          $(it).mousedown();
        }, ms);
        ms = ms + delayMs;
      });
      chordAnimate(e.target.id);
      chordInfo(formula.join(" - "));
    });
  };
  chordSound();
  var keymap = {
    1: chord.C.C,
    "!": chord.C.Cmaj7,
    q: chord.C.Cm,
    Q: chord.C.Cm7,
    a: chord.C.C7,
    z: "#key-C3,#key-G3",
    2: chord.Db.Db,
    "@": chord.Db.Dbmaj7,
    w: chord.Db.Dbm,
    W: chord.Db.Dbm7,
    s: chord.Db.Db7,
    x: "#key-Db3,#key-Ab3",
    3: chord.D.D,
    "#": chord.D.Dmaj7,
    e: chord.D.Dm,
    E: chord.D.Dm7,
    d: chord.D.D7,
    c: "#key-D3,#key-A3",
    4: chord.Eb.Eb,
    $: chord.Eb.Ebmaj7,
    r: chord.Eb.Ebm,
    R: chord.Eb.Ebm7,
    f: chord.Eb.Eb7,
    v: "#key-Eb3,#key-Bb3",
    5: chord.E.E,
    "%": chord.E.Emaj7,
    t: chord.E.Em,
    T: chord.E.Em7,
    g: chord.E.E7,
    b: "#key-E3,#key-B3",
    6: chord.F.F,
    "^": chord.F.Fmaj7,
    y: chord.F.Fm,
    Y: chord.F.Fm7,
    h: chord.F.F7,
    n: "#key-F3,#key-C4",
    7: chord.Gb.Gb,
    "&": chord.Gb.Gbmaj7,
    u: chord.Gb.Gbm,
    U: chord.Gb.Gbm7,
    j: chord.Gb.Gb7,
    m: "#key-Gb3,#key-Db4",
    8: chord.G.G,
    "*": chord.G.Gmaj7,
    i: chord.G.Gm,
    I: chord.G.Gm7,
    k: chord.G.G7,
    ",": "#key-G3,#key-D4",
    9: chord.Ab.Ab,
    "(": chord.Ab.Abmaj7,
    o: chord.Ab.Abm,
    O: chord.Ab.Abm7,
    l: chord.Ab.Ab7,
    ".": "#key-Ab3,#key-Eb4",
    0: chord.A.A,
    ")": chord.A.Amaj7,
    p: chord.A.Am,
    P: chord.A.Am7,
    ";": chord.A.A7,
    "/": "#key-A2,#key-E3",
    "-": chord.Bb.Bb,
    _: chord.Bb.Bbmaj7,
    "[": chord.Bb.Bbm,
    "{": chord.Bb.Bbm7,
    "'": chord.Bb.Bb7,
    ArrowLeft: "#key-Bb2,#key-F3",
    "=": chord.B.B,
    "+": chord.B.Bmaj7,
    "]": chord.B.Bm,
    "}": chord.B.Bm7,
    "\\": chord.B.B7,
    "`": "#key-B2,#key-Gb3",
  };
  let lastChord = null;
  const keyPress = () => {
    $(document).keydown((e) => {
      if (pressed.indexOf(e.key) != -1) return;
      pressed.push(e.key);
      if (debug) console.log(e.key);
      if (e.key == " ") e.preventDefault();
      var str = keymap[e.key];
      if (debug) console.log(str);
      if (str) {
        if (str == "reverse" && lastChord != null) {
          let ms = 0;
          lastChord.reverse().forEach((it) => {
            setTimeout(() => {
              $(it).mousedown();
            }, ms);
            ms = ms + delayMs;
          });
        } else {
          let formula = [str];
          if (debug) console.log(formula);
          if (playType.code == "twoBassAndChord") {
            var chordLine;
            for (var x in chord) {
              for (var y in chord[x]) {
                if (chord[x][y] == str) chordLine = x;
              }
            }
            if (debug) console.log(chordLine);
            formula = [chord[chordLine][chordLine + "2Bass"], ...formula];
          }
          if (debug) console.log(formula);
          const jqCode = [];
          formula.forEach((f) => {
            f.split(",").forEach((x) => {
              jqCode.push("#note-" + x);
            });
          });
          if (debug) console.log(jqCode);
          // $(jqCode.join(",")).mousedown();
          let ms = 0;
          jqCode.forEach((it) => {
            setTimeout(() => {
              $(it).mousedown();
            }, ms);
            ms = ms + delayMs;
          });
          lastChord = jqCode;
        }
      }
    });
    $(document).keyup((e) => {
      const i = pressed.indexOf(e.key);
      if (i != -1) {
        pressed.splice(i, 1);
      }
    });
  };
  keyPress();
  var chordHint = () => {
    for (var key in keymap) {
      var str = keymap[key];
      for (var chLine in chord) {
        for (var ch in chord[chLine]) {
          if (chord[chLine][ch] == str) {
            if (debug) console.log("#chord-" + chLine + "-" + ch);
            $("#chord-" + chLine + "-" + ch).html(ch + " <br>(" + key + ")");
          }
        }
      }
    }
  };
  chordHint();
  var chordAnimate = (id) => {
    $("#" + id).animate(
      {
        backgroundColor: "#88FFAA",
      },
      0
    );
    if (sustaining) {
      setTimeout(() => {
        $("#" + id).animate(
          {
            backgroundColor:
              id.replace("chord-", "").split("-")[0].search("b") == -1
                ? "#C2DEDC"
                : "#116A7B",
          },
          300,
          "easeOutExpo"
        );
      }, animateMs);
    }
  };
  var chordInfo = (str) => {
    $(".chord-info").html("<strong>Ditekan : </strong>" + str);
  };
})();
