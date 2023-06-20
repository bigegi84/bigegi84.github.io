const pennyAccount = {
  action: {
    form: () => {
      const [form, setForm] = React.useState(["", "", 0.0]);
      const [name, owner, balance] = form;
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
              value={name}
              onChange={(e) => {
                const newState = [...form];
                newState[0] = e.target.value;
                setForm(newState);
              }}
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
              value={owner}
              onChange={(e) => {
                const newState = [...form];
                newState[1] = e.target.value;
                setForm(newState);
              }}
            />
          </div>
          <div className="column-a">
            <label htmlFor="balance" className={bigegi84theme.class.basic}>
              Balance
            </label>
            <input
              type="text"
              id="balance"
              name="balance"
              className={bigegi84theme.class.inputText}
              value={balance}
              onChange={(e) => {
                const newState = [...form];
                newState[2] = e.target.value;
                setForm(newState);
              }}
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
              }}
            >
              Simpan
            </button>
          </div>
        </div>
      );
    },
    list: mobxReact.observer(() =>
      pennyStore.account.map(([name, owner, balance], i) => (
        <div key={i} className="column-a card-a">
          <span>
            {owner} - {name}
          </span>
          <span>
            {pennyStore.show.balance
              ? pennyAction.formatNumber(balance)
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
            Akun
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
            {add ? <pennyAccount.action.form /> : null}
            <div className="row-a">
              <pennyAccount.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
