const searchChord = (chRaw) => {
  const ch = chRaw.replace("#", "").replace("/", "Over");
  const chLine = ch.charAt(1) == "b" ? ch.substring(0, 2) : ch.charAt(0);
  return "piano-chord-" + chLine + "-" + ch;
};
let playTimeout = [];
const pianoSheet = {
  store: pianoStore.sheet,
  action: {
    change: (e) => {
      const selected = e.target.value;
      pianoStore.sheet.selected = selected;
    },
    option: () => {
      let i = 0;
      const list = [];
      for (const key in pianoStore.sheet.data) {
        list.push(
          <option key={i} value={key}>
            {key}
          </option>
        );
        i++;
      }
      return list;
    },
    play: () => {
      const { bpm, left, right } =
        pianoStore.sheet.data[pianoStore.sheet.selected];
      const bps = bpm / 60;
      const ms = 1000 / bps;
      const lText = left.map(([, text]) => text).join(" ");
      const rText = right.map(([, text]) => text).join(" ");
      pianoSheet.action.playText(lText, ms);
      pianoSheet.action.playText(rText, ms);
    },
    playText: (text, ms = 1000) => {
      let sec = 0;
      text.split(" ").forEach((it) => {
        const note = it.split("-")[0];
        const duration = parseFloat(it.split("-")[1]);
        const code = note
          .split(",")
          .map((n) => {
            if (n.search("#") == -1) return n;
            if (n.search("#") != -1) return searchChord(n);
          })
          .join(",");
        const timeoutA = setTimeout(() => {
          if (it.search("#") == -1) pianoNote.action.mouseDown(code);
          if (it.search("#") != -1) pianoChord.action.mouseDown(code);
        }, sec * ms);
        const timeoutB = setTimeout(() => {
          if (it.search("#") == -1) pianoNote.action.mouseUp(code);
          if (it.search("#") != -1) pianoChord.action.mouseUp(code);
        }, (sec + duration) * ms);
        sec += duration;
        playTimeout.push(timeoutA);
        playTimeout.push(timeoutB);
      });
    },
    sheetList: () => {
      const selected = pianoStore.sheet.selected;
      const currentSong = pianoStore.sheet.data[selected];
      const { left, right } = pianoStore.sheet.data[selected];
      return (
        <bigegi84View.letsRock
          observer={() => (
            <bigegi84View.letsRock
              row={{
                column: {
                  textStrong: "Kiri",
                  viewA: left.map(([], i) => (
                    <bigegi84View.letsRock
                      key={i}
                      card={{
                        column: {
                          inputTextBagian: [
                            pianoStore.sheet.data[pianoStore.sheet.selected]
                              .left[i][0],
                            (e) => {
                              pianoStore.sheet.data[
                                pianoStore.sheet.selected
                              ].left[i][0] = e;
                              console.log(e);
                            },
                            () => (pianoStore.keymapActive = false),
                          ],
                          inputTextareaNotasi: [
                            pianoStore.sheet.data[pianoStore.sheet.selected]
                              .left[i][1],
                            (e) =>
                              (pianoStore.sheet.data[
                                pianoStore.sheet.selected
                              ].left[i][1] = e),
                            () => (pianoStore.keymapActive = false),
                          ],
                          row: {
                            circleTwo: [
                              ["fas fa-ban", "fas fa-music"],
                              (e) =>
                                (pianoStore.sheet.data[
                                  pianoStore.sheet.selected
                                ].left[i][2] = e),
                            ],
                            circleTwoB: [
                              ["fas fa-stop", "fas fa-play"],
                              (e) => {
                                if (!pianoStore.sheet.playing) {
                                  pianoStore.sheet.playing = true;
                                  pianoSheet.action.playText(
                                    pianoStore.sheet.data[
                                      pianoStore.sheet.selected
                                    ].left[i][1]
                                  );
                                } else {
                                  pianoStore.sheet.playing = false;
                                  pianoSheet.action.stop();
                                }
                              },
                            ],
                            circleTwoC: [
                              ["fas fa-plus", "fas fa-plus"],
                              () =>
                                pianoStore.sheet.data[
                                  pianoStore.sheet.selected
                                ].left.push(["", ""]),
                            ],
                          },
                        },
                      }}
                    />
                  )),
                },
                columnB: {
                  textStrong: "Kanan",
                  viewA: right.map(([], i) => (
                    <bigegi84View.letsRock
                      key={i}
                      card={{
                        column: {
                          inputTextBagian: [
                            pianoStore.sheet.data[pianoStore.sheet.selected]
                              .right[i][0],
                            (e) => {
                              pianoStore.sheet.data[
                                pianoStore.sheet.selected
                              ].right[i][0] = e;
                              console.log(e);
                            },
                            () => (pianoStore.keymapActive = false),
                          ],
                          inputTextareaNotasi: [
                            pianoStore.sheet.data[pianoStore.sheet.selected]
                              .right[i][1],
                            (e) =>
                              (pianoStore.sheet.data[
                                pianoStore.sheet.selected
                              ].right[i][1] = e),
                            () => (pianoStore.keymapActive = false),
                          ],
                          row: {
                            circleTwo: [
                              ["fas fa-ban", "fas fa-music"],
                              (e) =>
                                (pianoStore.sheet.data[
                                  pianoStore.sheet.selected
                                ].right[i][2] = e),
                            ],
                            circleTwoB: [
                              ["fas fa-stop", "fas fa-play"],
                              (e) => {
                                if (!pianoStore.sheet.playing) {
                                  pianoStore.sheet.playing = true;
                                  pianoSheet.action.playText(
                                    pianoStore.sheet.data[
                                      pianoStore.sheet.selected
                                    ].right[i][1]
                                  );
                                } else {
                                  pianoStore.sheet.playing = false;
                                  pianoSheet.action.stop();
                                }
                              },
                            ],
                            circleTwoC: [
                              ["fas fa-plus", "fas fa-plus"],
                              () =>
                                pianoStore.sheet.data[
                                  pianoStore.sheet.selected
                                ].right.push(["", ""]),
                            ],
                          },
                        },
                      }}
                    />
                  )),
                },
              }}
            />
          )}
        />
      );
      return pianoStore.sheet.data[selected].map(([name, value], ia) => {
        return (
          <div key={ia} className="column-a">
            <strong>{name}</strong>
            {value.map(([part, pValue], ib) => {
              return (
                <div key={ib} className="field column-a">
                  <input
                    type="text"
                    value={currentSong[ia][1][ib][0]}
                    onChange={(e) =>
                      (currentSong[ia][1][ib][0] = e.target.value)
                    }
                    onFocus={() => (pianoStore.keymapActive = false)}
                    className={bigegi84theme.class.inputText}
                  />
                  <textarea
                    rows="2"
                    cols="50"
                    value={currentSong[ia][1][ib][1]}
                    onChange={(e) =>
                      (currentSong[ia][1][ib][1] = e.target.value)
                    }
                    onFocus={() => (pianoStore.keymapActive = false)}
                    className={bigegi84theme.class.inputText}
                  />
                  <div className="row-a">
                    <i
                      className={
                        "fas" +
                        (!currentSong[ia][1][ib][2] ? " fa-ban" : " fa-music")
                      }
                      onClick={() => {
                        const enable = currentSong[ia][1][ib][2];
                        if (enable) {
                          currentSong[ia][1][ib][2] = false;
                        } else {
                          currentSong[ia][1][ib][2] = true;
                        }
                      }}
                    />
                    <i
                      className={
                        "fas" +
                        (pianoStore.sheet.playing ? " fa-stop" : " fa-play")
                      }
                      onClick={() => {
                        if (!pianoStore.sheet.playing) {
                          pianoStore.sheet.playing = true;
                          pianoSheet.action.playText(currentSong[ia][1][ib][1]);
                        } else {
                          pianoStore.sheet.playing = false;
                          pianoSheet.action.stop();
                        }
                      }}
                    />
                    <i
                      className="fas fa-plus"
                      onClick={() => {
                        currentSong[ia][1].push(["", ""]);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
    },
    stop: () => {
      playTimeout.forEach((it) => clearTimeout(it));
      pianoNote.action.soundClear();
      pianoNote.action.animateClear();
      pianoChord.action.animateClear();
      pianoStore.info.pressed = [];
      playTimeout = [];
    },
  },
  view: () => {
    return (
      <bigegi84View.letsRock
        column={{
          sectionLembar: {
            content: {
              card: {
                column: {
                  card: {
                    column: {
                      textStrong: "Menu",
                      view: (
                        <div className="row-a">
                          <a id="downloadA" style={{ display: "none" }}></a>
                          <button
                            className={
                              "button small " + bigegi84theme.class.button
                            }
                            onClick={() => {
                              const selected = pianoStore.sheet.selected;
                              const dataStr =
                                "data:text/json;charset=utf-8," +
                                encodeURIComponent(
                                  JSON.stringify(
                                    pianoStore.sheet.data[selected]
                                  )
                                );
                              const dlAnchorElem =
                                document.getElementById("downloadA");
                              dlAnchorElem.setAttribute("href", dataStr);
                              dlAnchorElem.setAttribute(
                                "download",
                                selected + ".json"
                              );
                              dlAnchorElem.click();
                            }}
                          >
                            Export
                          </button>
                          <mobxReact.Observer>
                            {() => (
                              <button
                                className={
                                  "button small " + bigegi84theme.class.button
                                }
                                onClick={() => {
                                  if (!pianoStore.sheet.playing) {
                                    pianoStore.sheet.playing = true;
                                    pianoStore.sheet.playText = "Berhenti";
                                    pianoSheet.action.play();
                                  } else {
                                    pianoStore.sheet.playing = false;
                                    pianoStore.sheet.playText = "Mainkan";
                                    pianoSheet.action.stop();
                                  }
                                }}
                                id="play"
                              >
                                {pianoStore.sheet.playText}
                              </button>
                            )}
                          </mobxReact.Observer>
                        </div>
                      ),
                    },
                  },
                  textStrong: "Lagu",
                  observerSong: () => (
                    <select
                      onChange={(e) => pianoSheet.action.change(e)}
                      name="sheet-select"
                      id="sheet-select"
                      className={bigegi84theme.class.inputText}
                    >
                      {pianoSheet.action.option()}
                    </select>
                  ),
                  observer: () => (
                    <bigegi84View.letsRock
                      inputTextBPM={[
                        pianoStore.sheet.selected != null
                          ? pianoStore.sheet.data[pianoStore.sheet.selected].bpm
                          : 0,
                        (e) => {
                          pianoStore.sheet.data[pianoStore.sheet.selected].bpm =
                            isNaN(parseInt(e)) ? "" : parseInt(e);
                        },
                        () => (pianoStore.keymapActive = false),
                      ]}
                    />
                  ),
                  textStrongNada: "Nada",
                  row: {
                    observer: () => <pianoSheet.action.sheetList />,
                  },
                },
              },
            },
          },
        }}
      />
    );
  },
};
