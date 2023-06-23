const gardenSupplySale = {
  action: {
    edit: () => {
      if (!gardenSupplySale.action.validate()) return;
      const { iSupply, i, price } = gardenStore.form.supplySale;
      gardenStore.supply[iSupply].sale[i].price = parseFloat(price);
      gardenStore.form.supplySale = {
        mode: null,
        iSupply: null,
        i: null,
        price: "",
        scaleId: "",
      };
    },
    form: ({ scale }) => {
      const { scaleId } = gardenStore.form.supplySale;
      const { name: scaleName } = bigegi84Orm.obj.readOneById(scale, scaleId);
      console.log(scaleName);
      return (
        <div>
          <mobxReact.Observer>
            {() => (
              <input
                value={gardenStore.form.supplySale.price}
                onChange={(e) =>
                  (gardenStore.form.supplySale.price = e.target.value)
                }
              />
            )}
          </mobxReact.Observer>
          /
          {gardenStore.form.supplySale.mode == "add" ? (
            <select>
              <option value="">Pilih Skala</option>
              {scale.map(({ id, name }, i) => (
                <option key={i} value={id}>
                  {name}
                </option>
              ))}
            </select>
          ) : (
            <span>{scaleName}</span>
          )}
        </div>
      );
    },
    validate: () => {
      const { price, scaleId } = gardenStore.form.supplySale;
      if (isNaN(parseFloat(price))) {
        alert("Harga salah!");
        return false;
      }
      if (scaleId == "") {
        alert("Skala salah!");
        return false;
      }
      return true;
    },
  },
  view: ({ iSupply, sale, scale }) => {
    return (
      <div className="column-a card-a">
        <div className="row-a">
          <span>Harga Jual:</span>
          <div className="row-a">
            <div
              style={bigegi84theme.styleCircle}
              className="circle-a"
              onClick={() =>
                (gardenStore.form.supplySale = {
                  mode:
                    gardenStore.form.supplySale.mode == "add" ? null : "add",
                  iSupply: null,
                  i: null,
                  price: "",
                  scaleId: "",
                })
              }
            >
              <i
                className={
                  "fa-solid" +
                  (gardenStore.form.supplySale.mode == "add"
                    ? " fa-minus"
                    : " fa-plus")
                }
              />
            </div>
          </div>
        </div>
        <mobxReact.Observer>
          {() =>
            sale.map(({ price, scaleId }, i) => {
              const { name } = bigegi84Orm.obj.readOneById(scale, scaleId);
              const isEdit =
                gardenStore.form.supplySale.mode == "edit" &&
                gardenStore.form.supplySale.i == i;
              return (
                <div className="row-a" key={i}>
                  {isEdit ? (
                    <gardenSupplySale.action.form scale={scale} />
                  ) : (
                    <span>
                      {price}/{name}
                    </span>
                  )}
                  <div
                    style={bigegi84theme.styleCircle}
                    className="circle-a"
                    onClick={() => {
                      if (isEdit) {
                        gardenSupplySale.action.edit();
                      } else {
                        gardenStore.form.supplySale = {
                          mode: "edit",
                          iSupply,
                          i,
                          price,
                          scaleId,
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
              );
            })
          }
        </mobxReact.Observer>
      </div>
    );
  },
};
