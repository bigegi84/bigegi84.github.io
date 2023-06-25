const pennyConfig = {
  action: {
    save: () => {
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
              onClick={() => pennyConfig.action.save()}
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
                      if (key != "form") pennyStore[key] = json[key];
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
                const newDb = { stuff: [], stuffPrice: [] };
                pennyStore.stuff.forEach(
                  ({
                    id,
                    name,
                    shopId,
                    priceHistory,
                    createdAt,
                    updatedAt,
                  }) => {
                    const unit = [];
                    bigegi84Orm.obj.createOne(unit, {
                      name: priceHistory[0].unit,
                      ratio: 1,
                      createdAt,
                      updatedAt,
                    });
                    newDb.stuff.push({
                      id,
                      name: `${name} (1 ${priceHistory[0].unit})`,
                      createdAt,
                      updatedAt,
                    });
                    bigegi84Orm.obj.createOne(newDb.stuffPrice, {
                      stuffId: id,
                      shopId,
                      amount: priceHistory[0].amount,
                      price: priceHistory[0].price,
                      createdAt,
                      updatedAt,
                    });
                  }
                );
                const dataStr =
                  "data:text/json;charset=utf-8," +
                  encodeURIComponent(JSON.stringify(newDb));
                const dlAnchorElem = document.getElementById("downloadA");
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute(
                  "download",
                  `${pennyStore.info.name}.bigegi84-Penny.json`
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
