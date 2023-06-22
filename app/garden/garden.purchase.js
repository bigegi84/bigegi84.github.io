const gardenPurchase = {
  action: {
    add: () => {
      if (!gardenPurchase.action.validate()) return;
      const [, , iSupply, amount] = gardenStore.form.purchase;
      const [i, pi] = iSupply.split("-");
      const [name, priceList] = gardenStore.supply[i];
      const [pName, , pPrice, pAmount, unit] = priceList[pi];
      gardenStore.purchase.push([
        ...[
          `${name}-${pName} ${pAmount} ${unit}`,
          parseFloat(amount),
          -parseFloat(pPrice),
          moment().format(),
        ],
      ]);
      gardenStore.form.purchase = [false, false, "", 0.0];
      gardenPurchase.action.sort();
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
                  value={gardenStore.form.purchase[2]}
                  onChange={(e) =>
                    (gardenStore.form.purchase[2] = e.target.value)
                  }
                >
                  <option value="">Pilih Supply</option>
                  {gardenStore.supply.map(([name, priceList], i) => {
                    return priceList.map(([pName], pi) => (
                      <option key={pi} value={`${i}-${pi}`}>
                        {name}-{pName}
                      </option>
                    ));
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
                  value={gardenStore.form.purchase[3]}
                  onChange={(e) =>
                    (gardenStore.form.purchase[3] = e.target.value)
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
            return gardenStore.purchase.map(([,name, amount, price], i) => {
              const isEdit =
                gardenStore.form.purchase[0] == "edit" &&
                gardenStore.form.purchase[1] == i;
              //   const [source, price, amount, unit] =
              //     priceList[priceList.length - 1];
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
                          const [, priceHistory] = gardenStore.purchase[index];
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
            });
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
      const [, , name, amount] = gardenStore.form.purchase;
      if (name == "") {
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
            Pembelian
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
