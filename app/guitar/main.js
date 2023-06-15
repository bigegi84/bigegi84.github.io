(() => {
  const debug = !true;
  let lastChord = null;
  const ukulele = {
    bounce: {
      bouncing: false,
      handle: (jqCode) => {
        if (ukulele.bounce.bouncing) {
          let ms = 0;
          jqCode.reverse().forEach((it) => {
            setTimeout(() => {
              $(it).mousedown();
            }, ms);
            ms = ms + ukulele.chord.delay.value.delayMs;
          });
          ms = 0;
          jqCode.reverse().forEach((it) => {
            setTimeout(() => {
              $(it).mouseup();
            }, ms);
            ms = ms + ukulele.chord.delay.value.delayMs;
          });
        }
      },
      handleChange: () => {
        $("#bouncing").change((e) => {
          ukulele.bounce.bouncing = e.target.checked;
        });
      },
    },
    sustain: {
      sustaining: true,
      ms: 1500,
      handleChange: () => {
        $("#sustaining").change((e) => {
          ukulele.sustain.sustaining = e.target.checked;
        });
      },
    },
    theme: {
      fret: {
        backgroundColor: "#83764f",
      },
      chord: {
        backgroundColor: "#a0d8b3",
      },
      chordMol: {
        backgroundColor: "#008080",
      },
    },
    tone: new Tone.Sampler({
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
      baseUrl: "../../asset/sound/ukulele/",
    }).toDestination(),
    fret: {
      value: {
        1: {
          0: "A4",
          1: "Bb4",
          2: "B4",
          3: "C5",
          4: "Db5",
          5: "D5",
          6: "Eb5",
          7: "E5",
          8: "F5",
          9: "Gb5",
          10: "G5",
          11: "Ab5",
          12: "A5",
        },
        2: {
          0: "E4",
          1: "F4",
          2: "Gb4",
          3: "G4",
          4: "Ab4",
          5: "A4",
          6: "Bb4",
          7: "B4",
          8: "C5",
          9: "Db5",
          10: "D5",
          11: "Eb5",
          12: "E5",
        },
        3: {
          0: "C4",
          1: "Db4",
          2: "D4",
          3: "Eb4",
          4: "E4",
          5: "F4",
          6: "Gb4",
          7: "G4",
          8: "Ab5",
          9: "A4",
          10: "Bb4",
          11: "B4",
          12: "C5",
        },
        4: {
          0: "G4",
          1: "Ab4",
          2: "A4",
          3: "Bb4",
          4: "B4",
          5: "C5",
          6: "Db5",
          7: "D5",
          8: "Eb5",
          9: "E5",
          10: "F5",
          11: "Gb5",
          12: "G5",
        },
      },
      animate: (id, press = true) => {
        if (press)
          $("#" + id).animate(
            {
              backgroundColor: "#88FFAA",
            },
            0
          );
        if (!press) {
          $("#" + id).animate({
            backgroundColor: ukulele.theme.fret.backgroundColor,
          });
        }
      },
      handleMouse: () => {
        $(".fret").mousedown((e) => {
          const id = e.target.id;
          const note =
            ukulele.fret.value[id.replace("fret-", "").split("-")[0]][
              id.replace("fret-", "").split("-")[1]
            ];
          ukulele.tone.triggerAttack([note]);
          ukulele.fret.animate(id, true);
        });
        $(".fret").mouseup((e) => {
          const id = e.target.id;
          const note =
            ukulele.fret.value[id.replace("fret-", "").split("-")[0]][
              id.replace("fret-", "").split("-")[1]
            ];
          if (ukulele.sustain.sustaining)
            ukulele.tone.triggerRelease(
              [note],
              Tone.now() + ukulele.sustain.ms / 1000
            );
          if (!ukulele.sustain.sustaining) ukulele.tone.triggerRelease([note]);
          ukulele.fret.animate(id, false);
        });
      },
      render: () => {
        let html = "";
        for (var x in ukulele.fret.value) {
          var fretHtml = '<div id="fret-' + x + '" class="fret-line">';
          for (var y in ukulele.fret.value[x]) {
            fretHtml +=
              '<div id="fret-' +
              x +
              "-" +
              y +
              '" class="fret">' +
              ukulele.fret.value[x][y] +
              "</div>";
          }
          fretHtml += "</div>";
          html += fretHtml;
        }
        $("#ukulele").html(html);
        ukulele.fret.handleMouse();
      },
    },
    chord: {
      value: {
        C: {
          C: "0003",
          Cm: "0333",
          Cmaj7: "0002",
          Cm7: "3333",
          C6: "0000",
          C7: "0001",
          C9: "0201",
        },
        Db: {
          Db: "1114",
          Dbm: "1101",
          Dbmaj7: "1113",
          Dbm7: "4444",
          Db6: "1111",
          Db7: "1112",
          Db9: "1312",
        },
        D: {
          D: "2225",
          Dm: "2210",
          Dmaj7: "1113",
          Dm7: "2213",
          D6: "2222",
          D7: "2223",
          D9: "2423",
        },
        Eb: {
          Eb: "3331",
          Ebm: "3321",
          Ebmaj7: "3335",
          Ebm7: "3324",
          Eb6: "3333",
          Eb7: "3334",
          Eb9: "0111",
        },
        E: {
          E: "4442",
          Em: "0432",
          Emaj7: "1302",
          Em7: "0202",
          E6: "1020",
          E7: "1202",
          E9: "1222",
        },
        F: {
          F: "2010",
          Fm: "1013",
          Fmaj7: "2413",
          Fm7: "1313",
          F6: "2213",
          F7: "2310",
          F9: "2333",
        },
        Gb: {
          Gb: "3121",
          Gbm: "2120",
          Gbmaj7: "0111",
          Gbm7: "2424",
          Gb6: "3324",
          Gb7: "3424",
          Gb9: "1101",
        },
        G: {
          G: "0232",
          Gm: "0231",
          Gmaj7: "0222",
          Gm7: "0211",
          G6: "0202",
          G7: "0212",
          G9: "2212",
        },
        Ab: {
          Ab: "5343",
          Abm: "1342",
          Abmaj7: "1333",
          Abm7: "0322",
          Ab6: "1313",
          Ab7: "1323",
          Ab9: "3323",
          Abm9: "3342",
        },
        A: {
          A: "2100",
          Am: "2000",
          Amaj7: "1100",
          Am7: "0433",
          A6: "2424",
          A7: "0100",
          A9: "0102",
        },
        Bb: {
          Bb: "3211",
          Bbm: "3111",
          Bbmaj7: "3210",
          Bbm7: "1111",
          Bb6: "0211",
          Bb7: "1211",
          Bb9: "1213",
        },
        B: {
          B: "4322",
          Bm: "4222",
          Bmaj7: "3322",
          Bm7: "2222",
          B6: "1322",
          B7: "2322",
          B9: "2324",
        },
      },
      delay: {
        value: { delayMs: 10 },
        handleChange: () => {
          $("#input-delay").change((e) => {
            if (e.target.value)
              ukulele.chord.delay.value.delayMs = parseInt(e.target.value);
          });
        },
      },
      animate: (id, press = true) => {
        if (press)
          $("#" + id).animate(
            {
              backgroundColor: "#88FFAA",
            },
            0
          );
        if (!press) {
          const info = id.replace("chord-", "").split("-")[0];
          $("#" + id).animate({
            backgroundColor:
              info.search("b") == -1
                ? ukulele.theme.chord.backgroundColor
                : ukulele.theme.chordMol.backgroundColor,
          });
        }
      },
      getFormula: (id) => {
        return ukulele.chord.value[id.replace("chord-", "").split("-")[0]][
          id.replace("chord-", "").split("-")[1]
        ];
      },
      handleMouse: () => {
        $(".chord").mousedown((e) => {
          const id = e.target.id;
          const formula = ukulele.chord.getFormula(id);
          const jqCode = [];
          for (var i = 0; i < formula.length; i++) {
            jqCode.push("#fret-" + (4 - i) + "-" + formula.charAt(i));
          }
          let ms = 0;
          jqCode.forEach((it) => {
            setTimeout(() => {
              $(it).mousedown();
            }, ms);
            ms = ms + ukulele.chord.delay.value.delayMs;
          });
          ukulele.chord.animate(id, true);
          lastChord = jqCode;
        });
        $(".chord").mouseup((e) => {
          const id = e.target.id;
          const formula = ukulele.chord.getFormula(id);
          const jqCode = [];
          for (var i = 0; i < formula.length; i++) {
            jqCode.push("#fret-" + (4 - i) + "-" + formula.charAt(i));
          }
          let ms = 0;
          jqCode.forEach((it) => {
            setTimeout(() => {
              $(it).mouseup();
            }, ms);
            ms = ms + ukulele.chord.delay.value.delayMs;
          });
          ukulele.chord.animate(id, false);
          lastChord = jqCode;
        });
      },
      render: () => {
        let html = "";
        for (var x in ukulele.chord.value) {
          var chordHtml = '<div id="chord-line-' + x + '" class="chord-line">';
          for (var y in ukulele.chord.value[x]) {
            chordHtml +=
              '<button id="chord-' +
              x +
              "-" +
              y +
              '" class="chord' +
              (x.search("b") != -1 ? " chord-mol" : "") +
              '">' +
              y +
              "</button>";
          }
          chordHtml += "</div>";
          html += chordHtml;
        }
        $("#chord").html(html);
        ukulele.chord.handleMouse();
      },
    },
    keymap: {
      depressed: {},
      value: {
        chord: {
          " ": "reverse",

          1: ["C", "C"],
          q: ["C", "Cm"],
          a: ["C", "Cmaj7"],
          z: ["C", "Cm7"],

          "!": ["C", "C6"],
          Q: ["C", "C7"],
          A: ["C", "C9"],
          // Z: ["C", "Cm7"],

          2: ["Db", "Db"],
          w: ["Db", "Dbm"],
          s: ["Db", "Dbmaj7"],
          x: ["Db", "Dbm7"],

          "@": ["Db", "Db6"],
          W: ["Db", "Db7"],
          S: ["Db", "Db9"],
          // X: ["Db", "Dbm7"],

          3: ["D", "D"],
          e: ["D", "Dm"],
          d: ["D", "Dmaj7"],
          c: ["D", "Dm7"],

          "#": ["D", "D6"],
          E: ["D", "D7"],
          D: ["D", "D9"],
          // C: ["D", "Dm7"],

          4: ["Eb", "Eb"],
          r: ["Eb", "Ebm"],
          f: ["Eb", "Ebmaj7"],
          v: ["Eb", "Ebm7"],

          $: ["Eb", "Eb6"],
          R: ["Eb", "Eb7"],
          F: ["Eb", "Eb9"],
          // V: ["Eb", "Ebm7"],

          5: ["E", "E"],
          t: ["E", "Em"],
          g: ["E", "Emaj7"],
          b: ["E", "Em7"],

          "%": ["E", "E6"],
          T: ["E", "E7"],
          G: ["E", "E9"],
          // B: ["E", "Em7"],

          6: ["F", "F"],
          y: ["F", "Fm"],
          h: ["F", "Fmaj7"],
          n: ["F", "Fm7"],

          "^": ["F", "F6"],
          Y: ["F", "F7"],
          H: ["F", "F9"],
          // N: ["F", "Fm7"],

          7: ["Gb", "Gb"],
          u: ["Gb", "Gbm"],
          j: ["Gb", "Gbmaj7"],
          m: ["Gb", "Gbm7"],

          "&": ["Gb", "Gb6"],
          U: ["Gb", "Gb7"],
          J: ["Gb", "Gb9"],
          // M: ["Gb", "Gbm7"],

          8: ["G", "G"],
          i: ["G", "Gm"],
          k: ["G", "Gmaj7"],
          ",": ["G", "Gm7"],

          "*": ["G", "G6"],
          I: ["G", "G7"],
          K: ["G", "G9"],
          // "<": ["G", "Gm7"],

          9: ["Ab", "Ab"],
          o: ["Ab", "Abm"],
          l: ["Ab", "Abmaj7"],
          ".": ["Ab", "Abm7"],

          "(": ["Ab", "Ab6"],
          O: ["Ab", "Ab7"],
          L: ["Ab", "Ab9"],
          ">": ["Ab", "Abm9"],

          0: ["A", "A"],
          p: ["A", "Am"],
          ";": ["A", "Amaj7"],
          "/": ["A", "Am7"],

          ")": ["A", "A6"],
          P: ["A", "A7"],
          ":": ["A", "A9"],
          // "?": ["A", "Am7"],

          "-": ["Bb", "Bb"],
          "[": ["Bb", "Bbm"],
          "'": ["Bb", "Bbmaj7"],
          ArrowLeft: ["Bb", "Bbm7"],

          _: ["Bb", "Bb6"],
          "{": ["Bb", "Bb7"],
          '"': ["Bb", "Bb8"],
          // ArrowLeft: ["Bb", "Bbm7"],

          "=": ["B", "B"],
          "]": ["B", "Bm"],
          "\\": ["B", "Bmaj7"],
          ArrowUp: ["B", "Bm7"],

          "+": ["B", "B6"],
          "}": ["B", "B7"],
          "|": ["B", "B9"],
          // ArrowUp: ["B", "Bm7"],
        },
        solo: {
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
          "\\": [3, 11],

          z: [4, 0],
          x: [4, 1],
          c: [4, 2],
          v: [4, 3],
          b: [4, 4],
          n: [4, 5],
          m: [4, 6],
          ",": [4, 7],
          ".": [4, 8],
          "/": [4, 9],
        },
      },
      renderHint: () => {
        for (const key in ukulele.keymap.value[ukulele.mode.value]) {
          if (ukulele.mode.value == "chord") {
            const str = ukulele.keymap.value[ukulele.mode.value][key];
            $("#chord-" + str[0] + "-" + str[1]).html(
              str[1] + " <br>" + key.replace("Arrow", "") + ""
            );
          }
          if (ukulele.mode.value == "solo") {
            const fretMap = ukulele.keymap.value[ukulele.mode.value][key];
            $("#fret-" + fretMap[0] + "-" + fretMap[1]).html(
              ukulele.fret.value[fretMap[0]][fretMap[1]] + " " + key + ""
            );
          }
        }
      },
      handle: () => {
        $(document).keydown((e) => {
          e.preventDefault();
          if (ukulele.keymap.depressed[e.key]) return;
          ukulele.keymap.depressed[e.key] = true;
          const str = ukulele.keymap.value[ukulele.mode.value][e.key];
          if (str) {
            if (ukulele.mode.value == "chord") {
              if (str == "reverse" && lastChord != null) {
                let ms = 0;
                lastChord.reverse().forEach((it) => {
                  setTimeout(() => {
                    $(it).mousedown();
                  }, ms);
                  ms = ms + ukulele.chord.delay.value.delayMs;
                });
              } else {
                const jqCode = [];
                const formula = ukulele.chord.value[str[0]][str[1]];
                for (var i = 0; i < formula.length; i++) {
                  jqCode.push("#fret-" + (4 - i) + "-" + formula.charAt(i));
                }
                let ms = 0;
                jqCode.forEach((it) => {
                  setTimeout(() => {
                    $(it).mousedown();
                  }, ms);
                  ms = ms + ukulele.chord.delay.value.delayMs;
                });
                lastChord = jqCode;
                ukulele.chord.animate("chord-" + str[0] + "-" + str[1], true);
                ukulele.info.play.render(formula);
              }
            }
            if (ukulele.mode.value == "solo") {
              ukulele.tone.triggerAttack([ukulele.fret.value[str[0]][str[1]]]);
              ukulele.fret.animate("fret-" + str[0] + "-" + str[1], true);
            }
          }
        });
        $(document).keyup((e) => {
          ukulele.keymap.depressed[e.key] = false;
          const str = ukulele.keymap.value[ukulele.mode.value][e.key];
          if (str) {
            if (ukulele.mode.value == "chord") {
              if (str == "reverse" && lastChord != null) {
                let ms = 0;
                lastChord.reverse().forEach((it) => {
                  setTimeout(() => {
                    $(it).mouseup();
                  }, ms);
                  ms = ms + ukulele.chord.delay.value.delayMs;
                });
                ukulele.chord.animate("chord-" + str[0] + "-" + str[1], false);
              } else {
                const jqCode = [];
                const formula = ukulele.chord.value[str[0]][str[1]];
                for (var i = 0; i < formula.length; i++) {
                  jqCode.push("#fret-" + (4 - i) + "-" + formula.charAt(i));
                }
                let ms = 0;
                jqCode.forEach((it) => {
                  setTimeout(() => {
                    $(it).mouseup();
                  }, ms);
                  ms = ms + ukulele.chord.delay.value.delayMs;
                });
                ukulele.bounce.handle(jqCode);
                ukulele.chord.animate("chord-" + str[0] + "-" + str[1], false);
              }
            }
            if (ukulele.mode.value == "solo") {
              ukulele.tone.triggerRelease([ukulele.fret.value[str[0]][str[1]]]);
              ukulele.fret.animate("fret-" + str[0] + "-" + str[1], false);
            }
          }
        });
      },
    },
    mode: {
      value: "chord",
      handleChange: () => {
        $('input[name="mode"]').change((e) => {
          ukulele.mode.value = e.target.value;
          ukulele.chord.render();
          ukulele.fret.render();
          ukulele.keymap.renderHint();
        });
      },
    },
    info: {
      play: {
        id: "#play-info",
        render: (formula) => {
          $(ukulele.info.play.id).text(formula);
        },
      },
    },
    main: () => {
      ukulele.mode.handleChange();
      ukulele.fret.render();
      ukulele.fret.handleMouse();
      ukulele.chord.render();
      ukulele.chord.handleMouse();
      ukulele.keymap.renderHint();
      ukulele.keymap.handle();
      ukulele.chord.delay.handleChange();
      ukulele.bounce.handleChange();
      ukulele.sustain.handleChange();
    },
  };
  ukulele.main();
})();
