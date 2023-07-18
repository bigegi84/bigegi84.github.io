const pennyConfig = {
  action: {
    debug: () => {
      $.ajax({
        url: "https://bigegi84.000webhostapp.com/app-state/bigegi84.bigegi84-Clone.yaml",
        method: "GET",
        xhrFields: {
          responseType: "blob",
        },
        success: async (data) => {
          const text = await data.text();
          console.log(text);
        },
      });
    },
    load: {
      yaml: (e) => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (it) => {
            const text = it.target.result;
            const json = jsyaml.load(text);
            for (const key in json)
              if (key != "form") pennyStore[key] = json[key];
          };
          reader.readAsText(e.target.files[0]);
        }
      },
    },
    save: {
      json: () => {
        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(pennyStore));
        const dlAnchorElem = document.getElementById("downloadA");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute(
          "download",
          `bigegi84-Penny-${pennyStore.info.name}-${Date.now()}.json`
        );
        dlAnchorElem.click();
      },
      yaml: () => {
        const yaml = jsyaml.dump(mobx.toJS(pennyStore));
        const dataStr =
          "data:text/yaml;charset=utf-8," + encodeURIComponent(yaml);
        const a = document.createElement("a");
        a.setAttribute("href", dataStr);
        a.setAttribute(
          "download",
          `${pennyStore.info.name}.bigegi84-Penny.yaml`
        );
        a.click();
        a.remove();
      },
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
          <bigegi84View.letsRock
            row={{
              buttonSmallSimpan: () => pennyConfig.action.save.yaml(),
              viewFile: (
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={inputFile}
                  onChange={(e) => pennyConfig.action.load.yaml(e)}
                />
              ),
              buttonSmallMuat: () => inputFile.current.click(),
              buttonSmallKopi: () => {
                const yaml = jsyaml.dump(mobx.toJS(pennyStore));
                navigator.clipboard.writeText(yaml);
                alert("Copied the text.");
              },
              buttonSmallDebug: () => pennyConfig.action.debug(),
            }}
          />
        ) : null}
      </div>
    );
  },
};
