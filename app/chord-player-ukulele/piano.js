(() => {
  const debug = !true;
  let fadeout = true;
  let sustaining = true;
  let lastChord = null;
  let delayMs = 40;
  $("#input-delay").change((e) => {
    if (debug) console.log(e.target.value);
    if (e.target.value) delayMs = parseInt(e.target.value);
  });
  const fret = {
    1: {
      0: "A4",
      1: "Bb4",
      2: "B4",
      3: "C5",
      4: "Db5",
      5: "D5",
      6: "Eb5",
      7: "E5",
      8: "F5",
      9: "Gb5",
      10: "G5",
      11: "Ab5",
      12: "A5",
    },
    2: {
      0: "E4",
      1: "F4",
      2: "Gb4",
      3: "G4",
      4: "Ab4",
      5: "A4",
      6: "Bb4",
      7: "B4",
      8: "C5",
      9: "Db5",
      10: "D5",
      11: "Eb5",
      12: "E5",
    },
    3: {
      0: "C4",
      1: "Db4",
      2: "D4",
      3: "Eb4",
      4: "E4",
      5: "F4",
      6: "Gb4",
      7: "G4",
      8: "Ab5",
      9: "A4",
      10: "Bb4",
      11: "B4",
      12: "C5",
    },
    4: {
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
  };
  const ukuleleDraw = () => {
    let html = "";
    for (var x in fret) {
      var fretHtml = '<div id="fret-' + x + '" class="fret-line">';
      for (var y in fret[x]) {
        fretHtml +=
          '<div id="fret-' +
          x +
          "-" +
          y +
          '" class="fret">' +
          fret[x][y] +
          "</div>";
      }
      fretHtml += "</div>";
      html += fretHtml;
    }
    $("#ukulele").html(html);
  };

  const fretAnimate = (id) => {
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
            backgroundColor: "#deb887",
          },
          300,
          "easeOutExpo"
        );
      }, 1500);
    }
  };
  const ukuleleSound = () => {
    $(".fret").mousedown((e) => {
      const id = e.target.id;
      const note =
        fret[id.replace("fret-", "").split("-")[0]][
          id.replace("fret-", "").split("-")[1]
        ];
      sampler.triggerAttackRelease([note], 4);
      fretAnimate(id);
    });
  };
  const sampler = new Tone.Sampler({
    urls: {
      A4: "A4.mp3",
      Bb4: "Bb4.mp3",
      B4: "B4.mp3",
      C4: "C4.mp3",
      Db4: "Db4.mp3",
      D4: "D4.mp3",
      Eb4: "Eb4.mp3",
      E4: "E4.mp3",
      F4: "F4.mp3",
      Gb4: "Gb4.mp3",
      G4: "G4.mp3",
      Ab4: "Ab4.mp3",
    },
    release: 1,
    baseUrl: "samples/ukulele/",
  }).toDestination();

  const chord = {
    C: {
      C: "0003",
      Cmaj7: "0002",
      C7: "0001",
      Cm: "0333",
      Cm7: "3333",
      C6: "0000",
      C9: "0201",
    },
    Db: {
      Db: "1114",
      Dmaj7: "1113",
      Db7: "1112",
      Dbm: "1101",
      Dbm7: "4444",
      Db6: "1111",
      Db9: "1312",
    },
    D: {
      D: "2225",
      Dmaj7: "1113",
      D7: "2223",
      Dm: "2210",
      Dm7: "2213",
      D6: "2222",
      D9: "2423",
    },
    Eb: {
      Eb: "3331",
      Ebmaj7: "3335",
      Eb7: "3334",
      Ebm: "3321",
      Ebm7: "3324",
      Eb6: "3333",
      Eb9: "0111",
    },
    E: {
      E: "4442",
      Emaj7: "1302",
      E7: "1202",
      Em: "0432",
      Em7: "0202",
      E6: "1020",
      E9: "1222",
    },
    F: {
      F: "2010",
      Fmaj7: "2413",
      F7: "2310",
      Fm: "1013",
      Fm7: "1313",
      F6: "2213",
      F9: "2333",
    },
    Gb: {
      Gb: "3121",
      Gbmaj7: "0111",
      Gb7: "3424",
      Gbm: "2120",
      Gbm7: "2424",
      Gb6: "3324",
      Gb9: "1101",
    },
    G: {
      G: "0232",
      Gmaj7: "0222",
      G7: "0212",
      Gm: "0231",
      Gm7: "0211",
      G6: "0202",
      G9: "2212",
    },
    Ab: {
      Ab: "5343",
      Abmaj7: "1333",
      Ab7: "1323",
      Abm: "1342",
      Abm7: "0322",
      Ab6: "1313",
      Ab9: "3323",
      Abm9: "3342",
    },
    A: {
      A: "2100",
      Amaj7: "1100",
      A7: "0100",
      Am: "2000",
      Am7: "0433",
      A6: "2424",
      A9: "0102",
    },
    Bb: {
      Bb: "3211",
      Bbmaj7: "3210",
      Bb7: "1211",
      Bbm: "3111",
      Bbm7: "1111",
      Bb6: "0211",
      Bb9: "1213",
    },
    B: {
      B: "4322",
      Bmaj7: "3322",
      B7: "2322",
      Bm: "4222",
      Bm7: "2222",
      B6: "1322",
      B9: "2324",
    },
  };
  const chordDraw = () => {
    let html = "";
    for (var x in chord) {
      var chordHtml = '<div id="chord-line-' + x + '" class="chord-line">';
      for (var y in chord[x]) {
        chordHtml +=
          '<div id="chord-' + x + "-" + y + '" class="chord">' + y + "</div>";
      }
      chordHtml += "</div>";
      html += chordHtml;
    }
    $("#chord").html(html);
  };
  const chordAnimate = (id) => {
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
            backgroundColor: "white",
          },
          300,
          "easeOutExpo"
        );
      }, 1500);
    }
  };
  const chordSound = () => {
    $(".chord").mousedown((e) => {
      const id = e.target.id;
      const formula =
        chord[id.replace("chord-", "").split("-")[0]][
          id.replace("chord-", "").split("-")[1]
        ];
      const jqCode = [];
      for (var i = 0; i < formula.length; i++) {
        jqCode.push("#fret-" + (4 - i) + "-" + formula.charAt(i));
      }
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          $(it).mousedown();
        }, ms);
        ms = ms + delayMs;
      });
      chordAnimate(id);
      lastChord = jqCode;
    });
  };
  var keymap = {
    " ": "reverse",
    1: chord.C.C,
    "!": chord.C.Cmaj7,
    // q: playMap.twoBassAndChord.Cm,
    // Q: playMap.twoBassAndChord.Cm7,
    a: chord.C.C7,
    // z: "#key-C3,#key-G3",
    // 2: playMap.twoBassAndChord.Db,
    // "@": playMap.twoBassAndChord.Dbmaj7,
    // w: playMap.twoBassAndChord.Dbm,
    // W: playMap.twoBassAndChord.Dbm7,
    // s: playMap.twoBassAndChord.Db7,
    // x: "#key-Db3,#key-Ab3",
    // 3: playMap.twoBassAndChord.D,
    // "#": playMap.twoBassAndChord.Dmaj7,
    e: chord.D.Dm,
    // E: playMap.twoBassAndChord.Dm7,
    // d: playMap.twoBassAndChord.D7,
    // c: "#key-D3,#key-A3",
    // 4: playMap.twoBassAndChord.Eb,
    // $: playMap.twoBassAndChord.Ebmaj7,
    // r: playMap.twoBassAndChord.Ebm,
    // R: playMap.twoBassAndChord.Ebm7,
    // f: playMap.twoBassAndChord.Eb7,
    // v: "#key-Eb3,#key-Bb3",
    5: chord.E.E,
    // "%": playMap.twoBassAndChord.Emaj7,
    // t: playMap.twoBassAndChord.Em,
    // T: playMap.twoBassAndChord.Em7,
    // g: playMap.twoBassAndChord.E7,
    // b: "#key-E3,#key-B3",
    // 6: playMap.twoBassAndChord.F,
    // "^": playMap.twoBassAndChord.Fmaj7,
    // y: playMap.twoBassAndChord.Fm,
    // Y: playMap.twoBassAndChord.Fm7,
    // h: playMap.twoBassAndChord.F7,
    // n: "#key-F3,#key-C4",
    // 7: playMap.twoBassAndChord.Gb,
    // "&": playMap.twoBassAndChord.Gbmaj7,
    // u: playMap.twoBassAndChord.Gbm,
    // U: playMap.twoBassAndChord.Gbm7,
    // j: playMap.twoBassAndChord.Gb7,
    // m: "#key-Gb3,#key-Db4",
    8: chord.G.G,
    // "*": playMap.twoBassAndChord.Gmaj7,
    // i: playMap.twoBassAndChord.Gm,
    // I: playMap.twoBassAndChord.Gm7,
    // k: playMap.twoBassAndChord.G7,
    // ",": "#key-G3,#key-D4",
    // 9: playMap.twoBassAndChord.Ab,
    // "(": playMap.twoBassAndChord.Abmaj7,
    // o: playMap.twoBassAndChord.Abm,
    // O: playMap.twoBassAndChord.Abm7,
    // l: playMap.twoBassAndChord.Ab7,
    // ".": "#key-Ab3,#key-Eb4",
    // 0: playMap.twoBassAndChord.A,
    // ")": playMap.twoBassAndChord.Amaj7,
    // p: playMap.twoBassAndChord.Am,
    // P: playMap.twoBassAndChord.Am7,
    // ";": playMap.twoBassAndChord.A7,
    // "/": "#key-A2,#key-E3",
    // "-": playMap.twoBassAndChord.Bb,
    // _: playMap.twoBassAndChord.Bbmaj7,
    // "[": playMap.twoBassAndChord.Bbm,
    // "{": playMap.twoBassAndChord.Bbm7,
    // "'": playMap.twoBassAndChord.Bb7,
    // ArrowLeft: "#key-Bb2,#key-F3",
    // "=": playMap.twoBassAndChord.B,
    // "+": playMap.twoBassAndChord.Bmaj7,
    "]": chord.B.Bm,
    // "}": playMap.twoBassAndChord.Bm7,
    // "\\": playMap.twoBassAndChord.B7,
    // "`": "#key-B2,#key-Gb3",
  };
  const keyPress = () => {
    $(document).keydown((e) => {
      if (debug) console.log(e.key);
      if (e.key == " ") e.preventDefault();
      var str = keymap[e.key];
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
          const jqCode = [];
          for (var i = 0; i < str.length; i++) {
            jqCode.push("#fret-" + (4 - i) + "-" + str.charAt(i));
          }
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
  };
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
  // main
  ukuleleDraw();
  ukuleleSound();
  chordDraw();
  chordSound();
  keyPress();
  chordHint();
})();
