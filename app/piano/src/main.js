(() => {
  var debug = true;
  var delayMs = 0;
  var animateMs = 1500;
  let depressed = {};
  let activeKeymap = true;
  var sustaining = true;
  var sustainMs = 1500;
  const theme = {
    pianoWhite: {
      backgroundColor: "#CDC2AE",
      textColor: "white",
    },
    pianoBlack: { backgroundColor: "#116A7B", textColor: "white" },
  };
  var playType = {
    name: "(Kiri) 2 Bas - (Kanan) Akor",
    code: "twoBassAndChord",
  };
  const playInfo = () => {
    let html = "<strong>Tipe Bermain:</strong>";
    $(".play-info").html(html + " " + playType.name);
  };
  playInfo();
  const tone = new Tone.Sampler({
    urls: {
      C2: "C2.ogg",
      Db2: "Db2.ogg",
      D2: "D2.ogg",
      Eb2: "Eb2.ogg",
      E2: "E2.ogg",
      F2: "F2.ogg",
      Gb2: "Gb2.ogg",
      G2: "G2.ogg",
      Ab2: "Ab2.ogg",
      A2: "A2.ogg",
      Bb2: "Bb2.ogg",
      B2: "B2.ogg",

      C3: "C3.ogg",
      Db3: "Db3.ogg",
      D3: "D3.ogg",
      Eb3: "Eb3.ogg",
      E3: "E3.ogg",
      F3: "F3.ogg",
      Gb3: "Gb3.ogg",
      G3: "G3.ogg",
      Ab3: "Ab3.ogg",
      A3: "A3.ogg",
      Bb3: "Bb3.ogg",
      B3: "B3.ogg",

      C4: "C4.ogg",
      Db4: "Db4.ogg",
      D4: "D4.ogg",
      Eb4: "Eb4.ogg",
      E4: "E4.ogg",
      F4: "F4.ogg",
      Gb4: "Gb4.ogg",
      G4: "G4.ogg",
      Ab4: "Ab4.ogg",
      A4: "A4.ogg",
      Bb4: "Bb4.ogg",
      B4: "B4.ogg",

      C5: "C5.ogg",
      Db5: "Db5.ogg",
      D5: "D5.ogg",
      Eb5: "Eb5.ogg",
      E5: "E5.ogg",
      F5: "F5.ogg",
      Gb5: "Gb5.ogg",
      G5: "G5.ogg",
      Ab5: "Ab5.ogg",
      A5: "A5.ogg",
      Bb5: "Bb5.ogg",
      B5: "B5.ogg",

      C6: "C6.ogg",
      Db6: "Db6.ogg",
      D6: "D6.ogg",
      Eb6: "Eb6.ogg",
      E6: "E6.ogg",
      F6: "F6.ogg",
      Gb6: "Gb6.ogg",
      G6: "G6.ogg",
      Ab6: "Ab6.ogg",
      A6: "A6.ogg",
      Bb6: "Bb6.ogg",
      B6: "B6.ogg",
    },
    release: 1,
    baseUrl: "../../asset/sound/piano/",
  }).toDestination();
  const note = [
    "C1",
    "Db1",
    "D1",
    "Eb1",
    "E1",
    "F1",
    "Gb1",
    "G1",
    "Ab1",
    "A1",
    "Bb1",
    "B1",

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
    "Ab5",
    "A5",
    "Bb5",
    "B5",

    "C6",
    "Db6",
    "D6",
    "Eb6",
    "E6",
    "F6",
    "Gb6",
    "G6",
    "Ab6",
    "A6",
    "Bb6",
    "B6",

    // "C7",
  ];
  const noteDraw = () => {
    let html =
      '<div class="piano-container"><span class="piano-brand">bigegi84</span><div class="piano-keys">';
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
  noteDraw();
  const noteAnimate = (id, press = true) => {
    if (press)
      $("#" + id).animate(
        {
          backgroundColor: "#88FFAA",
        },
        0
      );
    if (!press) {
      $("#" + id).animate(
        {
          backgroundColor:
            id.search("b") == -1
              ? theme.pianoWhite.backgroundColor
              : theme.pianoBlack.backgroundColor,
        },
        300,
        "easeOutExpo"
      );
    }
  };
  let interval = null;
  const noteDuration = (start = true) => {
    if (start) {
      if (!interval) {
        var startTime = Date.now();
        interval = setInterval(() => {
          var elapsedTime = Date.now() - startTime;
          document.getElementById("timer").innerHTML = (
            elapsedTime / 1000
          ).toFixed(3);
        }, 1);
      }
    } else {
      clearInterval(interval);
      interval = null;
    }
  };
  const noteMouseHandle = () => {
    $(".note").mousedown((e) => {
      const id = e.currentTarget.id;
      if (id) {
        tone.triggerAttack([id.replace("note-", "")]);
        noteDuration(true);
        noteAnimate(id);
      }
    });
    $(".note").mouseup((e) => {
      const id = e.currentTarget.id;
      if (id) {
        if (sustaining)
          tone.triggerRelease(
            [id.replace("note-", "")],
            Tone.now() + sustainMs / 1000
          );
        if (!sustaining) tone.triggerRelease([id.replace("note-", "")]);
        noteDuration(false);
        noteAnimate(id, false);
      }
    });
  };
  noteMouseHandle();
  const chord = {
    C: {
      C: "C4,E4,G4",
      Cmaj7: "C4,E4,G4,B4",
      C7: "C4,E4,G4,Bb4",
      Cm: "C4,Eb4,G4",
      Cm7: "C4,Eb4,G4,Bb4",
      C7b9: "C4,E4,G4,Bb4,Db5",
      Csus4: "C4,F4,G4",
      CBass2: "C3,G3",
    },
    Db: {
      Db: "Db4,F4,Ab4",
      Dbmaj7: "Db4,F4,Ab4,C5",
      Db7: "Db4,F4,Ab4,B4",
      Dbm: "Db4,E4,Ab4",
      Dbm7: "Db4,E4,Ab4,B4",
      DbBass2: "Db3,Ab3",
    },
    D: {
      D: "D4,Gb4,A4",
      Dmaj7: "D4,Gb4,A4,Db5",
      D7: "D4,Gb4,A4,C5",
      Dm: "D4,F4,A4",
      Dm7: "D4,F4,A4,C5",
      DBass2: "D3,A3",
    },
    Eb: {
      Eb: "Eb4,G4,Bb4",
      Ebmaj7: "Eb4,G4,Bb4,D5",
      Eb7: "Eb4,G4,Bb4,Db5",
      Ebm: "Eb4,Gb4,Bb4",
      Ebm7: "Eb4,Gb4,Bb4,Db5",
      Eb6: "Eb4,G4,Bb4,C5",
      Eb7b9: "Eb4,G4,Bb4,Db5,E5",
      EbBass2: "Eb3,Bb3",
    },
    E: {
      E: "E4,Ab4,B4",
      Emaj7: "E4,Ab4,B4,Eb5",
      E7: "E4,Ab4,B4,D5",
      Em: "E4,G4,B4",
      Em7: "E4,G4,B4,D5",
      EBass2: "E3,B3",
    },
    F: {
      F: "F4,A4,C5",
      Fmaj7: "F4,A4,C5,E5",
      F7: "F4,A4,C5,Eb5",
      Fm: "F4,Ab4,C5",
      Fm7: "F4,Ab4,C5,Eb5",
      FBass2: "F3,C4",
    },
    Gb: {
      Gb: "Gb4,Bb4,Db5",
      Gbmaj7: "Gb4,Bb4,Db5,F5",
      Gb7: "Gb4,Bb4,Db5,E5",
      Gbm: "Gb4,A4,Db5",
      Gbm7: "Gb4,A4,Db5,E5",
      GbBass2: "Gb3,Db4",
    },
    G: {
      G: "G3,B3,D4",
      Gmaj7: "G3,B3,D4,Gb4",
      G7: "G3,B3,D4,F4",
      Gm: "G3,Bb3,D4",
      Gm7: "G3,Bb3,D4,F4",
      Gm7b5: "G3,Bb3,Db4,F4",
      GBass2: "G2,D3",
    },
    Ab: {
      Ab: "Ab3,C4,Eb4",
      Abmaj7: "Ab3,C4,Eb4,G4",
      Ab7: "Ab3,C4,Eb4,Gb4",
      Abm: "Ab3,B3,Eb4",
      Abm7: "Ab3,B3,Eb4,Gb4",
      Abm9: "Ab3,B3,Eb4,Gb4,Bb4",
      AbBass2: "Ab2,Eb3",
    },
    A: {
      A: "A3,Db4,E4",
      Amaj7: "A3,Db4,E4,Ab4",
      A7: "A3,Db4,E4,G4",
      Am: "A3,C4,E4",
      Am7: "A3,C4,E4,G4",
      ABass2: "A2,E3",
    },
    Bb: {
      Bb: "Bb3,D4,F4",
      Bbmaj7: "Bb3,D4,F4,A4",
      Bb7: "Bb3,D4,F4,Ab4",
      Bbm: "Bb3,Db4,F4",
      Bbm7: "Bb3,Db4,F4,Ab4",
      BbBass2: "Bb2,F3",
    },
    B: {
      B: "B3,Eb4,Gb4",
      Bmaj7: "B3,Eb4,Gb4,Bb4",
      B7: "B3,Eb4,Gb4,A4",
      Bm: "B3,D4,Gb4",
      BmOverD: "D4,Gb4,B4",
      Bm7: "B3,D4,Gb4,A4",
      BBass2: "B2,Gb3",
      BmOverDBass2: "D3,B3",
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
          y.replace("Over", "/") +
          "</div>";
      }
      chordHtml += "</div>";
      html += chordHtml;
    }
    $("#chord").html(html);
  };
  chordDraw();
  const chordGetFormula = (id) => {
    const chLine = id.replace("chord-", "").split("-")[0];
    const ch = id.replace("chord-", "").split("-")[1];
    let formula = [chord[chLine][ch]];
    if (playType.code == "twoBassAndChord" && ch.search("Bass2") == -1) {
      let bass = chLine + "Bass2";
      if (ch.search("Over") != -1) bass = ch + "Bass2";
      formula = [chord[chLine][bass], ...formula];
    }
    return formula;
  };
  const chordSound = () => {
    $(".chord").mousedown((e) => {
      const id = e.target.id;
      let formula = chordGetFormula(id);
      let jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push("#note-" + x);
        });
      });
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
    $(".chord").mouseup((e) => {
      const id = e.target.id;
      let formula = chordGetFormula(id);
      let jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push("#note-" + x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          $(it).mouseup();
        }, ms);
        ms = ms + delayMs;
      });
      chordAnimate(e.target.id, false);
      chordInfo(formula.join(" - "));
    });
  };
  chordSound();
  var keymap = {
    1: ["C", "C"],
    "!": ["C", "Cmaj7"],
    q: ["C", "Cm"],
    Q: ["C", "Cm7"],
    a: ["C", "C7"],
    z: ["C", "CBass2"],
    2: ["Db", "Db"],
    "@": ["Db", "Dbmaj7"],
    w: ["Db", "Dbm"],
    W: ["Db", "Dbm7"],
    s: ["Db", "Db7"],
    x: ["Db", "DbBass2"],
    3: ["D", "D"],
    "#": ["D", "Dmaj7"],
    e: ["D", "Dm"],
    E: ["D", "Dm7"],
    d: ["D", "D7"],
    c: ["D", "DBass2"],
    4: ["Eb", "Eb"],
    $: ["Eb", "Ebmaj7"],
    r: ["Eb", "Ebm"],
    R: ["Eb", "Ebm7"],
    f: ["Eb", "Eb7"],
    v: ["Eb", "EbBass2"],
    5: ["E", "E"],
    "%": ["E", "Emaj7"],
    t: ["E", "Em"],
    T: ["E", "Em7"],
    g: ["E", "E7"],
    b: ["E", "EBass2"],
    6: ["F", "F"],
    "^": ["F", "Fmaj7"],
    y: ["F", "Fm"],
    Y: ["F", "Fm7"],
    h: ["F", "F7"],
    n: ["F", "FBass2"],
    7: ["Gb", "Gb"],
    "&": ["Gb", "Gbmaj7"],
    u: ["Gb", "Gbm"],
    U: ["Gb", "Gbm7"],
    j: ["Gb", "Gb7"],
    m: ["Gb", "GbBass2"],
    8: ["G", "G"],
    "*": ["G", "Gmaj7"],
    i: ["G", "Gm"],
    I: ["G", "Gm7"],
    k: ["G", "G7"],
    ",": ["G", "GBass2"],
    9: ["Ab", "Ab"],
    "(": ["Ab", "Abmaj7"],
    o: ["Ab", "Abm"],
    O: ["Ab", "Abm7"],
    l: ["Ab", "Ab7"],
    ".": ["Ab", "AbBass2"],
    0: ["A", "A"],
    ")": ["A", "Amaj7"],
    p: ["A", "Am"],
    P: ["A", "Am7"],
    ";": ["A", "A7"],
    "/": ["A", "ABass2"],
    "-": ["Bb", "Bb"],
    _: ["Bb", "Bbmaj7"],
    "[": ["Bb", "Bbm"],
    "{": ["Bb", "Bbm7"],
    "'": ["Bb", "Bb7"],
    ArrowLeft: ["Bb", "BbBass2"],
    "=": ["B", "B"],
    "+": ["B", "Bmaj7"],
    "]": ["B", "Bm"],
    "}": ["B", "Bm7"],
    "\\": ["B", "B7"],
    "`": ["B", "BBass2"],
  };
  let lastChord = null;
  const keyPress = () => {
    $(document).keydown((e) => {
      if (!activeKeymap) return;
      e.preventDefault();
      if (depressed[e.key]) return;
      depressed[e.key] = true;
      var str = keymap[e.key];
      if (str) {
        const chordId = "chord-" + str[0] + "-" + str[1];
        let formula = chordGetFormula(chordId);
        const jqCode = [];
        formula.forEach((f) => {
          f.split(",").forEach((x) => {
            jqCode.push("#note-" + x);
          });
        });
        let ms = 0;
        jqCode.forEach((it) => {
          setTimeout(() => {
            $(it).mousedown();
          }, ms);
          ms = ms + delayMs;
        });
        chordAnimate(chordId);
        lastChord = jqCode;
      }
    });
    $(document).keyup((e) => {
      depressed[e.key] = false;
      var str = keymap[e.key];
      if (str) {
        const chordId = "chord-" + str[0] + "-" + str[1];
        let formula = chordGetFormula(chordId);
        const jqCode = [];
        formula.forEach((f) => {
          f.split(",").forEach((x) => {
            jqCode.push("#note-" + x);
          });
        });
        let ms = 0;
        jqCode.forEach((it) => {
          setTimeout(() => {
            $(it).mouseup();
          }, ms);
          ms = ms + delayMs;
        });
        chordAnimate(chordId, false);
        chordInfo(formula.join(" - "));
      }
    });
  };
  keyPress();
  var chordHint = () => {
    for (var key in keymap) {
      var str = keymap[key];
      $("#chord-" + str[0] + "-" + str[1]).html(
        str[1] + " <br>" + key.replace("Arrow", "") + ""
      );
    }
  };
  chordHint();
  var chordAnimate = (id, press = true) => {
    $("#" + id).animate(
      {
        backgroundColor: "#88FFAA",
      },
      0
    );
    if (!press) {
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
    }
  };
  var chordInfo = (str) => {
    $(".chord-info").html(str);
  };
  const searchChord = (chRaw) => {
    const ch = chRaw.replace("#", "").replace("/", "Over");
    const chLine = ch.charAt(1) == "b" ? ch.substring(0, 2) : ch.charAt(0);
    return "#chord-" + chLine + "-" + ch;
  };
  let playTimeout = [];
  const playStop = () => {
    playTimeout.forEach((it) => clearTimeout(it));
    $(".chord").mouseup();
    $(".note").mouseup();
    playTimeout = [];
  };
  const playSheet = (id) => {
    const text = $(id).val();
    let sec = 0;
    text.split(" ").forEach((it) => {
      const note = it.split("-")[0];
      const duration = parseFloat(it.split("-")[1]);
      const code = note
        .split(",")
        .map((it) => {
          if (it.search("#") == -1) return "#note-" + it;
          if (it.search("#") != -1) return searchChord(it);
        })
        .join(",");
      const timeoutA = setTimeout(() => {
        $(code).mousedown();
      }, sec * 1000);
      const timeoutB = setTimeout(() => {
        $(code).mouseup();
      }, (sec + duration) * 1000);
      sec += duration;
      playTimeout.push(timeoutA);
      playTimeout.push(timeoutB);
    });
  };
  const sheet = () => {
    $("#play").mousedown((e) => {
      if ($("#play").text() == "Mainkan") {
        playSheet("#sheet-text-left");
        playSheet("#sheet-text-right");
        $("#play").text("Berhenti");
      } else {
        playStop();
        $("#play").text("Mainkan");
      }
    });
    $("#sheet-label-left").text("Kiri");
    $("#sheet-label-right").text("Kanan");
    $("#sheet-text-left").text(song["Mahalini - Sisa Rasa Ritme"][0]);
    $("#sheet-text-right").text(song["Mahalini - Sisa Rasa Ritme"][1]);
    $("#sheet-text-left,#sheet-text-right").focusin(() => {
      activeKeymap = false;
    });
    $("#sheet-text-left,#sheet-text-right").focusout(() => {
      activeKeymap = true;
    });
    let htmlOption = "";
    for (const key in song)
      htmlOption += '<option value="' + key + '">' + key + "</option>";
    $("#sheet-select").html(htmlOption);
    $("#sheet-select").change((e) => {
      $("#sheet-text-left").text(song[e.target.value][0]);
      $("#sheet-text-left").text(song[e.target.value][1]);
    });
  };
  sheet();
  const handleSustain = () => {
    $("#sustain").change((e) => {
      sustaining = e.target.checked;
    });
  };
  handleSustain();
})();
