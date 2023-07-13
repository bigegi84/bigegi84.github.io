const bahasaConfig = {
  action: {
    save: () => {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(chordStore));
      const dlAnchorElem = document.getElementById("downloadA");
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute(
        "download",
        `bigegi84-Penny-${chordStore.info.name}-${Date.now()}.json`
      );
      dlAnchorElem.click();
    },
  },
  view: () => {
    const [show, setShow] = React.useState(false);
    const inputFile = React.useRef();
    return (
      <bigegi84View.letsRock
        sectionPengaturan={{
          content: (
            <bigegi84View.letsRock
              column={{
                row: {
                  buttonSmallSimpan: () => {
                    const yaml = jsyaml.dump(mobx.toJS(bahasaStore));
                    const dataStr =
                      "data:text/yaml;charset=utf-8," +
                      encodeURIComponent(yaml);
                    const a = document.createElement("a");
                    a.setAttribute("href", dataStr);
                    a.setAttribute("download", `bigegi84-Bahasa.yaml`);
                    a.click();
                    a.remove();
                  },
                  buttonSmallMemuat: () => {},
                  buttonSmallDebug: () => {},
                },
              }}
            />
          ),
        }}
      />
    );
  },
};
