(function () {
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
  ];

  /* Corresponding keyboard keycodes, in order w/ 'keys'. */
  /* QWERTY layout:
  /*   upper register: Q -> P, with 1-0 as black keys. */
  /*   lower register: Z -> M, , with A-L as black keys. */

  var codes = [
    90, 83, 88, 67, 70, 86, 71, 66, 78, 74, 77, 75, 81, 50, 87, 69, 52, 82, 53,
    84, 89, 55, 85, 56, 73, 57, 79, 80, 80, 80, 80,
  ];

  var pedal = 32; /* Keycode for sustain pedal. */
  var tonic = "A2"; /* Lowest pitch. */

  /* Piano state. */

  var intervals = {};
  var depressed = {};

  /* Selectors */

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

  /* Virtual piano keyboard events. */

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
    console.log(key);
    sampler.triggerAttackRelease([key], 4);
    // var audio = sound(key);
    // if (depressed[key]) {
    //   return;
    // }
    // clearInterval(intervals[key]);
    // if (audio) {
    //   audio.pause();
    //   audio.volume = 1.0;
    //   if (audio.readyState >= 2) {
    //     audio.currentTime = 0;
    //     audio.play();
    //     depressed[key] = true;
    //   }
    // }
    $(".animate" + pianoClass(key)).animate(
      {
        backgroundColor: "#88FFAA",
      },
      0
    );
  }

  /* Manually diminish the volume when the key is not sustained. */
  /* These values are hand-selected for a pleasant fade-out quality. */

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
      $(".animate" + pianoClass(key)).animate(
        {
          backgroundColor: "#deb887",
        },
        0
      );
      // $('.animate'+pianoClass(key)).css("background-color", "yellow");
      // console.log('.animate'+pianoClass(key))
    };
  }

  /* Simulate a gentle release, as opposed to hard stop. */

  var fadeout = true;

  /* Sustain pedal, toggled by user. */

  var sustaining = false;

  /* Register mouse event callbacks. */

  keys.forEach((key) => {
    $(pianoClass(key)).mousedown(function () {
      // $(pianoClass(key)).animate({
      //   'backgroundColor': '#88FFAA'
      // }, 0);
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

  /* Register keyboard event callbacks. */

  $(document).keydown(function (event) {
    console.log(event.key);
    if (event.which === pedal) {
      sustaining = true;
      $(pianoClass("pedal")).addClass("piano-sustain");
    }
    if (event.key == "1") $("#chord-C").click();
    // press(keydown(event.which));
  });

  $(document).keyup(function (event) {
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
