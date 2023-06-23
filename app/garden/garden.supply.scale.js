const gardenSupplyScale = {
  action: {
    add: () => {
      if (!gardenSupplyScale.action.validate()) return;
      const { iSupply, name, ratio } = gardenStore.form.supplyScale;
      const { scale } = gardenStore.supply[iSupply];
      gardenStore.supply[iSupply].scale = bigegi84Orm.obj.createOne(scale, {
        name,
        ratio: parseFloat(ratio),
      });
      gardenStore.form.supplyScale = {
        mode: null,
        iSupply: null,
        i: null,
        name: "",
        ratio: 0,
      };
    },
    edit: () => {
      if (!gardenSupplyScale.action.validate()) return;
      const { iSupply, i, price } = gardenStore.form.supplyScale;
      gardenStore.supply[iSupply].sale[i].price = parseFloat(price);
      gardenStore.form.supplyScale = {
        mode: null,
        iSupply: null,
        i: null,
        price: "",
        scaleId: "",
      };
    },
    form: ({ iSupply }) => {
      return (
        <mobxReact.Observer>
          {() => {
            const isAdd =
              gardenStore.form.supplyScale.mode == "add" &&
              gardenStore.form.supplyScale.iSupply == iSupply;
            return isAdd ? (
              <div>
                <input
                  value={gardenStore.form.supplyScale.name}
                  onChange={(e) =>
                    (gardenStore.form.supplyScale.name = e.target.value)
                  }
                />
                <input
                  value={gardenStore.form.supplyScale.ratio}
                  onChange={(e) =>
                    (gardenStore.form.supplyScale.ratio = e.target.value)
                  }
                />
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => gardenSupplyScale.action.add()}
                >
                  Simpan
                </button>
              </div>
            ) : null;
          }}
        </mobxReact.Observer>
      );
    },
    validate: () => {
      const { name, ratio } = gardenStore.form.supplyScale;
      if (name == "") {
        alert("Nama salah!");
        return false;
      }
      if (isNaN(parseFloat(ratio))) {
        alert("Rasio salah!");
        return false;
      }
      return true;
    },
  },
  view: ({ iSupply }) => {
    const { scale } = gardenStore.supply[iSupply];
    return (
      <div className="column-a card-a">
        <div className="row-a">
          <span>Skala:</span>
          <div className="row-a">
            <mobxReact.Observer>
              {() => {
                const isAdd =
                  gardenStore.form.supplyScale.mode == "add" &&
                  gardenStore.form.supplyScale.iSupply == iSupply;
                return (
                  <div
                    style={bigegi84theme.styleCircle}
                    className="circle-a"
                    onClick={() => {
                      gardenStore.form.supplyScale = {
                        mode:
                          gardenStore.form.supplyScale.mode == "add"
                            ? null
                            : "add",
                        iSupply,
                        i: null,
                        name: "",
                        ratio: "",
                      };
                    }}
                  >
                    <i
                      className={
                        "fa-solid" + (isAdd ? " fa-minus" : " fa-plus")
                      }
                    />
                  </div>
                );
              }}
            </mobxReact.Observer>
          </div>
        </div>
        <gardenSupplyScale.action.form iSupply={iSupply} />
        <mobxReact.Observer>
          {() =>
            scale.map(({ name, ratio }, i) => {
              const isEdit =
                gardenStore.form.supplyScale.mode == "edit" &&
                gardenStore.form.supplyScale.i == i;
              return (
                <div className="row-a" key={i}>
                  {isEdit ? (
                    <gardenSupplyScale.action.form scale={scale} />
                  ) : (
                    <span>
                      {name} ({ratio})
                    </span>
                  )}
                  <div
                    style={bigegi84theme.styleCircle}
                    className="circle-a"
                    onClick={() => {
                      if (isEdit) {
                        gardenSupplyScale.action.edit();
                      } else {
                        gardenStore.form.supplyScale = {
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
