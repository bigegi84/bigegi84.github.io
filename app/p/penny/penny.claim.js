const pennyClaim = {
    action: {
      form: () => {
        const [form, setForm] = React.useState(["", "", 0.0, 0.0]);
        const [fName, fOwner, priceBuy, priceSell] = form;
        return (
          <div className="column-a">
            <label htmlFor="name" className={bigegi84theme.class.basic}>
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={bigegi84theme.class.inputText}
              value={fName}
              onChange={(e) => {
                const newState = [...form];
                newState[0] = e.target.value;
                setForm(newState);
              }}
            />
            <label htmlFor="owner" className={bigegi84theme.class.basic}>
              Pemilik
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              className={bigegi84theme.class.inputText}
              value={fOwner}
              onChange={(e) => {
                const newState = [...form];
                newState[1] = e.target.value;
                setForm(newState);
              }}
            />
            <label htmlFor="priceBuy" className={bigegi84theme.class.basic}>
              Beli
            </label>
            <input
              type="text"
              id="priceBuy"
              name="priceBuy"
              className={bigegi84theme.class.inputText}
              value={priceBuy}
              onChange={(e) => {
                const newState = [...form];
                newState[2] = e.target.value;
                setForm(newState);
              }}
            />
            <label htmlFor="priceSell" className={bigegi84theme.class.basic}>
              Jual
            </label>
            <input
              type="text"
              id="priceSell"
              name="priceSell"
              className={bigegi84theme.class.inputText}
              value={priceSell}
              onChange={(e) => {
                const newState = [...form];
                newState[3] = e.target.value;
                setForm(newState);
              }}
            />
            <button
              className={bigegi84theme.class.button}
              onClick={() => {
                pennyStore.asset.push(form);
                setForm(["", "", 0.0, 0.0]);
              }}
            >
              Simpan
            </button>
          </div>
        );
      },
      list: mobxReact.observer(() =>
        pennyStore.asset.map(([name, owner, priceBuy, priceSell], i) => (
          <div key={i} className="column-a card-a">
            <span>
              {owner} - {name}
            </span>
            <span>
              Beli:{" "}
              {pennyStore.show.balance
                ? pennyAction.formatNumber(priceBuy)
                : "XXX"}
            </span>
            <span>
              Jual:{" "}
              {pennyStore.show.balance
                ? pennyAction.formatNumber(priceSell)
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
              Piutang
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
                  <i className={"fa-solid fa-plus"} />
                </div>
              </div>
              {add ? <pennyAsset.action.form /> : null}
              <div className="row-a">
                <pennyAsset.action.list />
              </div>
            </div>
          ) : null}
        </div>
      );
    },
  };
  