const pennyStuff = {
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
                  value={pennyStore.form.stuff[2]}
                  onChange={(e) => (pennyStore.form.stuff[2] = e.target.value)}
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
                  value={pennyStore.form.stuff[3]}
                  onChange={(e) => (pennyStore.form.stuff[3] = e.target.value)}
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
                  value={pennyStore.form.stuff[4]}
                  onChange={(e) => (pennyStore.form.stuff[4] = e.target.value)}
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
                  value={pennyStore.form.stuff[5]}
                  onChange={(e) => (pennyStore.form.stuff[5] = e.target.value)}
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => {
                    if (!pennyStuff.action.validate()) return;
                    const [, , name, price, amount, unit] =
                      pennyStore.form.stuff;
                    pennyStore.stuff.push([
                      ...[
                        name,
                        [
                          [
                            parseFloat(price),
                            parseFloat(amount),
                            unit,
                            moment().format(),
                          ],
                        ],
                      ],
                      ...[moment().format()],
                    ]);
                    pennyStore.form.stuff = [false, false, "", 0.0, 0.0, ""];
                    pennyStuff.action.sort();
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
            return pennyStore.stuff.map(([name, priceHistory], i) => {
              const isEdit =
                pennyStore.form.stuff[0] == "edit" &&
                pennyStore.form.stuff[1] == i;
              const [price, amount, unit] =
                priceHistory[priceHistory.length - 1];
              return (
                <div key={i} className="column-a card-a">
                  {isEdit ? (
                    <div className="row-a">
                      <div>
                        <input
                          type="text"
                          value={pennyStore.form.stuff[2]}
                          onChange={(e) =>
                            (pennyStore.form.stuff[2] = e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <span>{name}</span>
                  )}
                  {isEdit ? (
                    <div className="column-b">
                      <div className="row-a">
                        IDR
                        <div>
                          <input
                            type="text"
                            value={pennyStore.form.stuff[3]}
                            onChange={(e) =>
                              (pennyStore.form.stuff[3] = e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="row-a">
                        /
                        <div>
                          <input
                            type="text"
                            value={pennyStore.form.stuff[4]}
                            onChange={(e) =>
                              (pennyStore.form.stuff[4] = e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={pennyStore.form.stuff[5]}
                            onChange={(e) =>
                              (pennyStore.form.stuff[5] = e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="column-b">
                      <span>
                        {pennyStore.show.balance
                          ? pennyAction.formatNumber(price)
                          : "XXX"}
                      </span>
                      <span>
                        {pennyStore.show.balance ? `/${amount} ${unit}` : "XXX"}
                      </span>
                    </div>
                  )}
                  <div className="row-a">
                    <div
                      style={bigegi84theme.styleCircle}
                      className="circle-a"
                      onClick={() => {
                        if (isEdit) {
                          if (!pennyStuff.action.validate()) return;
                          const [, index, name, price, amount, unit] =
                            pennyStore.form.stuff;
                          let isChangePriceHistory = false;
                          const [, priceHistory] = pennyStore.stuff[index];
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
                          pennyStore.stuff[index] = [
                            ...[name, newPriceHistory],
                            ...[moment().format()],
                          ];
                          pennyStore.form.stuff = [
                            false,
                            false,
                            "",
                            0.0,
                            0.0,
                            "",
                          ];
                          pennyStuff.action.sort();
                        } else {
                          pennyStore.form.stuff = [
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
      pennyStore.stuff = pennyStore.stuff.sort(([name], [bname]) =>
        name > bname ? 1 : bname > name ? -1 : 0
      );
    },
    validate: () => {
      const [, , name, price, amount, unit] = pennyStore.form.stuff;
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
            {add ? <pennyStuff.action.form /> : null}
            <div className="row-a">
              <pennyStuff.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
