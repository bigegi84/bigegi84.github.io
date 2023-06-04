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

    i: note.snare[0],
    o: note.snare[0],
    p: note.snare[0],

    h: note.tomtomMedium[0],
    j: note.tomtomMedium[0],

    k: note.bass[0],
    l: note.bass[0],
    ";": note.bass[0],

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
})();
