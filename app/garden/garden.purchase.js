const gardenPurchase = {
  action: {
    add: () => {
      if (!gardenPurchase.action.validate()) return;
      const {
        supplyAndSourceId,
        amount,
        productName: productNameList,
      } = gardenStore.form.purchase;
      const [i, si] = supplyAndSourceId.split("-");
      const { id: supplyId, source, stock, scale } = gardenStore.supply[i];
      const { id: sourceId, price } = source[si];
      const productName = productNameList[si];
      const priceTotal = -(parseFloat(amount) * parseFloat(price));
      bigegi84Orm.obj.createOne(gardenStore.purchase, {
        name: productName,
        amount: parseFloat(amount),
        price: priceTotal,
        createdAt: moment().format(),
        updatedAtt: moment().format(),
      });
      // gardenStore.supply[i].stock += parseFloat(amount);
      gardenAction.stock.purchase({
        i,
        scale,
        source: source[si],
        stock,
        amount: parseFloat(amount),
      });
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
                  value={gardenStore.form.purchase.supplyAndSourceId}
                  onChange={(e) =>
                    (gardenStore.form.purchase.supplyAndSourceId =
                      e.target.value)
                  }
                >
                  <option value="">Pilih Supply</option>
                  {gardenStore.supply.map(({ id, name, source, scale }, i) => {
                    return source.map(
                      ({ name: sourceName, scaleId, amount, price }, si) => {
                        const { name: scaleName } = bigegi84Orm.obj.readOneById(
                          scale,
                          scaleId
                        );
                        const productName = `${sourceName}-${name} (${amount} ${scaleName}) ${gardenAction.formatNumber(
                          price
                        )}`;
                        gardenStore.form.purchase.productName[si] = productName;
                        return (
                          <option key={si} value={`${i}-${si}`}>
                            {productName}
                          </option>
                        );
                      }
                    );
                  })}
                </select>
              </div>
              <div className="column-a">
                <label htmlFor="owner" className={bigegi84theme.class.basic}>
                  Jumlah
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  className={bigegi84theme.class.inputText}
                  value={gardenStore.form.purchase.amount}
                  onChange={(e) =>
                    (gardenStore.form.purchase.amount = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => gardenPurchase.action.add()}
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
            return gardenStore.purchase.map(
              ({ id, name, amount, price, createdAt, updateAt }, i) => {
                const isEdit =
                  gardenStore.form.purchase[0] == "edit" &&
                  gardenStore.form.purchase[1] == i;
                return (
                  <div key={i} className="column-a card-a">
                    {isEdit ? (
                      <div className="row-a">
                        <div>
                          <input
                            type="text"
                            value={gardenStore.form.purchase[2]}
                            onChange={(e) =>
                              (gardenStore.form.purchase[2] = e.target.value)
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
                            if (!gardenPurchase.action.validate()) return;
                            const [, index, name, price, amount, unit] =
                              gardenStore.form.purchase;
                            let isChangePriceHistory = false;
                            const [, priceHistory] =
                              gardenStore.purchase[index];
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
                            gardenStore.purchase[index] = [
                              ...[name, newPriceHistory],
                              ...[moment().format()],
                            ];
                            gardenStore.form.purchase = [
                              false,
                              false,
                              "",
                              0.0,
                              0.0,
                              "",
                            ];
                            gardenPurchase.action.sort();
                          } else {
                            gardenStore.form.purchase = [
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
      gardenStore.purchase = gardenStore.purchase.sort(([name], [bname]) =>
        name > bname ? 1 : bname > name ? -1 : 0
      );
    },
    validate: () => {
      const { supplyAndSourceId, amount } = gardenStore.form.purchase;
      if (supplyAndSourceId == "") {
        alert("Pilih supply!");
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
            Beli
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
            {add ? <gardenPurchase.action.form /> : null}
            <div className="row-a">
              <gardenPurchase.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
