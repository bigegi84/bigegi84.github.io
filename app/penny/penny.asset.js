const pennyAsset = {
  action: {
    addForm: () => {
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
                  value={pennyStore.form.asset.name}
                  onChange={(e) =>
                    (pennyStore.form.asset.name = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="owner" className={bigegi84theme.class.basic}>
                  Pemilik
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  className={bigegi84theme.class.inputText}
                  value={pennyStore.form.asset.owner}
                  onChange={(e) =>
                    (pennyStore.form.asset.owner = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="priceBuy" className={bigegi84theme.class.basic}>
                  Beli
                </label>
                <input
                  type="text"
                  id="priceBuy"
                  name="priceBuy"
                  className={bigegi84theme.class.inputText}
                  value={pennyStore.form.asset.buyPrice}
                  onChange={(e) =>
                    (pennyStore.form.asset.buyPrice = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label
                  htmlFor="priceSell"
                  className={bigegi84theme.class.basic}
                >
                  Jual
                </label>
                <input
                  type="text"
                  id="priceSell"
                  name="priceSell"
                  className={bigegi84theme.class.inputText}
                  value={pennyStore.form.asset.sellPrice}
                  onChange={(e) =>
                    (pennyStore.form.asset.sellPrice = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => {
                    const { name, owner, buyPrice, sellPrice } =
                      pennyStore.form.asset;
                    bigegi84Orm.obj.createOne(pennyStore.asset, {
                      name,
                      owner,
                      buyPrice,
                      sellPrice,
                      createdAt: moment().format(),
                      updatedAt: moment().format(),
                    });
                    pennyStore.form.asset = {
                      mode: null,
                      i: null,
                      name: "",
                      owner: "",
                      buyPrice: 0,
                      sellPrice: 0,
                    };
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
    list: mobxReact.observer(() =>
      pennyStore.asset.map(({ name, owner, buyPrice, sellPrice }, i) => (
        <div key={i} className="column-a card-a">
          <span>
            {owner} - {name}
          </span>
          <span>
            Beli:{" "}
            {pennyStore.show.balance
              ? pennyAction.formatNumber(buyPrice)
              : "XXX"}
          </span>
          <span>
            Jual:{" "}
            {pennyStore.show.balance
              ? pennyAction.formatNumber(sellPrice)
              : "XXX"}
          </span>
        </div>
      ))
    ),
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
            Aset
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
            {add ? <pennyAsset.action.addForm /> : null}
            <div className="row-a">
              <pennyAsset.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
