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
  const sampler = new Tone.Sampler({
    urls: {
      Db1: "Db1.ogg",
      E1: "E1.ogg",
      G1: "G1.ogg",
      Bb1: "Bb1.ogg",
      Db2: "Db2.ogg",
      E2: "E2.ogg",
      G2: "G2.ogg",
      Bb2: "Bb2.ogg",
      Db3: "Db3.ogg",
      E3: "E3.ogg",
      G3: "G3.ogg",
      Bb3: "Bb3.ogg",
      Db4: "Db4.ogg",
      E4: "E4.ogg",
      G4: "G4.ogg",
      Bb4: "Bb4.ogg",
    },
    release: 1,
    baseUrl: "../../asset/sound/bass-electric/",
  }).toDestination();
  const fret = {
    1: {
      0: "G2",
      1: "Ab2",
      2: "A2",
      3: "Bb2",
      4: "B2",
      5: "C3",
      6: "Db3",
      7: "D3",
      8: "Eb3",
      9: "E3",
      10: "F3",
      11: "Gb3",
      12: "G3",
    },
    2: {
      0: "D2",
      1: "Eb2",
      2: "E2",
      3: "F2",
      4: "Gb2",
      5: "G2",
      6: "Ab2",
      7: "A2",
      8: "Bb2",
      9: "B2",
      10: "C3",
      11: "Db3",
      12: "D3",
    },
    3: {
      0: "A1",
      1: "Bb1",
      2: "B1",
      3: "C2",
      4: "Db2",
      5: "D2",
      6: "Eb2",
      7: "E2",
      8: "F2",
      9: "Gb2",
      10: "G2",
      11: "Ab2",
      12: "A2",
    },
    4: {
      0: "E1",
      1: "F1",
      2: "Gb1",
      3: "G1",
      4: "Ab1",
      5: "A1",
      6: "Bb1",
      7: "B1",
      8: "C2",
      9: "Db2",
      10: "D2",
      11: "Eb2",
      12: "E2",
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
      sampler.triggerAttackRelease([note], 1.5);
      fretAnimate(id);
    });
  };

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
