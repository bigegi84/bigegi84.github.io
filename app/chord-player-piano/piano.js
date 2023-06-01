(() => {
  var debug = true;
  var animateMs = 1500;
  var fadeout = true;
  var sustaining = true;
  var pedal = 32;
  var tonic = "A2";
  var intervals = {};
  var depressed = {};

  var keys = [
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
  ];
  var codes = [
    90, 83, 88, 67, 70, 86, 71, 66, 78, 74, 77, 75, 81, 50, 87, 69, 52, 82, 53,
    84, 89, 55, 85, 56, 73, 57, 79, 80,
  ];
  function pianoClass(name) {
    return ".piano-" + name;
  }
  function soundId(id) {
    return "sound-" + id;
  }
  function sound(id) {
    var it = document.getElementById(soundId(id));
    return it;
  }
  function keyup(code) {
    var offset = codes.indexOf(code);
    var k;
    if (offset >= 0) {
      k = keys.indexOf(tonic) + offset;
      return keys[k];
    }
  }
  function keydown(code) {
    return keyup(code);
  }

  function press(key) {
    var audio = sound(key);
    if (depressed[key]) {
      return;
    }
    clearInterval(intervals[key]);
    if (audio) {
      audio.pause();
      audio.volume = 1.0;
      if (audio.readyState >= 2) {
        audio.currentTime = 0;
        audio.play();
        depressed[key] = true;
      }
    }
    $(".animate" + pianoClass(key)).animate(
      {
        backgroundColor: "#88FFAA",
      },
      0
    );
    if (sustaining) {
      setTimeout(() => {
        $(".chord" + pianoClass(key)).animate(
          {
            backgroundColor: "white",
          },
          300,
          "easeOutExpo"
        );
        if (key.length > 2) {
          $(".animate" + pianoClass(key)).animate(
            {
              backgroundColor: "black",
            },
            300,
            "easeOutExpo"
          );
        } else {
          $(".animate" + pianoClass(key)).animate(
            {
              backgroundColor: "white",
            },
            300,
            "easeOutExpo"
          );
        }
      }, 2000);
    }
  }
  function fade(key) {
    var audio = sound(key);
    var stepfade = function () {
      if (audio) {
        if (audio.volume < 0.03) {
          kill(key)();
        } else {
          if (audio.volume > 0.2) {
            audio.volume = audio.volume * 0.95;
          } else {
            audio.volume = audio.volume - 0.01;
          }
        }
      }
    };
    return function () {
      clearInterval(intervals[key]);
      intervals[key] = setInterval(stepfade, 5);
    };
  }

  /* Bring a key to an immediate halt. */

  function kill(key) {
    var audio = sound(key);
    return function () {
      clearInterval(intervals[key]);
      if (audio) {
        audio.pause();
      }
      if (key.length > 2) {
        $(".animate" + pianoClass(key)).animate(
          {
            backgroundColor: "black",
          },
          300,
          "easeOutExpo"
        );
      } else {
        $(".animate" + pianoClass(key)).animate(
          {
            backgroundColor: "white",
          },
          300,
          "easeOutExpo"
        );
      }
    };
  }
  keys.forEach((key) => {
    $(pianoClass(key)).mousedown(function () {
      // console.log(key);
      $(pianoClass(key)).animate(
        {
          backgroundColor: "#88FFAA",
        },
        0
      );
      press(key);
    });
    if (fadeout) {
      $(pianoClass(key)).mouseup(function () {
        depressed[key] = false;
        if (!sustaining) {
          fade(key)();
        }
      });
    } else {
      $(pianoClass(key)).mouseup(function () {
        depressed[key] = false;
        if (!sustaining) {
          kill(key)();
        }
      });
    }
  });
  var playType = {
    name: "(Kiri) 2 Bass - (Kanan) Akor",
    code: "twoBassAndChord",
  };
  var keyPressed = [];
  var formula = {
    C: ".piano-C4,.piano-E4,.piano-G4",
    Cm: ".piano-C4,.piano-Eb4,.piano-G4",
    C2Bass: ".piano-C3,.piano-G3",
    Db: ".piano-Db4,.piano-F4,.piano-Ab4",
    Dbm: ".piano-Db4,.piano-E4,.piano-Ab4",
    Db2Bass: ".piano-Db3,.piano-Ab3",
    D: ".piano-D4,.piano-Gb4,.piano-A4",
    Dm: ".piano-D4,.piano-F4,.piano-A4",
    D2Bass: ".piano-D3,.piano-A3",
    Eb: ".piano-Eb4,.piano-G4,.piano-Bb4",
    Ebm: ".piano-Eb4,.piano-Gb4,.piano-Bb4",
    Eb2Bass: ".piano-Eb3,.piano-Bb3",
    E: ".piano-E4,.piano-Ab4,.piano-B4",
    Em: ".piano-E4,.piano-G4,.piano-B4",
    E2Bass: ".piano-E3,.piano-B3",
    F: ".piano-F4,.piano-A4,.piano-C5",
    Fm: ".piano-F4,.piano-Ab4,.piano-C5",
    F2Bass: ".piano-F3,.piano-C4",
    Gb: ".piano-Gb4,.piano-Bb4,.piano-Db5",
    Gbm: ".piano-Gb4,.piano-A4,.piano-Db5",
    Gb2Bass: ".piano-Gb3,.piano-Db4",
    G: ".piano-G4,.piano-B4,.piano-D5",
    Gm: ".piano-G4,.piano-Bb4,.piano-D5",
    G2Bass: ".piano-G3,.piano-D4",
    Ab: ".piano-Ab4,.piano-C5,.piano-Eb5",
    Abm: ".piano-Ab4,.piano-B5,.piano-Eb5",
    Ab2Bass: ".piano-Ab3,.piano-Eb4",
    A: ".piano-A4,.piano-Db5,.piano-E5",
    Am: ".piano-A4,.piano-C5,.piano-E5",
    A2Bass: ".piano-A3,.piano-E4",
    Bb: ".piano-Bb4,.piano-D5,.piano-F5",
    Bbm: ".piano-Bb4,.piano-Db5,.piano-F5",
    Bb2Bass: ".piano-Bb3,.piano-F4",
    B: ".piano-B4,.piano-Eb5,.piano-Gb5",
    Bm: ".piano-B4,.piano-D5,.piano-Gb5",
    B2Bass: ".piano-B3,.piano-Gb4",
  };
  var playMap = {
    twoBassAndChord: {
      C: [formula["C"], formula["C2Bass"]].join(","),
      Cm: [formula["Cm"], formula["C2Bass"]].join(","),
      Db: [formula["Db"], formula["Db2Bass"]].join(","),
      Dbm: [formula["Dbm"], formula["Db2Bass"]].join(","),
      D: [formula["D"], formula["D2Bass"]].join(","),
      Dm: [formula["Dm"], formula["D2Bass"]].join(","),
      Eb: [formula["Eb"], formula["Eb2Bass"]].join(","),
      Ebm: [formula["Ebm"], formula["Eb2Bass"]].join(","),
      E: [formula["E"], formula["E2Bass"]].join(","),
      Em: [formula["Em"], formula["E2Bass"]].join(","),
      F: [formula["F"], formula["F2Bass"]].join(","),
      Fm: [formula["Fm"], formula["F2Bass"]].join(","),
      Gb: [formula["Gb"], formula["Gb2Bass"]].join(","),
      Gbm: [formula["Gbm"], formula["Gb2Bass"]].join(","),
      G: [formula["G"], formula["G2Bass"]].join(","),
      Gm: [formula["Gm"], formula["G2Bass"]].join(","),
      Ab: [formula["Ab"], formula["Ab2Bass"]].join(","),
      Abm: [formula["Abm"], formula["Ab2Bass"]].join(","),
      A: [formula["A"], formula["A2Bass"]].join(","),
      Am: [formula["Am"], formula["A2Bass"]].join(","),
      Bb: [formula["Bb"], formula["Bb2Bass"]].join(","),
      Bbm: [formula["Bbm"], formula["Bb2Bass"]].join(","),
      B: [formula["B"], formula["B2Bass"]].join(","),
      Bm: [formula["Bm"], formula["B2Bass"]].join(","),
    },
  };
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
            backgroundColor: "white",
          },
          300,
          "easeOutExpo"
        );
      }, animateMs);
    }
  };
  var chordInfo = (str) => {
    $(".chord-info").html(
      "<strong>Ditekan : </strong>" + str.replaceAll(".piano-", "")
    );
  };
  $(".chord").mousedown((e) => {
    var str = playMap[playType.code][e.target.id.replace("chord-", "")];
    console.log(str);
    $(str).mousedown();
    chordAnimate(e.target.id);
    chordInfo(str);
  });
  $(".chord").mousedown((e) => {
    var str = playMap[playType.code][e.target.id.replace("chord-", "")];
    $(str).mouseup();
    chordAnimate(e.target.id);
    chordInfo(str);
  });
  var keymap = {
    normal: {
      1: "#chord-C",
      "!": "#chord-Cmaj7",
      q: "#chord-Cm",
      Q: "#chord-Cm7",
      a: "#chord-C7",
      z: "#key-C3,#key-G3",
      2: "#chord-Db",
      w: "#chord-Dbm",
      s: "#chord-Db7",
      x: "#key-Db3,#key-Ab3",
      3: "#chord-D",
      e: "#chord-Dm",
      c: "#key-D3,#key-A3",
      4: "#chord-Eb",
      r: "#chord-Ebm",
      f: "#chord-Eb7",
      v: "#key-Eb3,#key-Bb3",
      5: "#chord-E",
      t: "#chord-Em",
      g: "#chord-E7",
      b: "#key-E3,#key-B3",
      6: "#chord-F",
      y: "#chord-Fm",
      h: "#chord-F7",
      n: "#key-F3,#key-C4",
      7: "#chord-Gb",
      u: "#chord-Gbm",
      j: "#chord-Gb7",
      m: "#key-Gb3,#key-Db4",
      8: "#chord-G",
      i: "#chord-Gm",
      k: "#chord-G7",
      ",": "#key-G3,#key-D4",
      9: "#chord-Ab",
      o: "#chord-Abm",
      l: "#chord-Ab7",
      ".": "#key-Ab3,#key-Eb4",
      0: "#chord-A",
      p: "#chord-Am",
      ";": "#chord-A7",
      "/": "#key-A2,#key-E3",
      "-": "#chord-Bb",
      "[": "#chord-Bbm",
      "'": "#chord-Bb7",
      ArrowLeft: "#key-Bb2,#key-F3",
      "=": "#chord-B",
      "]": "#chord-Bm",
      "\\": "#chord-B7",
      "`": "#key-B2,#key-Gb3",
    },
    twoBassAndChord: {
      1: playMap.twoBassAndChord.C,
      "!": "#chord-Cmaj7",
      q: playMap.twoBassAndChord.Cm,
      Q: "#chord-Cm7,#key-C3,#key-G3",
      a: "#chord-C7,#key-C3,#key-G3",
      z: "#key-C3,#key-G3",
      2: playMap.twoBassAndChord.Db,
      w: playMap.twoBassAndChord.Dbm,
      s: "#chord-Db7,#key-Db3,#key-Ab3",
      x: "#key-Db3,#key-Ab3",
      3: playMap.twoBassAndChord.D,
      e: playMap.twoBassAndChord.Dm,
      c: "#key-D3,#key-A3",
      4: playMap.twoBassAndChord.Eb,
      r: playMap.twoBassAndChord.Ebm,
      f: "#chord-Eb7,#key-Eb3,#key-Bb3",
      v: "#key-Eb3,#key-Bb3",
      5: playMap.twoBassAndChord.E,
      t: playMap.twoBassAndChord.Em,
      g: "#chord-E7,#key-E3,#key-B3",
      b: "#key-E3,#key-B3",
      6: playMap.twoBassAndChord.F,
      y: playMap.twoBassAndChord.Fm,
      h: "#chord-F7,#key-F3,#key-C4",
      n: "#key-F3,#key-C4",
      7: playMap.twoBassAndChord.Gb,
      u: playMap.twoBassAndChord.Gbm,
      j: "#chord-Gb7,#key-Gb3,#key-Db4",
      m: "#key-Gb3,#key-Db4",
      8: playMap.twoBassAndChord.G,
      i: playMap.twoBassAndChord.Gm,
      k: "#chord-G7,#key-G3,#key-D4",
      ",": "#key-G3,#key-D4",
      9: playMap.twoBassAndChord.Ab,
      o: playMap.twoBassAndChord.Abm,
      l: "#chord-Ab7,#key-Ab3,#key-Eb4",
      ".": "#key-Ab3,#key-Eb4",
      0: playMap.twoBassAndChord.A,
      p: playMap.twoBassAndChord.Am,
      ";": "#chord-A7,#key-A2,#key-E3",
      "/": "#key-A2,#key-E3",
      "-": playMap.twoBassAndChord.Bb,
      "[": playMap.twoBassAndChord.Bbm,
      "'": "#chord-Bb7,#key-Bb2,#key-F3",
      ArrowLeft: "#key-Bb2,#key-F3",
      "=": playMap.twoBassAndChord.B,
      "]": playMap.twoBassAndChord.Bm,
      "\\": "#chord-B7,#key-B2,#key-Gb3",
      "`": "#key-B2,#key-Gb3",
    },
  };
  var chordWithHint = () => {
    for (var key in keymap[playType.code]) {
      var str = keymap[playType.code][key];
      for (var ch in playMap[playType.code]) {
        if (playMap[playType.code][ch] == str)
          $("#chord-" + ch).text(ch + " (" + key + ")");
      }
    }
  };
  chordWithHint();
  $(".play-info").html("<strong>Tipe Bermain:</strong> " + playType.name);
  var keyPress = (key = "", press = true) => {
    console.log(key);
    var str = keymap[playType.code][key];
    if (str) {
      chordInfo(str);
      if (press) {
        var found;
        for (var key in playMap[playType.code]) {
          if (playMap[playType.code][key] == str) found = key;
        }
        if (found) chordAnimate("chord-" + found);
        $(str).mousedown();
      }
      if (!press) {
        $(str).mouseup();
      }
    }
  };
  $(document).keydown((event) => {
    keyPress(event.key, true);
  });

  $(document).keyup((event) => {
    keyPress(event.key, false);
  });
})();
