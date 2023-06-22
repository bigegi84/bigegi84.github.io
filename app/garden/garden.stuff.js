const gardenStuff = {
  action: {
    form: () => {
      return (
        <mobxReact.Observer>
          {() => (
            <div className="row-a">
              <div className="column-a">
                <label htmlFor="name" className={bigegi84theme.class.basic}>
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.stuff[2]}
                  onChange={(e) => (gardenStore.form.stuff[2] = e.target.value)}
                />
              </div>
              <div className="column-a">
                <label htmlFor="owner" className={bigegi84theme.class.basic}>
                  Sumber
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.stuff[3]}
                  onChange={(e) => (gardenStore.form.stuff[3] = e.target.value)}
                />
              </div>
              <div className="column-a">
                <label htmlFor="owner" className={bigegi84theme.class.basic}>
                  Harga
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.stuff[4]}
                  onChange={(e) => (gardenStore.form.stuff[4] = e.target.value)}
                />
              </div>
              <div className="column-a">
                <label htmlFor="balance" className={bigegi84theme.class.basic}>
                  Jumlah
                </label>
                <input
                  type="text"
                  id="balance"
                  name="balance"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.stuff[5]}
                  onChange={(e) => (gardenStore.form.stuff[5] = e.target.value)}
                />
              </div>
              <div className="column-a">
                <label htmlFor="balance" className={bigegi84theme.class.basic}>
                  Satuan
                </label>
                <input
                  type="text"
                  id="balance"
                  name="balance"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.stuff[6]}
                  onChange={(e) => (gardenStore.form.stuff[6] = e.target.value)}
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => {
                    if (!gardenStuff.action.validate()) return;
                    const [, , name, source, price, amount, unit] =
                      gardenStore.form.stuff;
                    gardenStore.stuff.push([
                      ...[
                        name,
                        [
                          [
                            source,
                            parseFloat(price),
                            parseFloat(amount),
                            unit,
                            moment().format(),
                          ],
                        ],
                      ],
                      ...[moment().format()],
                    ]);
                    gardenStore.form.stuff = [
                      false,
                      false,
                      "",
                      "",
                      0.0,
                      0.0,
                      "",
                    ];
                    gardenStuff.action.sort();
                  }}
                >
                  Simpan
                </button>
              </div>
            </div>
          )}
        </mobxReact.Observer>
      );
    },
    list: () => {
      return (
        <mobxReact.Observer>
          {() => {
            return gardenStore.stuff.map(([,name, priceList], i) => {
              const isEdit =
                gardenStore.form.stuff[0] == "edit" &&
                gardenStore.form.stuff[1] == i;
              //   const [source, price, amount, unit] =
              //     priceList[priceList.length - 1];
              return (
                <div key={i} className="column-a card-a">
                  {isEdit ? (
                    <div className="row-a">
                      <div>
                        <input
                          type="text"
                          value={gardenStore.form.stuff[2]}
                          onChange={(e) =>
                            (gardenStore.form.stuff[2] = e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <span>{name}</span>
                  )}
                  {priceList.map(([source, price, amount, unit], i) => {
                    return (
                      <div key={i}>
                        {isEdit ? (
                          <div className="column-b">
                            <span>{source}</span>
                            <div className="row-a">
                              IDR
                              <div>
                                <input
                                  type="text"
                                  value={gardenStore.form.stuff[3]}
                                  onChange={(e) =>
                                    (gardenStore.form.stuff[3] = e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="row-a">
                              /
                              <div>
                                <input
                                  type="text"
                                  value={gardenStore.form.stuff[4]}
                                  onChange={(e) =>
                                    (gardenStore.form.stuff[4] = e.target.value)
                                  }
                                />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  value={gardenStore.form.stuff[5]}
                                  onChange={(e) =>
                                    (gardenStore.form.stuff[5] = e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="column-b card-a">
                            <span>{source}</span>
                            <span>
                              {gardenStore.show.balance
                                ? gardenAction.formatNumber(price)
                                : "XXX"}
                            </span>
                            <span>
                              {gardenStore.show.balance
                                ? `/${amount} ${unit}`
                                : "XXX"}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="row-a">
                    <div
                      style={bigegi84theme.styleCircle}
                      className="circle-a"
                      onClick={() => {
                        if (isEdit) {
                          if (!gardenStuff.action.validate()) return;
                          const [, index, name, price, amount, unit] =
                            gardenStore.form.stuff;
                          let isChangePriceHistory = false;
                          const [, priceHistory] = gardenStore.stuff[index];
                          const [lPrice, lAmount, lUnit] =
                            priceHistory[priceHistory.length - 1];
                          if (
                            price != lPrice ||
                            amount != lAmount ||
                            unit != lUnit
                          )
                            isChangePriceHistory = true;
                          let newPriceHistory = [...priceHistory];
                          if (isChangePriceHistory)
                            newPriceHistory.push([
                              parseFloat(price),
                              parseFloat(amount),
                              unit,
                              moment().format(),
                            ]);
                          gardenStore.stuff[index] = [
                            ...[name, newPriceHistory],
                            ...[moment().format()],
                          ];
                          gardenStore.form.stuff = [
                            false,
                            false,
                            "",
                            0.0,
                            0.0,
                            "",
                          ];
                          gardenStuff.action.sort();
                        } else {
                          gardenStore.form.stuff = [
                            ...[
                              "edit",
                              i,
                              name,
                              parseFloat(price),
                              parseFloat(amount),
                              unit,
                            ],
                          ];
                        }
                      }}
                    >
                      <i
                        className={
                          "fa-solid" + (isEdit ? " fa-check" : " fa-pen")
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            });
          }}
        </mobxReact.Observer>
      );
    },
    sort: () => {
      gardenStore.stuff = gardenStore.stuff.sort(([name], [bname]) =>
        name > bname ? 1 : bname > name ? -1 : 0
      );
    },
    validate: () => {
      const [, , name, , price, amount, unit] = gardenStore.form.stuff;
      if (isNaN(parseFloat(price))) {
        alert("Harga salah!");
        return false;
      }
      if (isNaN(parseFloat(amount))) {
        alert("Jumlah salah!");
        return false;
      }
      return true;
    },
  },
  view: () => {
    const [show, setShow] = React.useState(false);
    const [add, setAdd] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            Barang
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
          <div className="column-a">
            <div className="row-a">
              <div
                style={bigegi84theme.styleCircle}
                className="circle-a"
                onClick={() => setAdd(!add)}
              >
                <i className={"fa-solid" + (add ? " fa-minus" : " fa-plus")} />
              </div>
            </div>
            {add ? <gardenStuff.action.form /> : null}
            <div className="row-a">
              <gardenStuff.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
