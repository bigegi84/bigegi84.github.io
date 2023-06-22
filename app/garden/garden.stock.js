const gardenStock = {
  action: {
    add: () => {
      if (!gardenStock.action.validate()) return;
      const [, , name, source, link, price, amount, unit] =
        gardenStore.form.supply;
      bigegi84Orm.createOne(gardenStore.supply, [
        ...[
          name,
          [
            [
              source,
              link,
              parseFloat(price),
              parseFloat(amount),
              unit,
              moment().format(),
            ],
          ],
          [],
        ],
        ...[moment().format()],
      ]);
      gardenStore.form.supply = [false, false, "", "", 0.0, 0.0, ""];
      gardenStock.action.sort();
    },
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
                  value={gardenStore.form.supply[2]}
                  onChange={(e) =>
                    (gardenStore.form.supply[2] = e.target.value)
                  }
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
                  value={gardenStore.form.supply[3]}
                  onChange={(e) =>
                    (gardenStore.form.supply[3] = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="owner" className={bigegi84theme.class.basic}>
                  Link
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.supply[4]}
                  onChange={(e) =>
                    (gardenStore.form.supply[4] = e.target.value)
                  }
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
                  value={gardenStore.form.supply[5]}
                  onChange={(e) =>
                    (gardenStore.form.supply[5] = e.target.value)
                  }
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
                  value={gardenStore.form.supply[6]}
                  onChange={(e) =>
                    (gardenStore.form.supply[6] = e.target.value)
                  }
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
                  value={gardenStore.form.supply[7]}
                  onChange={(e) =>
                    (gardenStore.form.supply[7] = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => gardenStock.action.add()}
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
            const stock = [];
            gardenStore.purchase.forEach(
              (
                {
                  id,
                  supplyId,
                  amount,
                  unit,
                  source,
                  scale,
                  createdAt,
                  updateAt,
                },
                i
              ) => {
                const find = bigegi84Orm.obj.readOneById(stock, supplyId);
                const supply = bigegi84Orm.obj.readOneById(
                  gardenStore.supply,
                  supplyId
                );
              }
            );
            return gardenStore.purchase.map(
              (
                { id, name, amount, unit, source, scale, createdAt, updateAt },
                i
              ) => {
                const isEdit =
                  gardenStore.form.supply[0] == "edit" &&
                  gardenStore.form.supply[1] == i;
                const supply = gardenStore.supply[i];
                return (
                  <div key={i} className="column-a card-a">
                    {isEdit ? (
                      <div className="row-a">
                        <div>
                          <input
                            type="text"
                            value={gardenStore.form.supply[2]}
                            onChange={(e) =>
                              (gardenStore.form.supply[2] = e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <span>{name}</span>
                    )}
                    {source.map((it, si) => {
                      const { id, name, link, price, createdAt, updateAt } = it;
                      return (
                        <div key={si}>
                          {isEdit ? (
                            <div className="column-b">
                              <span>{name}</span>
                              <div className="row-a">
                                IDR
                                <div>
                                  <input
                                    type="text"
                                    value={gardenStore.form.supply[3]}
                                    onChange={(e) =>
                                      (gardenStore.form.supply[3] =
                                        e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="row-a">
                                /
                                <div>
                                  <input
                                    type="text"
                                    value={gardenStore.form.supply[4]}
                                    onChange={(e) =>
                                      (gardenStore.form.supply[4] =
                                        e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={gardenStore.form.supply[5]}
                                    onChange={(e) =>
                                      (gardenStore.form.supply[5] =
                                        e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="column-b card-a">
                              <a
                                href={link}
                                target="_blank"
                                className={bigegi84theme.class.basic}
                              >
                                {name}
                              </a>
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
                              <gardenStock.action.render.scale
                                supply={supply}
                                source={it}
                                scale={scale}
                              />
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
                            if (!gardenStock.action.validate()) return;
                            const [, index, name, price, amount, unit] =
                              gardenStore.form.supply;
                            let isChangePriceHistory = false;
                            const [, priceHistory] = gardenStore.supply[index];
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
                            gardenStore.supply[index] = [
                              ...[name, newPriceHistory],
                              ...[moment().format()],
                            ];
                            gardenStore.form.supply = [
                              false,
                              false,
                              "",
                              0.0,
                              0.0,
                              "",
                            ];
                            gardenStock.action.sort();
                          } else {
                            gardenStore.form.supply = [
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
              }
            );
          }}
        </mobxReact.Observer>
      );
    },
    render: {
      scale: ({ supply, source, scale }) => {
        return (
          <div className="column-a card-a">
            <span>Skala</span>
            {scale.map(({ id, ratio, unit }, i) => {
              const a = supply.unit == unit ? supply.amount / ratio : ratio;
              const b = source.price / a;
              return (
                <span key={i}>
                  {b}/1 {unit}
                </span>
              );
            })}
          </div>
        );
      },
    },
    sort: () => {
      gardenStore.supply = gardenStore.supply.sort(([name], [bname]) =>
        name > bname ? 1 : bname > name ? -1 : 0
      );
    },
    validate: () => {
      const [, , name, , , price, amount, unit] = gardenStore.form.supply;
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
            Stok
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
            {add ? <gardenStock.action.form /> : null}
            <div className="row-a">
              <gardenStock.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
