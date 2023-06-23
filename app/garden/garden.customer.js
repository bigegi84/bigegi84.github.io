const gardenCustomer = {
  action: {
    add: () => {
      if (!gardenCustomer.action.validate()) return;
      const [, , name] = gardenStore.form.customer;
      // gardenStore.customer.push([...[name], ...[moment().format()]]);
      bigegi84Orm.createOne(gardenStore.customer, [
        ...[name],
        ...[moment().format()],
      ]);
      gardenStore.form.customer = [false, false, "", "", 0.0, 0.0, ""];
      gardenCustomer.action.sort();
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
                  value={gardenStore.form.customer[2]}
                  onChange={(e) =>
                    (gardenStore.form.customer[2] = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => gardenCustomer.action.add()}
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
            return gardenStore.customer.map(
              ({ id, name, createdAt, updatedAt }, i) => {
                const isEdit =
                  gardenStore.form.customer[0] == "edit" &&
                  gardenStore.form.customer[1] == i;
                //   const [source, price, amount, unit] =
                //     priceList[priceList.length - 1];
                return (
                  <div key={i} className="column-a card-a">
                    {isEdit ? (
                      <div className="row-a">
                        <div>
                          <input
                            type="text"
                            value={gardenStore.form.customer[2]}
                            onChange={(e) =>
                              (gardenStore.form.customer[2] = e.target.value)
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
                            if (!gardenCustomer.action.validate()) return;
                            const [, index, name, price, amount, unit] =
                              gardenStore.form.customer;
                            let isChangePriceHistory = false;
                            const [, priceHistory] =
                              gardenStore.customer[index];
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
                            gardenStore.customer[index] = [
                              ...[name, newPriceHistory],
                              ...[moment().format()],
                            ];
                            gardenStore.form.customer = [
                              false,
                              false,
                              "",
                              0.0,
                              0.0,
                              "",
                            ];
                            gardenCustomer.action.sort();
                          } else {
                            gardenStore.form.customer = [
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
      gardenStore.customer = gardenStore.customer.sort(([name], [bname]) =>
        name > bname ? 1 : bname > name ? -1 : 0
      );
    },
    validate: () => {
      const [, , name, , , price, amount, unit] = gardenStore.form.customer;
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
            Pembeli
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
            {add ? <gardenCustomer.action.form /> : null}
            <div className="row-a">
              <gardenCustomer.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
