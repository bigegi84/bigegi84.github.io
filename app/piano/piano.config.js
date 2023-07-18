const pianoConfig = {
  action: {
    render: {
      keymapSelect: () => (
        <bigegi84View.letsRock
          observer={() => (
            <bigegi84View.letsRock
              column={{
                inputSelectKeyboard: [
                  [pianoStore.keymap, (value) => (pianoStore.keymap = value)],
                  [
                    ["Amerika Serikat", "us"],
                    ["Jepang", "jp"],
                  ],
                ],
              }}
            />
          )}
        />
      ),
    },
  },
  view: () => {
    const inputFile = React.useRef();
    return (
      <bigegi84View.letsRock
        column={{
          sectionPengaturan: {
            content: {
              card: {
                column: {
                  card: {
                    rowA: {
                      buttonSmallSimpan: () => {
                        let json = mobx.toJS(pianoStore);
                        const yaml = jsyaml.dump(json);
                        const dataStr =
                          "data:text/yaml;charset=utf-8," +
                          encodeURIComponent(yaml);
                        const a = document.createElement("a");
                        a.setAttribute("href", dataStr);
                        a.setAttribute("download", "bigegi84-Piano.yaml");
                        a.click();
                        a.remove();
                      },
                      viewFile: (
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={inputFile}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const reader = new FileReader();
                              reader.onload = (it) => {
                                const text = it.target.result;
                                const json = jsyaml.load(text);
                                for (const key in json)
                                  pianoStore[key] = json[key];
                              };
                              reader.readAsText(e.target.files[0]);
                            }
                          }}
                        />
                      ),
                      buttonSmallMuat: () => inputFile.current.click(),
                      buttonSmallKopi: () => {
                        const yaml = jsyaml.dump(mobx.toJS(pianoStore));
                        navigator.clipboard.writeText(yaml);
                        alert("Copied the text.");
                      },
                      buttonSmallDebug: () => {
                        let json = mobx.toJS(pianoStore);
                        for (const key in json.sheet.data) {
                          const [left, right] = json.sheet.data[key];
                          const [, lText] = left;
                          const [, rText] = right;
                          json.sheet.data[key] = {
                            BPM: 60,
                            Left: lText,
                            Right: rText,
                          };
                        }
                        const yaml = jsyaml.dump(json);
                        const dataStr =
                          "data:text/yaml;charset=utf-8," +
                          encodeURIComponent(yaml);
                        const a = document.createElement("a");
                        a.setAttribute("href", dataStr);
                        a.setAttribute("download", "bigegi84-Piano.yaml");
                        a.click();
                        a.remove();
                      },
                    },
                  },
                  rowB: {
                    column: {
                      viewA: <pianoSustain.view />,
                      viewB: <pianoConfig.action.render.keymapSelect />,
                    },
                    columnA: {
                      textStrong: "Tipe Bermain: ",
                    },
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
