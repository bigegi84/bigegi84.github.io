(() => {
  const debug = !true;
  let fadeout = true;
  let sustaining = true;
  let lastChord = null;
  let sustainMs = 1500;
  const bassElectric = new Tone.Sampler({
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
  const fretDraw = () => {
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
    $("#fret").html(html);
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
  const fretSound = () => {
    $(".fret").mousedown((e) => {
      const id = e.target.id;
      const note =
        fret[id.replace("fret-", "").split("-")[0]][
          id.replace("fret-", "").split("-")[1]
        ];
      bassElectric.triggerAttackRelease([note], sustainMs / 1000);
      fretAnimate(id);
    });
  };
  // var keymap = {
  //   " ": "reverse",
  //   1: chord.C.C,
  //   "!": chord.C.Cmaj7,
  //   // q: playMap.twoBassAndChord.Cm,
  //   // Q: playMap.twoBassAndChord.Cm7,
  //   a: chord.C.C7,
  //   // z: "#key-C3,#key-G3",
  //   // 2: playMap.twoBassAndChord.Db,
  //   // "@": playMap.twoBassAndChord.Dbmaj7,
  //   // w: playMap.twoBassAndChord.Dbm,
  //   // W: playMap.twoBassAndChord.Dbm7,
  //   // s: playMap.twoBassAndChord.Db7,
  //   // x: "#key-Db3,#key-Ab3",
  //   // 3: playMap.twoBassAndChord.D,
  //   // "#": playMap.twoBassAndChord.Dmaj7,
  //   e: chord.D.Dm,
  //   // E: playMap.twoBassAndChord.Dm7,
  //   // d: playMap.twoBassAndChord.D7,
  //   // c: "#key-D3,#key-A3",
  //   // 4: playMap.twoBassAndChord.Eb,
  //   // $: playMap.twoBassAndChord.Ebmaj7,
  //   // r: playMap.twoBassAndChord.Ebm,
  //   // R: playMap.twoBassAndChord.Ebm7,
  //   // f: playMap.twoBassAndChord.Eb7,
  //   // v: "#key-Eb3,#key-Bb3",
  //   5: chord.E.E,
  //   // "%": playMap.twoBassAndChord.Emaj7,
  //   // t: playMap.twoBassAndChord.Em,
  //   // T: playMap.twoBassAndChord.Em7,
  //   // g: playMap.twoBassAndChord.E7,
  //   // b: "#key-E3,#key-B3",
  //   // 6: playMap.twoBassAndChord.F,
  //   // "^": playMap.twoBassAndChord.Fmaj7,
  //   // y: playMap.twoBassAndChord.Fm,
  //   // Y: playMap.twoBassAndChord.Fm7,
  //   // h: playMap.twoBassAndChord.F7,
  //   // n: "#key-F3,#key-C4",
  //   // 7: playMap.twoBassAndChord.Gb,
  //   // "&": playMap.twoBassAndChord.Gbmaj7,
  //   // u: playMap.twoBassAndChord.Gbm,
  //   // U: playMap.twoBassAndChord.Gbm7,
  //   // j: playMap.twoBassAndChord.Gb7,
  //   // m: "#key-Gb3,#key-Db4",
  //   8: chord.G.G,
  //   // "*": playMap.twoBassAndChord.Gmaj7,
  //   // i: playMap.twoBassAndChord.Gm,
  //   // I: playMap.twoBassAndChord.Gm7,
  //   // k: playMap.twoBassAndChord.G7,
  //   // ",": "#key-G3,#key-D4",
  //   // 9: playMap.twoBassAndChord.Ab,
  //   // "(": playMap.twoBassAndChord.Abmaj7,
  //   // o: playMap.twoBassAndChord.Abm,
  //   // O: playMap.twoBassAndChord.Abm7,
  //   // l: playMap.twoBassAndChord.Ab7,
  //   // ".": "#key-Ab3,#key-Eb4",
  //   // 0: playMap.twoBassAndChord.A,
  //   // ")": playMap.twoBassAndChord.Amaj7,
  //   // p: playMap.twoBassAndChord.Am,
  //   // P: playMap.twoBassAndChord.Am7,
  //   // ";": playMap.twoBassAndChord.A7,
  //   // "/": "#key-A2,#key-E3",
  //   // "-": playMap.twoBassAndChord.Bb,
  //   // _: playMap.twoBassAndChord.Bbmaj7,
  //   // "[": playMap.twoBassAndChord.Bbm,
  //   // "{": playMap.twoBassAndChord.Bbm7,
  //   // "'": playMap.twoBassAndChord.Bb7,
  //   // ArrowLeft: "#key-Bb2,#key-F3",
  //   // "=": playMap.twoBassAndChord.B,
  //   // "+": playMap.twoBassAndChord.Bmaj7,
  //   "]": chord.B.Bm,
  //   // "}": playMap.twoBassAndChord.Bm7,
  //   // "\\": playMap.twoBassAndChord.B7,
  //   // "`": "#key-B2,#key-Gb3",
  // };
  // const keyPress = () => {
  //   $(document).keydown((e) => {
  //     if (debug) console.log(e.key);
  //     if (e.key == " ") e.preventDefault();
  //     var str = keymap[e.key];
  //     if (str) {
  //       if (str == "reverse" && lastChord != null) {
  //         let ms = 0;
  //         lastChord.reverse().forEach((it) => {
  //           setTimeout(() => {
  //             $(it).mousedown();
  //           }, ms);
  //           ms = ms + sustainMs;
  //         });
  //       } else {
  //         const jqCode = [];
  //         for (var i = 0; i < str.length; i++) {
  //           jqCode.push("#fret-" + (4 - i) + "-" + str.charAt(i));
  //         }
  //         let ms = 0;
  //         jqCode.forEach((it) => {
  //           setTimeout(() => {
  //             $(it).mousedown();
  //           }, ms);
  //           ms = ms + sustainMs;
  //         });
  //         lastChord = jqCode;
  //       }
  //     }
  //   });
  // };
  // var keyHint = () => {
  //   for (var key in keymap) {
  //     var str = keymap[key];
  //     for (var chLine in chord) {
  //       for (var ch in chord[chLine]) {
  //         if (chord[chLine][ch] == str) {
  //           if (debug) console.log("#chord-" + chLine + "-" + ch);
  //           $("#chord-" + chLine + "-" + ch).html(ch + " <br>(" + key + ")");
  //         }
  //       }
  //     }
  //   }
  // };
  const sustainInput = () => {
    $("#sustain-ms").change((e) => {
      if (debug) console.log(e.target.value);
      if (e.target.value) sustainMs = parseInt(e.target.value);
    });
  };
  // main
  fretDraw();
  fretSound();
  // keyPress();
  // keyHint();
  sustainInput();
})();
