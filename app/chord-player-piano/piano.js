(function () {
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
  var pedal = 32;
  var tonic = "A2";
  var intervals = {};
  var depressed = {};
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
      }, 1000);
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

  /* Simulate a gentle release, as opposed to hard stop. */

  var fadeout = true;

  /* Sustain pedal, toggled by user. */

  var sustaining = true;

  /* Register mouse event callbacks. */

  keys.forEach(function (key) {
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
  var keyPressed = [];
  var keymap = {
    1: "#chord-C",
    "!": "#chord-Cmaj7",
    q: "#chord-Cm",
    Q: "#chord-Cm7",
    a: "#chord-C7",
    z: "#key-C3,#key-G3",
    2: "#chord-Db",
    3: "#chord-D",
    e: "#chord-Dm",
    c: "#key-D3,#key-A3",
    4: "#chord-Eb",
    5: "#chord-E",
    t: "#chord-Em",
    b: "#key-E3,#key-B3",
    6: "#chord-F",
    y: "#chord-Fm",
    n: "#key-F3,#key-C4",
    7: "#chord-Gb",
    8: "#chord-G",
    i: "#chord-Gm",
    ",": "#key-G3,#key-D4",
    9: "#chord-Ab",
    0: "#chord-A",
    p: "#chord-Am",
    "/": "#key-A2,#key-E3",
    "-": "#chord-Bb",
    "=": "#chord-B",
    "]": "#chord-Bm",
    ArrowUp: "#key-B2,#key-Gb3",
  };
  function keyPress(key = "", press = true) {
    if (keymap[key]) {
      if (press) {
        const index = keyPressed.indexOf(keymap[key]);
        if (index == -1) keyPressed.push(keymap[key]);
      }
      if (!press) {
        const index = keyPressed.indexOf(keymap[key]);
        if (index > -1) {
          keyPressed.splice(index, 1);
        }
      }
      $(".chord-info").text(keyPressed.sort().join(" "));
      if (press) $(keymap[key]).mousedown();
      else $(keymap[key]).mouseup();
    }
  }
  $(document).keydown(function (event) {
    if (event.which === pedal) {
      sustaining = true;
      $(pianoClass("pedal")).addClass("piano-sustain");
    }
    keyPress(event.key, true);
  });

  $(document).keyup(function (event) {
    keyPress(event.key, false);
    if (event.which === pedal) {
      sustaining = false;
      $(pianoClass("pedal")).removeClass("piano-sustain");
      Object.keys(depressed).forEach(function (key) {
        if (!depressed[key]) {
          if (fadeout) {
            fade(key)();
          } else {
            kill(key)();
          }
        }
      });
    }
    if (keyup(event.which)) {
      depressed[keyup(event.which)] = false;
      if (!sustaining) {
        if (fadeout) {
          fade(keyup(event.which))();
        } else {
          kill(keyup(event.which))();
        }
      }
    }
  });
})();
