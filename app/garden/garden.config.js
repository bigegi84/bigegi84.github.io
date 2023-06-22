const gardenConfig = {
  action: {
    save: () => {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(gardenStore));
      const dlAnchorElem = document.getElementById("downloadA");
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute(
        "download",
        `${gardenStore.info.name}.bigegi84-Garden.json`
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
              onClick={() => gardenConfig.action.save()}
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
                    delete json.form;
                    for (const key in json) gardenStore[key] = json[key];
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
                const json = {
                  ...gardenStore,
                  ...{
                    customer: gardenStore.customer.map(
                      ([id, name, createdAt]) => ({
                        id,
                        name,
                        createdAt,
                        updatedAt: createdAt,
                      })
                    ),
                    purchase: gardenStore.purchase.map(
                      ([id, name, amount, price, createdAt]) => ({
                        id,
                        name,
                        amount,
                        price,
                        createdAt,
                        updatedAt: createdAt,
                      })
                    ),
                    supply: gardenStore.supply.map(
                      ([id, name, source, scale, createdAt]) => {
                        const [, , , amount, unit] = source[0];
                        return {
                          id,
                          name,
                          amount,
                          unit,
                          source: source.map(
                            ([name, link, price, , , createdAt]) => ({
                              id: bigegi84Orm.uuid(),
                              name,
                              link,
                              price,
                              createdAt,
                              updatedAt: createdAt,
                            })
                          ),
                          scale: scale.map(([ratio, unit]) => ({
                            id: bigegi84Orm.uuid(),
                            ratio,
                            unit,
                          })),
                          createdAt,
                          updatedAt: createdAt,
                        };
                      }
                    ),
                  },
                };
                const dataStr =
                  "data:text/json;charset=utf-8," +
                  encodeURIComponent(JSON.stringify(json));
                const dlAnchorElem = document.getElementById("downloadA");
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute(
                  "download",
                  `${gardenStore.info.name}.bigegi84-Garden.json`
                );
                dlAnchorElem.click();
                // gardenStore.customer = bigegi84Orm.migrate(
                //   gardenStore.customer
                // );
                // gardenStore.stuff = bigegi84Orm.migrate(gardenStore.stuff);
                // gardenStore.supply = bigegi84Orm.migrate(gardenStore.supply);
              }}
            >
              debug
            </button>
          </div>
        ) : null}
      </div>
    );
  },
};
