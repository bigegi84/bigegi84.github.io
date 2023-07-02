const einsteinConfig = {
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
      <div className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            Pengaturan
          </strong>
          <div
            style={bigegi84theme.styleCircle}
            className="circle-a"
            onClick={() => setShow(!show)}
          >
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? (
          <div className="row-a">
            <a id="downloadA" style={{ display: "none" }} />
            <button
              className={bigegi84theme.class.button}
              onClick={() => chordConfig.action.save()}
            >
              Save
            </button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={inputFile}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (it) => {
                    const text = it.target.result;
                    const json = JSON.parse(text);
                    for (const key in json)
                      if (key != "form") chordStore[key] = json[key];
                  };
                  reader.readAsText(e.target.files[0]);
                }
              }}
            />
            <button
              className={bigegi84theme.class.button}
              onClick={() => inputFile.current.click()}
            >
              Load
            </button>
            <button
              className={bigegi84theme.class.button}
              onClick={() => {
                const yaml = jsyaml.dump(mobx.toJS(einsteinStore));
                const dataStr =
                  "data:text/yaml;charset=utf-8," + encodeURIComponent(yaml);
                const dlAnchorElem = document.getElementById("downloadA");
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute(
                  "download",
                  `bigegi84-Einstein.yaml`
                );
                dlAnchorElem.click();
              }}
            >
              save yaml
            </button>
            <div>
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
                        if (key != "form") chordStore[key] = json[key];
                    };
                    reader.readAsText(e.target.files[0]);
                  }
                }}
              />
              <button
                className={bigegi84theme.class.button}
                onClick={() => inputFile.current.click()}
              >
                Load yaml
              </button>
            </div>
            <button
              className={bigegi84theme.class.button}
              onClick={() => {
                const yaml = jsyaml.dump(mobx.toJS(chordStore));
                const dataStr =
                  "data:text/yaml;charset=utf-8," + encodeURIComponent(yaml);
                const dlAnchorElem = document.getElementById("downloadA");
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute(
                  "download",
                  `${chordStore.info.name}.bigegi84-Penny.yaml`
                );
                dlAnchorElem.click();
              }}
            >
              Debug
            </button>
          </div>
        ) : null}
      </div>
    );
  },
};
