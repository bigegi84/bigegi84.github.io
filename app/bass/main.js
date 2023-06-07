(() => {
  const debug = !true;
  let fadeout = true;
  let lastChord = null;
  let depressed = {};
  const sustain = {
    sustaining: true,
    ms: 1500,
    handleChange: () => {
      $("#sustaining").change((e) => {
        sustain.sustaining = e.target.checked;
      });
    },
  };
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
  const fretAnimate = (fret, press = true) => {
    if (press)
      $("#fret-" + fret[0] + "-" + fret[1]).animate(
        {
          backgroundColor: "#88FFAA",
        },
        0
      );
    else
      $("#fret-" + fret[0] + "-" + fret[1]).animate({
        backgroundColor: "#deb887",
      });
  };
  const fretSound = () => {
    $(".fret").mousedown((e) => {
      const id = e.currentTarget.id;
      const fretLine = id.replace("fret-", "").split("-")[0];
      const fretNumber = id.replace("fret-", "").split("-")[1];
      const note = fret[fretLine][fretNumber];
      if (id) {
        bassElectric.triggerAttack([note]);
        fretAnimate([fretLine, fretNumber], true);
      }
    });
    $(".fret").mouseup((e) => {
      const id = e.currentTarget.id;
      const fretLine = id.replace("fret-", "").split("-")[0];
      const fretNumber = id.replace("fret-", "").split("-")[1];
      const note = fret[fretLine][fretNumber];
      if (note) {
        if (sustain.sustaining) {
          bassElectric.triggerRelease([note], Tone.now() + sustain.ms / 1000);
        }
        if (!sustain.sustaining) {
          bassElectric.triggerRelease([note]);
        }
        fretAnimate([fretLine, fretNumber], false);
      }
    });
  };
  var keymap = {
    z: [4, 0],
    x: [4, 1],
    c: [4, 2],
    v: [4, 3],
    b: [4, 4],
    n: [4, 5],
    m: [4, 6],
    ",": [4, 7],
    ".": [4, 8],
    "//": [4, 9],

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
    "\\": [2, 12],
    "`": [2, 13],

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
  };
  const keyPress = () => {
    $(document).keydown((e) => {
      e.preventDefault();
      var note = keymap[e.key];
      if (!note) return;
      if (depressed[e.key]) {
        return;
      }
      if (note) {
        bassElectric.triggerAttack([fret[note[0]][note[1]]]);
        fretAnimate(note, true);
        depressed[e.key] = true;
      }
    });
    $(document).keyup((e) => {
      e.preventDefault();
      var note = keymap[e.key];
      if (!note) return;
      if (note) {
        if (sustain.sustaining)
          bassElectric.triggerRelease(
            [fret[note[0]][note[1]]],
            Tone.now() + sustain.ms / 1000
          );
        if (!sustain.sustaining)
          bassElectric.triggerRelease([fret[note[0]][note[1]]]);
        fretAnimate(note, false);
        depressed[e.key] = false;
      }
    });
  };
  var hint = () => {
    for (var key in keymap) {
      var str = keymap[key];
      var note = fret[str[0]][str[1]];
      $("#fret-" + str[0] + "-" + str[1]).html(note + " " + key + "");
    }
  };
  // main
  fretDraw();
  fretSound();
  keyPress();
  hint();
  sustain.handleChange();
})();
