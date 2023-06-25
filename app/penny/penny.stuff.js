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
            return pennyStore.stuff.map(({ id, name, createdAt }, stuffI) => {
              const isEdit =
                pennyStore.form.stuff.mode == "edit" &&
                pennyStore.form.stuff.i == stuffI;
              const stuffPrice = bigegi84Orm.obj.readMany(
                pennyStore.stuffPrice,
                {
                  stuffId: id,
                }
              );
              return (
                <div key={stuffI} className="column-a card-a">
                  <div className="row-a">
                    {isEdit ? (
                      <div className="row-a">
                        <div>
                          <input
                            type="text"
                            value={pennyStore.form.stuff.name}
                            onChange={(e) =>
                              (pennyStore.form.stuff.name = e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <span>{name}</span>
                    )}
                    <div className="row-a">
                      <div
                        style={bigegi84theme.styleCircle}
                        className="circle-a"
                        onClick={() => {
                          if (isEdit) {
                            const { i, name: formName } = pennyStore.form.stuff;
                            pennyStore.stuff[i].name = formName;
                            pennyStore.form.stuff = {
                              mode: null,
                              i: null,
                              name: "",
                              shopId: "",
                              amount: 0,
                              price: 0,
                              unit: "",
                            };
                          } else {
                            pennyStore.form.stuff.mode = "edit";
                            pennyStore.form.stuff.i = stuffI;
                            pennyStore.form.stuff.name = name;
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
                  <pennyStuff.action.stuffPrice.addForm
                    stuffI={stuffI}
                    stuffId={id}
                  />
                  {stuffPrice.map(({ shopId, amount, price }, stuffPriceI) => {
                    const isEditPrice =
                      pennyStore.form.stuffPrice.mode == "edit" &&
                      pennyStore.form.stuffPrice.stuffI == stuffI &&
                      pennyStore.form.stuffPrice.i == stuffPriceI;
                    return (
                      <div className="column-b card-a" key={stuffPriceI}>
                        <div className="row-a">
                          <div className="column-a">
                            <span>
                              {
                                bigegi84Orm.obj.readOneById(
                                  pennyStore.shop,
                                  shopId
                                ).name
                              }
                            </span>
                            {isEditPrice ? null : (
                              <span>
                                {pennyStore.show.balance
                                  ? `${pennyAction.formatNumber(
                                      price
                                    )} (${amount})`
                                  : "XXX"}
                              </span>
                            )}
                          </div>
                          <pennyStuff.action.stuffPrice.editForm
                            stuffI={stuffI}
                            stuffPriceI={stuffPriceI}
                          />
                        </div>
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
    stuffPrice: {
      add: () => {
        if (!pennyStuff.action.stuffPrice.validate()) return;
        const { stuffId, shopId, price, amount } = pennyStore.form.stuffPrice;
        bigegi84Orm.obj.createOne(pennyStore.stuffPrice, {
          stuffId,
          shopId,
          amount: parseFloat(amount),
          price: parseFloat(price),
          createdAt: moment().format(),
          updatedAt: moment().format(),
        });
        pennyStore.form.stuffPrice = {
          mode: null,
          stuffI: null,
          i: null,
          stuffId: "",
          shopId: "",
          amount: 0,
          price: 0,
        };
      },
      addForm: ({ stuffI, stuffId }) => {
        return (
          <mobxReact.Observer>
            {() => {
              const isAddPrice =
                pennyStore.form.stuffPrice.mode == "add" &&
                pennyStore.form.stuffPrice.stuffI == stuffI;
              return (
                <div className="column-a">
                  <div className="row-a">
                    <div
                      style={bigegi84theme.styleCircle}
                      className="circle-a"
                      onClick={() => {
                        pennyStore.form.stuffPrice.mode = isAddPrice
                          ? null
                          : "add";
                        pennyStore.form.stuffPrice.stuffI = stuffI;
                        pennyStore.form.stuffPrice.stuffId = stuffId;
                      }}
                    >
                      <i
                        className={
                          "fa-solid" + (isAddPrice ? " fa-minus" : " fa-plus")
                        }
                      />
                    </div>
                  </div>
                  {isAddPrice ? (
                    <div className="row-a">
                      <select
                        onChange={(e) =>
                          (pennyStore.form.stuffPrice.shopId = e.target.value)
                        }
                      >
                        <option value="">Pilih Toko</option>
                        {pennyStore.shop.map(({ id, name }, i) => (
                          <option key={i} value={id}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <input
                        value={pennyStore.form.stuffPrice.price}
                        onChange={(e) =>
                          (pennyStore.form.stuffPrice.price = e.target.value)
                        }
                      />
                      <input
                        value={pennyStore.form.stuffPrice.amount}
                        onChange={(e) =>
                          (pennyStore.form.stuffPrice.amount = e.target.value)
                        }
                      />
                      <button
                        onClick={() => pennyStuff.action.stuffPrice.add()}
                      >
                        simpan
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            }}
          </mobxReact.Observer>
        );
      },
      edit: () => {
        if (!pennyStuff.action.stuffPrice.validate()) return;
        const { i, price, amount } = pennyStore.form.stuffPrice;
        pennyStore.stuffPrice[i].price = parseFloat(price);
        pennyStore.stuffPrice[i].amount = parseFloat(amount);
        pennyStore.form.stuffPrice = {
          mode: null,
          i: null,
          stuffI: null,
          stuffId: "",
          shopId: "",
          amount: 0,
          price: 0,
        };
      },
      editForm: ({ stuffI, stuffPriceI }) => {
        return (
          <mobxReact.Observer>
            {() => {
              const isEdit =
                pennyStore.form.stuffPrice.mode == "edit" &&
                pennyStore.form.stuffPrice.stuffI == stuffI &&
                pennyStore.form.stuffPrice.i == stuffPriceI;
              return (
                <div className="column-a">
                  {isEdit ? (
                    <div className="row-a">
                      <input
                        value={pennyStore.form.stuffPrice.price}
                        onChange={(e) =>
                          (pennyStore.form.stuffPrice.price = e.target.value)
                        }
                      />
                      <input
                        value={pennyStore.form.stuffPrice.amount}
                        onChange={(e) =>
                          (pennyStore.form.stuffPrice.amount = e.target.value)
                        }
                      />
                      <button
                        onClick={() => pennyStuff.action.stuffPrice.add()}
                      >
                        simpan
                      </button>
                    </div>
                  ) : null}
                  <div className="row-a">
                    <div
                      style={bigegi84theme.styleCircle}
                      className="circle-a"
                      onClick={() => {
                        if (isEdit) {
                          pennyStuff.action.stuffPrice.edit();
                        } else {
                          const { price, amount } =
                            pennyStore.stuffPrice[stuffPriceI];
                          pennyStore.form.stuffPrice = {
                            mode: "edit",
                            stuffI,
                            i: stuffPriceI,
                            price: parseFloat(price),
                            amount: parseFloat(amount),
                          };
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
            }}
          </mobxReact.Observer>
        );
      },
      validate: () => {
        return true;
      },
    },
    validate: () => {
      const { name, price, amount, unit } = pennyStore.form.stuff;
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
