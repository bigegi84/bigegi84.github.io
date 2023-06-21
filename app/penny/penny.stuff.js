const pennyStuff = {
  action: {
    form: () => {
      return (
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
              value={pennyStore.form.stuff[2]}
              onChange={(e) => (pennyStore.form.stuff[2] = e.target.value)}
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
              value={pennyStore.form.stuff[3]}
              onChange={(e) => (pennyStore.form.stuff[3] = e.target.value)}
            />
          </div>
          <div className="column-a">
            <label htmlFor="balance" className={bigegi84theme.class.basic}>
              Jumlah
            </label>
            <input
              type="text"
              id="balance"
              name="balance"
              className={bigegi84theme.class.inputText}
              value={pennyStore.form.stuff[4]}
              onChange={(e) => (pennyStore.form.stuff[4] = e.target.value)}
            />
          </div>
          <div className="column-a">
            <label htmlFor="balance" className={bigegi84theme.class.basic}>
              Satuan
            </label>
            <input
              type="text"
              id="balance"
              name="balance"
              className={bigegi84theme.class.inputText}
              value={pennyStore.form.stuff[5]}
              onChange={(e) => (pennyStore.form.stuff[5] = e.target.value)}
            />
          </div>
          <div className="column-a">
            <button
              className={bigegi84theme.class.button}
              onClick={() => {
                if (isNaN(parseFloat(balance))) {
                  alert("Saldo salah!");
                  return;
                }
                pennyStore.account.push([
                  ...[name, owner, parseFloat(balance)],
                  ...[moment().format()],
                ]);
                setForm(["", "", 0.0]);
                pennyAccount.action.sort();
              }}
            >
              Simpan
            </button>
          </div>
        </div>
      );
    },
    list: () => {},
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
            Barang
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
            {add ? <pennyStuff.action.form /> : null}
            <div className="row-a">
              <pennyAsset.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
