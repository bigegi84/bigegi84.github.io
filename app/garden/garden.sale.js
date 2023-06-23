const gardenSale = {
  action: {
    add: () => {
      if (!gardenSale.action.validate()) return;
      const {
        supplyAndSaleId,
        amount,
        unit: iScale,
        name,
        price,
      } = gardenStore.form.sale;
      const [i, si] = supplyAndSaleId.split("-");
      bigegi84Orm.obj.createOneAtBegining(gardenStore.sale, {
        name,
        amount: parseFloat(amount),
        price: parseFloat(price),
        createdAt: moment().format(),
        updatedAtt: moment().format(),
      });
      gardenAction.stock.sale({ supplyI: i, saleI: si });
      gardenStore.form.sale = {
        mode: null,
        i: null,
        supplyAndSaleId: "",
        name: "",
        amount: 0,
        price: 0,
        unitPrice: 0,
        productName: [],
      };
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
                  value={gardenStore.form.sale.supplyAndSaleId}
                  onChange={(e) => {
                    gardenStore.form.sale.supplyAndSaleId = e.target.value;
                    if (e.target.value != "") {
                      const [supplyI, saleI] = e.target.value.split("-");
                      const { sale } = gardenStore.supply[supplyI];
                      const { price } = sale[saleI];
                      const { amount } = gardenStore.form.sale;
                      gardenStore.form.sale.price = isNaN(parseFloat(amount))
                        ? 0
                        : parseFloat(amount) * price;
                      console.log([gardenStore.form.sale.productName[saleI]]);
                      gardenStore.form.sale.name =
                        gardenStore.form.sale.productName[saleI];
                    }
                  }}
                >
                  <option value="">Pilih Supply</option>
                  {gardenStore.supply.map(({ name, stock, sale, scale }, i) => {
                    return sale.map(({ scaleId, price }, si) => {
                      const { name: scaleName } = bigegi84Orm.obj.readOneById(
                        scale,
                        scaleId
                      );
                      const productName = `${name} (1 ${scaleName}) ${gardenAction.formatNumber(
                        price
                      )}`;
                      gardenStore.form.sale.productName[si] = productName;
                      return (
                        <option key={si} value={`${i}-${si}`}>
                          {`(${stock.amount}) ${productName}`}
                        </option>
                      );
                    });
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
                  value={gardenStore.form.sale.amount}
                  onChange={(e) =>
                    (gardenStore.form.sale.amount = e.target.value)
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
                  value={gardenStore.form.sale.price}
                  onChange={(e) =>
                    (gardenStore.form.sale.price = e.target.value)
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
              ({ id, name, amount, price, createdAt, updateAt }, i) => {
                return (
                  <div key={i} className="column-a card-a">
                    <span>{moment(createdAt).locale("id").fromNow()}</span>
                    <span>{name}</span>
                    <span>
                      {amount} {gardenAction.formatNumber(price)}
                    </span>
                    {/* <div className="row-a">
                      <div
                        style={bigegi84theme.styleCircle}
                        className="circle-a"
                        onClick={() => {}}
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
            Jual
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
