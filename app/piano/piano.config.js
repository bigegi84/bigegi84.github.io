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
    return (
      <bigegi84View.letsRock
        column={{
          sectionPengaturan: {
            content: (
              <bigegi84View.letsRock
                column={{
                  rowA: {
                    buttonSmallSimpan: () => {
                      let json = {
                        ...mobx.toJS(pianoStore),
                        ...{ song: mobx.toJS(pianoSong) },
                      };
                      const yaml = jsyaml.dump(json);
                      const dataStr =
                        "data:text/yaml;charset=utf-8," +
                        encodeURIComponent(yaml);
                      const a = document.createElement("a");
                      a.setAttribute("href", dataStr);
                      a.setAttribute("download", "bigegi84-Piano.yaml");
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
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
                }}
              />
            ),
          },
        }}
      />
    );
  },
};
