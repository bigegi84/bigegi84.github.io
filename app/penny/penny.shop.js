const pennyShop = {
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
                  value={pennyStore.form.shop.name}
                  onChange={(e) => (pennyStore.form.shop.name = e.target.value)}
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
                  value={pennyStore.form.shop.owner}
                  onChange={(e) =>
                    (pennyStore.form.shop.owner = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="cicilan" className={bigegi84theme.class.basic}>
                  Lokasi
                </label>
                <input
                  type="text"
                  id="cicilan"
                  name="cicilan"
                  className={bigegi84theme.class.inputText}
                  value={pennyStore.form.shop.location}
                  onChange={(e) =>
                    (pennyStore.form.shop.location = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="dueDate" className={bigegi84theme.class.basic}>
                  Link
                </label>
                <input
                  type="text"
                  id="dueDate"
                  name="dueDate"
                  className={bigegi84theme.class.inputText}
                  value={pennyStore.form.shop.link}
                  onChange={(e) => (pennyStore.form.shop.link = e.target.value)}
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => {
                    if (!pennyDebt.action.validate()) return;
                    const { name, owner, location, link } =
                      pennyStore.form.shop;
                    bigegi84Orm.obj.createOne(pennyStore.shop, {
                      name,
                      owner,
                      location,
                      link,
                      createdAt: moment().format(),
                      updatedAt: moment().format(),
                    });
                    pennyStore.form.shop = {
                      mode: null,
                      i: null,
                      name: "",
                      owner: "",
                      location: "",
                      link: "",
                    };
                    bigegi84Orm.obj.sort(pennyStore.shop, "name");
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
      pennyStore.shop.map(({ name, owner, location, link }, i) => (
        <div key={i} className="column-a card-a">
          <span>
            {name}-{location}
          </span>
          <span>{owner}</span>
        </div>
      ))
    ),
    sort: () => {
      pennyStore.shop = pennyStore.shop.sort(([name, owner], [bname, bowner]) =>
        owner + name > bowner + bname
          ? 1
          : bowner + bname > owner + name
          ? -1
          : 0
      );
    },
    validate: () => {
      const { name, owner, location, link } = pennyStore.form.shop;
      if (isNaN(parseFloat(installment))) {
        alert("Cicilan salah!");
        return false;
      }
      if (installmentLeft != "-" && isNaN(parseFloat(installmentLeft))) {
        alert("Sisa Cicilan salah!");
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
            Toko
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
            {add ? <pennyShop.action.addForm /> : null}
            <div className="row-a">
              <pennyShop.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
