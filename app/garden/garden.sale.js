const gardenSale = {
  action: {
    add: () => {
      if (!gardenSale.action.validate()) return;
      const { supplyAndSourceId, amount, unit: iScale } = gardenStore.form.sale;
      const [i, si] = supplyAndSourceId.split("-");
      const { id: supplyId, source, scale } = gardenStore.supply[i];
      const { id: sourceId, price } = source[si];
      const priceTotal = -(parseFloat(amount) * parseFloat(price));
      bigegi84Orm.obj.createOne(gardenStore.sale, {
        ...{
          supplyId,
          sourceId,
          amount: parseFloat(amount),
          price: priceTotal,
          createdAt: moment().format(),
          updatedAtt: moment().format(),
        },
      });
      const { ratio } = scale[iScale];
      gardenStore.supply[i].stock += -parseFloat(amount / ratio);
      gardenStore.form.sale = {
        mode: null,
        i: null,
        supplyAndSourceId: "",
        amount: 0,
        unit: "",
        unitList: [],
      };
      gardenSale.action.sort();
    },
    form: () => {
      return (
        <mobxReact.Observer>
          {() => (
            <div className="row-a">
              <div className="column-a">
                <label htmlFor="name" className={bigegi84theme.class.basic}>
                  Barang
                </label>
                <select
                  value={gardenStore.form.sale.supplyAndSourceId}
                  onChange={(e) => {
                    gardenStore.form.sale.supplyAndSourceId = e.target.value;
                  }}
                >
                  <option value="">Pilih Supply</option>
                  {gardenStore.supply.map(({ id, name, source, stock }, i) => {
                    return source.map((it, si) => (
                      <option key={si} value={`${i}-${si}`}>
                        {`(${stock})${name}-${it.name}`}
                      </option>
                    ));
                  })}
                </select>
              </div>
              {gardenStore.form.sale.supplyAndSourceId == "" ? null : (
                <div className="column-a">
                  <label htmlFor="name" className={bigegi84theme.class.basic}>
                    Unit
                  </label>
                  <select
                    value={gardenStore.form.sale.unit}
                    onChange={(e) =>
                      (gardenStore.form.sale.unit = e.target.value)
                    }
                  >
                    <option value="">Pilih Unit</option>
                    {gardenStore.supply[
                      gardenStore.form.sale.supplyAndSourceId.split("-")[0]
                    ].scale.map(({ id, ratio, unit }, i) => {
                      return (
                        <option key={i} value={`${i}`}>
                          {unit}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              <div className="column-a">
                <label htmlFor="owner" className={bigegi84theme.class.basic}>
                  Jumlah
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.sale.amount}
                  onChange={(e) =>
                    (gardenStore.form.sale.amount = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => gardenSale.action.add()}
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
            return gardenStore.sale.map(
              (
                { id, supplyId, sourceId, amount, price, createdAt, updateAt },
                i
              ) => {
                const isEdit =
                  gardenStore.form.sale[0] == "edit" &&
                  gardenStore.form.sale[1] == i;
                //   const [source, price, amount, unit] =
                //     priceList[priceList.length - 1];
                const { name } = bigegi84Orm.obj.readOneById(
                  gardenStore.supply,
                  supplyId
                );
                return (
                  <div key={i} className="column-a card-a">
                    {isEdit ? (
                      <div className="row-a">
                        <div>
                          <input
                            type="text"
                            value={gardenStore.form.sale[2]}
                            onChange={(e) =>
                              (gardenStore.form.sale[2] = e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <span>{name}</span>
                    )}
                    <span>
                      {amount} {gardenAction.formatNumber(price)}
                    </span>
                    <div className="row-a">
                      <div
                        style={bigegi84theme.styleCircle}
                        className="circle-a"
                        onClick={() => {
                          if (isEdit) {
                            if (!gardenSale.action.validate()) return;
                            const [, index, name, price, amount, unit] =
                              gardenStore.form.sale;
                            let isChangePriceHistory = false;
                            const [, priceHistory] = gardenStore.sale[index];
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
                            gardenStore.sale[index] = [
                              ...[name, newPriceHistory],
                              ...[moment().format()],
                            ];
                            gardenStore.form.sale = [
                              false,
                              false,
                              "",
                              0.0,
                              0.0,
                              "",
                            ];
                            gardenSale.action.sort();
                          } else {
                            gardenStore.form.sale = [
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
    sort: () => {
      gardenStore.sale = gardenStore.sale.sort(([name], [bname]) =>
        name > bname ? 1 : bname > name ? -1 : 0
      );
    },
    validate: () => {
      const { supplyAndSourceId, unit, amount } = gardenStore.form.sale;
      if (supplyAndSourceId == "") {
        alert("Pilih supply!");
        return false;
      }
      if (unit == "") {
        alert("Pilih unit!");
        return false;
      }
      if (isNaN(parseFloat(amount))) {
        alert("Jumlah salah!");
        return false;
      }
      if (parseFloat(amount) == 0) {
        alert("Jumlah tidak boleh 0!");
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
            Penjualan
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
            {add ? <gardenSale.action.form /> : null}
            <div className="row-a">
              <gardenSale.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
