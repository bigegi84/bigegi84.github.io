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
                  value={pennyStore.form.stuff.name}
                  onChange={(e) =>
                    (pennyStore.form.stuff.name = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="name" className={bigegi84theme.class.basic}>
                  Nama
                </label>
                <select
                  type="text"
                  id="shopId"
                  name="shopId"
                  className={bigegi84theme.class.inputText}
                  value={pennyStore.form.stuff.shopId}
                  onChange={(e) => (pennyStore.form.stuff.na = e.target.value)}
                >
                  <option value="">Pilih Toko</option>
                  {pennyStore.shop.map(({ id, name, location }, i) => (
                    <option key={i} value={id}>
                      {name} {location}
                    </option>
                  ))}
                </select>
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
                  value={pennyStore.form.stuff.price}
                  onChange={(e) =>
                    (pennyStore.form.stuff.price = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="amount" className={bigegi84theme.class.basic}>
                  Jumlah
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  className={bigegi84theme.class.inputText}
                  value={pennyStore.form.stuff.amount}
                  onChange={(e) =>
                    (pennyStore.form.stuff.amount = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="unit" className={bigegi84theme.class.basic}>
                  Satuan
                </label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  className={bigegi84theme.class.inputText}
                  value={pennyStore.form.stuff.unit}
                  onChange={(e) =>
                    (pennyStore.form.stuff.unit = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => {
                    if (!pennyStuff.action.validate()) return;
                    const { name, shopId, price, amount, unit } =
                      pennyStore.form.stuff;
                    const priceHistory = [];
                    bigegi84Orm.obj.createOne(priceHistory, {
                      price,
                      amount,
                      unit,
                      createdAt: moment().format(),
                      updatedAt: moment().format(),
                    });
                    bigegi84Orm.obj.createOne(pennyStore.stuff, {
                      name,
                      shopId,
                      priceHistory,
                      createdAt: moment().format(),
                      updatedAt: moment().format(),
                    });
                    pennyStore.form.stuff = {
                      mode: null,
                      i: null,
                      name: "",
                      shopId: "",
                      amount: 0,
                      price: 0,
                      unit: "",
                    };
                    bigegi84Orm.obj.sort(pennyStore.stuff, "name");
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
            return pennyStore.stuff.map(({ id, name, createdAt }, i) => {
              const isEdit =
                pennyStore.form.stuff[0] == "edit" &&
                pennyStore.form.stuff[1] == i;
              const stuffPrice = bigegi84Orm.obj.readMany(
                pennyStore.stuffPrice,
                {
                  stuffId: id,
                }
              );
              const isAddPrice =
                pennyStore.form.stuffPrice.mode == "add" &&
                pennyStore.form.stuffPrice.stuffI == i;
              return (
                <div key={i} className="column-a card-a">
                  <mobxReact.Observer>
                    {() => {
                      return (
                        <div className="row-a">
                          <div
                            style={bigegi84theme.styleCircle}
                            className="circle-a"
                            onClick={() => {
                              pennyStore.form.stuffPrice.mode = isAddPrice
                                ? null
                                : "add";
                              pennyStore.form.stuffPrice.stuffI = i;
                            }}
                          >
                            <i
                              className={
                                "fa-solid" +
                                (isAddPrice ? " fa-minus" : " fa-plus")
                              }
                            />
                          </div>
                        </div>
                      );
                    }}
                  </mobxReact.Observer>
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
                  {stuffPrice.map(({ shopId, amount, price }, i) => {
                    return (
                      <div className="column-b card-a" key={i}>
                        <span>
                          {
                            bigegi84Orm.obj.readOneById(pennyStore.shop, shopId)
                              .name
                          }
                        </span>
                        <span>
                          {pennyStore.show.balance
                            ? `${pennyAction.formatNumber(price)} (${amount})`
                            : "XXX"}
                        </span>
                      </div>
                    );
                  })}

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
                  ) : null}
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
