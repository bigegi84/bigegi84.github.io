const gardenSupply = {
  action: {
    add: () => {
      if (!gardenSupply.action.validate()) return;
      const {
        name,
        source: sourceName,
        link,
        price,
        amount,
        unit,
      } = gardenStore.form.supply;
      const scale = bigegi84Orm.obj.createOne([], {
        name: unit,
        ratio: 1,
      });
      const { id } = scale[0];
      const source = bigegi84Orm.obj.createOne([], {
        name: sourceName,
        link,
        price,
        amount,
        scaleId: id,
      });
      bigegi84Orm.obj.createOne(gardenStore.supply, {
        name,
        stock: {
          amount: 0,
          scaleId: id,
        },
        sale: [],
        source,
        scale,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
      gardenStore.form.supply = {
        mode: null,
        i: null,
        name: "",
        source: "",
        link: "",
        price: 0.0,
        amount: 0.0,
        unit: "",
      };
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
                  value={gardenStore.form.supply.name}
                  onChange={(e) =>
                    (gardenStore.form.supply.name = e.target.value)
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
                  value={gardenStore.form.supply.source}
                  onChange={(e) =>
                    (gardenStore.form.supply.source = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="link" className={bigegi84theme.class.basic}>
                  Link
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.supply.link}
                  onChange={(e) =>
                    (gardenStore.form.supply.link = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="price" className={bigegi84theme.class.basic}>
                  Harga
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.supply.price}
                  onChange={(e) =>
                    (gardenStore.form.supply.price = e.target.value)
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
                  value={gardenStore.form.supply.amount}
                  onChange={(e) =>
                    (gardenStore.form.supply.amount = e.target.value)
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
                  value={gardenStore.form.supply.unit}
                  onChange={(e) =>
                    (gardenStore.form.supply.unit = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => gardenSupply.action.add()}
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
            return gardenStore.supply.map(
              (
                {
                  id,
                  name,
                  stock,
                  sale,
                  sellPrice,
                  unit,
                  source,
                  scale,
                  createdAt,
                  updateAt,
                },
                i
              ) => {
                const isEdit =
                  gardenStore.form.supply[0] == "edit" &&
                  gardenStore.form.supply[1] == i;
                const { name: scaleName } = bigegi84Orm.obj.readOneById(
                  scale,
                  stock.scaleId
                );
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
                    <div className="column-a card-a">
                      <span>
                        Stok: {stock.amount} {scaleName}
                      </span>
                    </div>
                    <gardenSupplySale.view
                      iSupply={i}
                      sale={sale}
                      scale={scale}
                    />
                    <gardenSupplyScale.view iSupply={i} />
                    {source.map((it, si) => {
                      const {
                        id,
                        name,
                        link,
                        price,
                        amount,
                        scaleId,
                        createdAt,
                        updateAt,
                      } = it;
                      const { name: scaleName } = bigegi84Orm.obj.readOneById(
                        scale,
                        scaleId
                      );
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
                                  ? `/${amount} ${scaleName}`
                                  : "XXX"}
                              </span>
                              <gardenSupply.action.render.scale
                                supplyI={i}
                                sourceI={si}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {/* <div className="row-a">
                      <div
                        style={bigegi84theme.styleCircle}
                        className="circle-a"
                        onClick={() => {
                          if (isEdit) {
                            if (!gardenSupply.action.validate()) return;
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
                            gardenSupply.action.sort();
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
                    </div> */}
                  </div>
                );
              }
            );
          }}
        </mobxReact.Observer>
      );
    },
    render: {
      scale: ({ supplyI, sourceI }) => {
        const { scale, source } = gardenStore.supply[supplyI];
        const { price, amount, scaleId } = source[sourceI];
        const { name: sourceScaleName, ratio: sourceScaleRatio } =
          bigegi84Orm.obj.readOneById(scale, scaleId);
        return (
          <div className="column-a card-a">
            <span>Skala</span>
            {scale.map(({ id, ratio, name }, i) => {
              const b = (sourceScaleRatio / ratio) * price;
              return (
                <span key={i}>
                  {b}/{name}
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
      const { name, price, amount, unit } = gardenStore.form.supply;
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
            Pasokan
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
            {add ? <gardenSupply.action.form /> : null}
            <div className="row-a">
              <gardenSupply.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
