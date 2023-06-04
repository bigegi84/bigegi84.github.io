(() => {
  const depress = {};
  const note = {
    bass: ["bass", "Bass"],
    snare: ["snare", "Snare"],
    hihatClosed: ["hihat-closed", "Hihat Closed"],
    hihatOpen: ["hihat-open", "Hihat Open"],
    crash: ["crash", "Crash"],
    rideCrash: ["ride-crash", "Ride Crash"],
    tomtomSmall: ["tomtom-small", "Tomtom Small"],
    tomtomMedium: ["tomtom-medium", "Tomtom Medium"],
    tomtomFloor: ["tomtom-floor", "Tomtom Floor"],
  };
  const keymap = {
    " ": note.hihatOpen[0],
    q: note.hihatOpen[0],
    w: note.hihatOpen[0],

    e: note.rideCrash[0],
    r: note.rideCrash[0],

    y: note.tomtomSmall[0],
    u: note.tomtomSmall[0],

    2: note.snare[0],
    i: note.snare[0],
    o: note.snare[0],
    p: note.snare[0],
    "[": note.snare[0],

    h: note.tomtomMedium[0],
    j: note.tomtomMedium[0],

    k: note.bass[0],
    l: note.bass[0],
    ";": note.bass[0],
    "'": note.bass[0],

    a: note.hihatClosed[0],
    s: note.hihatClosed[0],

    d: note.crash[0],

    n: note.tomtomFloor[0],
    m: note.tomtomFloor[0],
  };
  const handleKeymap = () => {
    $(document).keydown((e) => {
      e.preventDefault();
      const note = keymap[e.key];
      if (depress[e.key]) return;
      if (note) {
        $("#sound-" + note)
          .clone()[0]
          .play();
        depress[e.key] = true;
        animate(keymap[e.key]);
      }
    });
    $(document).keyup((e) => {
      depress[e.key] = false;
      if (keymap[e.key]) animate(keymap[e.key], false);
    });
  };
  const drumDraw = () => {
    let html = "";
    let i = 1;
    for (const key in note) {
      if (i == 1) html += '<div style="display: flex;">';
      html +=
        '<div id="note-' +
        note[key][0] +
        '" class="note">' +
        note[key][1] +
        "</div>";
      i++;
      if (i == 6) {
        html += "</div>";
        i = 1;
      }
    }
    html += "";
    $("#drum").html(html);
  };
  const handleMouse = () => {
    $(".note").mousedown((e) => {
      const id = e.currentTarget.id;
      if (id) {
        $("#sound-" + id.replace("note-", ""))
          .clone()[0]
          .play();
        animate(id.replace("note-", ""));
      }
    });
    $(".note").mouseup((e) => {
      const id = e.currentTarget.id;
      if (id) {
        animate(id.replace("note-", ""), false);
      }
    });
  };
  const animate = (note, press = true) => {
    if (press) {
      $("#note-" + note).animate(
        {
          backgroundColor: "#88FFAA",
        },
        0
      );
    } else {
      $("#note-" + note).animate(
        {
          backgroundColor: "#526d82",
        },
        0
      );
    }
  };
  drumDraw();
  handleKeymap();
  handleMouse();
  const gamepadHandle = () => {
    const { GamepadListener } = gamepad;
    const outputs = document.getElementsByClassName("output");
    const titles = document.getElementsByTagName("h3");

    function output(index, message) {
      const container = outputs[index];
      container.innerText = message.toString() + "\n" + container.innerText;
    }

    const listener = new GamepadListener({
      deadZone: 0.05,
      precision: 3,
    });

    listener.on("gamepad:connected", (event) => {
      // const { index, gamepad } = event.detail;
      // const title = titles[index];
      // if (typeof title.defaultText === "undefined") {
      //   title.defaultText = title.innerText;
      // }
      // title.innerText = gamepad.id;
      // output(index, `Connected: ${gamepad.id}`, event.detail);
    });

    listener.on("gamepad:disconnected", (event) => {
      const { index } = event.detail;
      const title = titles[index];
    });

    listener.on("gamepad:axis", (event) => {
      const { index, axis, value } = event.detail;
    });

    const gamepadDepressed = {};
    const gamepadKey = {
      A: 0,
      X: 2,
      Y: 3,
      Up: 12,
      Left: 14,
      Right: 15,
      Down: 13,
      RB: 5,
    };
    const gamepadMap = {
      [gamepadKey.RB]: note.snare,
      [gamepadKey.X]: note.snare,
      [gamepadKey.A]: note.bass,
      [gamepadKey.Up]: note.crash,
      [gamepadKey.Right]: note.hihatOpen,
      [gamepadKey.Down]: note.hihatClosed,
      [gamepadKey.Left]: note.rideCrash,
    };
    listener.on("gamepad:button", (event) => {
      const { index, button, value, pressed } = event.detail;
      console.log(
        index,
        "Button [" +
          button +
          "] " +
          (pressed ? "pressed" : "released") +
          ": " +
          value,
        event.detail
      );
      const note = gamepadMap[button];
      if (note) {
        if (pressed) {
          $("#sound-" + note)
            .clone()[0]
            .play();
          gamepadDepressed[button] = true;
          animate(note);
        } else {
          gamepadDepressed[button] = false;
          animate(note, false);
        }
      }
    });

    listener.start();
  };
  gamepadHandle();
})();
