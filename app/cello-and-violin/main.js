(() => {
  const debug = !true;
  let fadeout = true;
  let sustaining = true;
  let lastChord = null;
  let sustainMs = 1500;
  const animate = (id) => {
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
  const cello = {
    tone: new Tone.Sampler({
      urls: {
        C3: "C3.ogg",
        Eb3: "Eb3.ogg",
        Gb3: "Gb3.ogg",
        A3: "A3.ogg",
      },
      release: 1,
      baseUrl: "../../asset/sound/cello/",
    }).toDestination(),
    note: [
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
    ],
    draw: () => {
      let html = '<div class="piano-container"><div class="piano-keys">';
      cello.note.forEach((x) => {
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
      $("#cello").html(html);
    },
    sound: () => {
      $(".note").mousedown((e) => {
        const id = e.currentTarget.id;
        if (debug) console.log(e.currentTarget.id);
        if (debug) console.log("#sound-" + id.replace("note-", ""));
        if (id) {
          cello.tone.triggerAttackRelease(
            [id.replace("note-", "")],
            sustainMs / 1000
          );
          // pianoAnimate(id);
        }
      });
    },
  };
  cello.draw();
  cello.sound();
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
  // fretDraw();
  // fretSound();
  // keyPress();
  // keyHint();
  sustainInput();
})();
