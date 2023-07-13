const cloneConfig = {
  view: () => {
    const inputFile = React.useRef();
    const copyText = React.useRef();
    return (
      <bigegi84View.letsRock
        sectionPengaturan={{
          content: {
            row: {
              buttonSimpan: () => {
                const yaml = jsyaml.dump(mobx.toJS(cloneStore.brain.bigegi84));
                const dataStr =
                  "data:text/yaml;charset=utf-8," + encodeURIComponent(yaml);
                const a = document.createElement("a");
                a.setAttribute("href", dataStr);
                a.setAttribute("download", `bigegi84-Clone.yaml`);
                a.click();
                a.remove();
              },
              view: (
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
                        cloneStore.brain.bigegi84 = json;
                      };
                      reader.readAsText(e.target.files[0]);
                    }
                  }}
                />
              ),
              buttonMuat: () => inputFile.current.click(),
              viewText: <textarea ref={copyText} style={{ display: "none" }} />,
              buttonKopi: () => {
                const yaml = jsyaml.dump(mobx.toJS(cloneStore.brain.bigegi84));
                copyText.current.value = yaml;
                copyText.current.select();
                // copyText.setSelectionRange(0, 99999);
                navigator.clipboard.writeText(yaml);
                alert("Copied the text.");
              },
              buttonDebug: () => {
                const yaml = jsyaml.dump(mobx.toJS(cloneStore.brain.bigegi84));
                const dataStr =
                  "data:text/yaml;charset=utf-8," + encodeURIComponent(yaml);
                const a = document.createElement("a");
                a.setAttribute("href", dataStr);
                a.setAttribute("download", `bigegi84-Clone.yaml`);
                a.click();
                a.remove();
              },
            },
          },
        }}
      />
    );
  },
};
