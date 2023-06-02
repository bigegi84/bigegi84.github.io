(() => {
  const debug = true;
  let fadeout = true;
  let sustaining = true;
  const fret = {
    1: { 0: "A4", 1: "Bb4", 2: "B4", 3: "C5", 4: "Db5", 5: "D5" },
    2: { 0: "E4", 1: "F4", 2: "Gb4", 3: "G4", 4: "Ab4", 5: "A4" },
    3: { 0: "C4", 1: "Db4", 2: "D4", 3: "Eb4", 4: "E4", 5: "F4" },
    4: { 0: "G4", 1: "Ab4", 2: "A4", 3: "Bb4", 4: "B4", 5: "C5" },
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
      Ebmaj7: "3330",
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
      Emaj7: "1302",
      Gb7: "3424",
      Gbm: "2120",
      Gbm7: "2424",
      Gb6: "3324",
      Gb9: "1101",
    },
    G: {
      G: "0232",
      Gmaj7: "0111",
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
      $(jqCode.join(",")).mousedown();
      chordAnimate(id);
    });
  };
  // main
  ukuleleDraw();
  ukuleleSound();
  chordDraw();
  chordSound();
})();
