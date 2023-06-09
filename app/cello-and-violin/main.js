(() => {
  const theme = {
    pianoWhite: {
      backgroundColor: "#606C5D",
      textColor: "white",
    },
    pianoBlack: { backgroundColor: "#213555", textColor: "white" },
  };
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
            backgroundColor:
              note.search("b") == -1
                ? theme.pianoWhite.backgroundColor
                : theme.pianoBlack.backgroundColor,
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
          " " +
          key +
          "</p></div>";
        i++;
        if (i == 4) {
          html += "</div>";
          i = 1;
        }
      }
      html += "</div>";
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
      if (e.key == " ") e.preventDefault();
      var note = cello.keymap[e.key];
      if (note) {
        cello.tone.triggerRelease([note]);
        cello.animate(note, false);
        cello.depressed[note] = false;
      }
    },
  };
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
            backgroundColor:
              note.search("b") == -1
                ? theme.pianoWhite.backgroundColor
                : theme.pianoBlack.backgroundColor,
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
          " " +
          key +
          "</p></div>";
        i++;
        if (i == 7) {
          html += "</div>";
          i = 1;
        }
      }
      html += "</div>";
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
      if (e.key == " ") e.preventDefault();
      var note = violin.keymap[e.key];
      if (note) {
        violin.tone.triggerRelease([note]);
        violin.animate(note, false);
        violin.depressed[note] = false;
      }
    },
  };
  const keymapHandle = () => {
    $(document).keydown((e) => {
      cello.keydown(e);
      violin.keydown(e);
    });
    $(document).keyup((e) => {
      cello.keyup(e);
      violin.keyup(e);
    });
  };
  const sustainInput = () => {
    $("#sustain-ms").change((e) => {
      if (e.target.value) sustainMs = parseInt(e.target.value);
    });
  };

  let playTimeout = [];
  const playStop = () => {
    playTimeout.forEach((it) => clearTimeout(it));
    $(".note,.violin-note").mouseup();
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
          if (id == "#sheet-text-left") return "#note-" + it;
          if (id == "#sheet-text-right") return "#violin-note-" + it;
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
  const main = () => {
    cello.draw();
    cello.sound();
    cello.keymapDraw();
    violin.draw();
    violin.sound();
    violin.keymapDraw();
    keymapHandle();
    sustainInput();
    sheet();
  };
  main();
  $("#download").click(() => {
    const textLeft = $("#sheet-text-left").val();
    const textRight = $("#sheet-text-right").val();
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify([textLeft, textRight]));
    const dlAnchorElem = document.getElementById("downloadA");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "music.json");
    dlAnchorElem.click();
  });
})();
