const cloneChat = {
  view: () => {
    return (
      <div className="column-a">
        <label htmlFor="text" style={bigegi84theme.style}>
          Ngobrol
        </label>
        <mobxReact.Observer>
          {() => (
            <textarea
              id="text"
              type="text"
              className={bigegi84theme.class.inputText}
              value={cloneStore.input.text}
              onChange={(e) => (cloneStore.input.text = e.target.value)}
            />
          )}
        </mobxReact.Observer>
        <button
          className={bigegi84theme.class.button}
          id="send"
          onClick={() => cloneAction.send()}
        >
          Kirim
        </button>
        {/* <button
          className={bigegi84theme.class.button}
          onClick={() => {
            const brain = cloneStore.brain[cloneStore.brain.selected];
            const dataStr =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(brain));
            const dlAnchorElem = document.getElementById("downloadA");
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "brain.json");
            dlAnchorElem.click();
          }}
        >
          Simpan Pengetahuan
        </button> */}
        <button
          className={bigegi84theme.class.button}
          onClick={() => {
            const brain = cloneStore.brain[cloneStore.brain.selected];
            const yaml = jsyaml.dump(mobx.toJS(brain));
            const dataStr =
              "data:text/yaml;charset=utf-8," +
              encodeURIComponent(yaml);
            const dlAnchorElem = document.getElementById("downloadA");
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "bigegi84.bigegi84-Clone.yaml");
            dlAnchorElem.click();
          }}
        >
          Simpan yaml
        </button>
        <a id="downloadA" style={{ display: "none" }}></a>
        {/* <strong>Jumlah kata yang dipelajari: </strong>
        <p id="word-count">tes</p> */}
      </div>
    );
  },
};
