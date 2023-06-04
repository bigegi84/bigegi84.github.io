(() => {
  const debug = true;
  const cello = {
    animate: (note, press = true) => {
      if (press) {
        $("#note-" + note + ",#hint-" + note).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      } else {
        $("#note-" + note).animate(
          {
            backgroundColor: note.search("b") == -1 ? "white" : "black",
          },
          300,
          "easeOutExpo"
        );
        $("#hint-" + note).animate(
          {
            backgroundColor: note.search("b") == -1 ? "#D7C0AE" : "#967E76",
          },
          300,
          "easeOutExpo"
        );
      }
    },
    tone: new Tone.Sampler({
      urls: {
        C3: "C3.ogg",
        Eb3: "Eb3.ogg",
        Gb3: "Gb3.ogg",
        G3: "G3.ogg",
        A3: "A3.ogg",
        E4: "E4.ogg",
      },
      release: 1,
      baseUrl: "../../asset/sound/cello/",
    }).toDestination(),
    note: [
      "C2",
      "Db2",
      "D2",
      "Eb2",
      "E2",
      "F2",
      "Gb2",
      "G2",
      "Ab2",
      "A2",
      "Bb2",
      "B2",
    ],
    keymap: {
      1: "A2",
      2: "Bb2",
      3: "B2",
      q: "Gb2",
      w: "G2",
      e: "Ab2",
      a: "Eb2",
      s: "E2",
      d: "F2",
      z: "C2",
      x: "Db2",
      c: "D2",
    },
    intervals: {},
    depressed: {},
    keymapDraw: () => {
      let html = '<div class="contaner">';
      let i = 1;
      for (var key in cello.keymap) {
        if (i == 1) html += '<div style="display: flex;">';
        html +=
          '<div id="hint-' +
          cello.keymap[key] +
          '" class="hint ' +
          (cello.keymap[key].search("b") != -1 ? "hint-black" : "") +
          '"><p>' +
          cello.keymap[key] +
          " (" +
          key +
          ")</p></div>";
        i++;
        if (i == 4) {
          html += "</div>";
          i = 1;
        }
      }
      html += "</div>";
      console.log(html);
      $("#cello-keymap").html(html);
    },
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
        const note = id.replace("note-", "");
        if (cello.depressed[note]) {
          return;
        }
        if (id) {
          cello.tone.triggerAttack([note]);
          cello.animate(note, true);
          cello.depressed[note] = true;
        }
      });
      $(".note").mouseup((e) => {
        const id = e.currentTarget.id;
        const note = id.replace("note-", "");
        if (note) {
          cello.tone.triggerRelease([note]);
          cello.animate(note, false);
          cello.depressed[note] = false;
        }
      });
    },
    keydown: (e) => {
      if (debug) console.log(e.key);
      if (e.key == " ") e.preventDefault();
      var note = cello.keymap[e.key];
      if (!note) return;
      if (cello.depressed[note]) {
        return;
      }
      if (note) {
        cello.tone.triggerAttack([note]);
        cello.animate(note, true);
        cello.depressed[note] = true;
      }
    },
    keyup: (e) => {
      if (debug) console.log(e.key);
      if (e.key == " ") e.preventDefault();
      var note = cello.keymap[e.key];
      if (note) {
        cello.tone.triggerRelease([note]);
        cello.animate(note, false);
        cello.depressed[note] = false;
      }
    },
  };
  cello.draw();
  cello.sound();
  cello.keymapDraw();
  const violin = {
    animate: (note, press = true) => {
      if (press) {
        $("#violin-note-" + note + ",#hint-" + note).animate(
          {
            backgroundColor: "#88FFAA",
          },
          0
        );
      } else {
        $("#violin-note-" + note).animate(
          {
            backgroundColor: note.search("b") == -1 ? "white" : "black",
          },
          300,
          "easeOutExpo"
        );
        $("#hint-" + note).animate(
          {
            backgroundColor: note.search("b") == -1 ? "#D7C0AE" : "#967E76",
          },
          300,
          "easeOutExpo"
        );
      }
    },
    tone: new Tone.Sampler({
      urls: {
        G3: "G3.ogg",
        A3: "A3.ogg",
        C4: "C4.ogg",
        E4: "E4.ogg",
        G4: "G4.ogg",
        A4: "A4.ogg",
        C5: "C5.ogg",
        E5: "E5.ogg",
        G5: "G5.ogg",
        A5: "A5.ogg",
        C6: "C6.ogg",
        E6: "E6.ogg",
        G6: "G6.ogg",
        A6: "A6.ogg",
      },
      release: 1,
      baseUrl: "../../asset/sound/violin/",
    }).toDestination(),
    sustain: 4000,
    note: [
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
      "Ab5",
      "A5",
      "Bb5",
      "B5",
    ],
    keymap: {
      4: "Gb5",
      5: "G5",
      6: "Ab5",
      7: "A5",
      8: "Bb5",
      9: "B5",
      r: "C5",
      t: "Db5",
      y: "D5",
      u: "Eb5",
      i: "E5",
      o: "F5",

      f: "Gb4",
      g: "G4",
      h: "Ab4",
      j: "A4",
      k: "Bb4",
      l: "B4",

      v: "C4",
      b: "Db4",
      n: "D4",
      m: "Eb4",
      ",": "E4",
      ".": "F4",
    },
    keymapDraw: () => {
      let html = '<div class="contaner">';
      let i = 1;
      for (var key in violin.keymap) {
        if (i == 1) html += '<div style="display: flex;">';
        html +=
          '<div id="hint-' +
          violin.keymap[key] +
          '" class="hint ' +
          (violin.keymap[key].search("b") != -1 ? "hint-black" : "") +
          '"><p>' +
          violin.keymap[key] +
          " (" +
          key +
          ")</p></div>";
        i++;
        if (i == 7) {
          html += "</div>";
          i = 1;
        }
      }
      html += "</div>";
      console.log(html);
      $("#violin-keymap").html(html);
    },
    intervals: {},
    depressed: {},
    draw: () => {
      let html = '<div class="piano-container"><div class="piano-keys">';
      violin.note.forEach((x) => {
        if (x.search("b") == -1)
          html +=
            '<div id="violin-note-' +
            x +
            '" class="violin-note piano-white piano-' +
            x +
            '"><p class="note-info-white">' +
            x +
            "</p></div>";
        else
          html +=
            '<div class="piano-black"><div id="violin-note-' +
            x +
            '" class="violin-note piano-black-raised piano-' +
            x +
            '"><p class="note-info-black">' +
            x +
            "</p></div></div>";
      });
      html += "</div></div>";
      $("#violin").html(html);
    },
    sound: () => {
      $(".violin-note").mousedown((e) => {
        const id = e.currentTarget.id;
        const note = id.replace("violin-note-", "");
        if (debug) console.log(e.currentTarget.id);
        if (violin.depressed[note]) {
          return;
        }
        if (id) {
          violin.tone.triggerAttack([note]);
          violin.animate(note, true);
          violin.depressed[note] = true;
        }
      });
      $(".violin-note").mouseup((e) => {
        const id = e.currentTarget.id;
        const note = id.replace("violin-note-", "");
        if (id) {
          violin.tone.triggerRelease([note]);
          violin.animate(note, false);
          violin.depressed[note] = false;
        }
      });
    },
    keydown: (e) => {
      if (debug) console.log(e.key);
      if (e.key == " ") e.preventDefault();
      var note = violin.keymap[e.key];
      if (violin.depressed[note]) {
        return;
      }
      if (note) {
        violin.tone.triggerAttack([note]);
        violin.animate(note, true);
        violin.depressed[note] = true;
      }
    },
    keyup: (e) => {
      if (debug) console.log(e.key);
      if (e.key == " ") e.preventDefault();
      var note = violin.keymap[e.key];
      if (note) {
        violin.tone.triggerRelease([note]);
        violin.animate(note, false);
        violin.depressed[note] = false;
      }
    },
  };
  violin.draw();
  violin.sound();
  violin.keymapDraw();
  $(document).keydown((e) => {
    cello.keydown(e);
    violin.keydown(e);
  });
  $(document).keyup((e) => {
    cello.keyup(e);
    violin.keyup(e);
  });
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
