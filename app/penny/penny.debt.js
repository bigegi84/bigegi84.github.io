const pennyDebt = {
  action: {
    form: () => {
      const [form, setForm] = React.useState(["", "", 0.0, "-"]);
      const [name, owner, installment, dueDate, installmentRemaining] = form;
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
            <label htmlFor="cicilan" className={bigegi84theme.class.basic}>
              Cicilan
            </label>
            <input
              type="text"
              id="cicilan"
              name="cicilan"
              className={bigegi84theme.class.inputText}
              value={installment}
              onChange={(e) => {
                const newState = [...form];
                newState[2] = e.target.value;
                setForm(newState);
              }}
            />
          </div>
          <div className="column-a">
            <label htmlFor="dueDate" className={bigegi84theme.class.basic}>
              Tenggat Waktu
            </label>
            <input
              type="text"
              id="dueDate"
              name="dueDate"
              className={bigegi84theme.class.inputText}
              value={dueDate}
              onChange={(e) => {
                const newState = [...form];
                newState[3] = e.target.value;
                setForm(newState);
              }}
            />
          </div>
          <div className="column-a">
            <label
              htmlFor="installmentRemaining"
              className={bigegi84theme.class.basic}
            >
              Sisa Cicilan
            </label>
            <input
              type="text"
              id="installmentRemaining"
              name="installmentRemaining"
              className={bigegi84theme.class.inputText}
              value={installmentRemaining}
              onChange={(e) => {
                const newState = [...form];
                newState[4] = e.target.value;
                setForm(newState);
              }}
            />
          </div>
          <div className="column-a">
            <button
              className={bigegi84theme.class.button}
              onClick={() => {
                if (!pennyDebt.action.validate(form)) return;
                pennyStore.debt.push([
                  name,
                  owner,
                  -parseFloat(installment),
                  parseFloat(dueDate),
                  parseFloat(installmentRemaining),
                ]);
                setForm(["", "", 0.0, "-", 0.0]);
                pennyDebt.action.sort();
              }}
            >
              Simpan
            </button>
          </div>
        </div>
      );
    },
    list: mobxReact.observer(() =>
      pennyStore.debt.map(
        (
          [name, owner, installment, dueDate, installmentRemaining, total],
          i
        ) => (
          <div key={i} className="column-a card-a">
            <span>
              {owner} - {name}
            </span>
            <span>
              Cicilan:{" "}
              {pennyStore.show.balance
                ? pennyAction.formatNumber(installment)
                : "XXX"}
            </span>
            <span>
              Tanggal Jatuh Tempo: {pennyStore.show.balance ? dueDate : "XXX"}
            </span>
            <span>
              Sisa Cicilan :{" "}
              {pennyStore.show.balance ? installmentRemaining + "x" : "XXX"}
            </span>
            <span>
              Total:{" "}
              {pennyStore.show.balance
                ? pennyAction.formatNumber(installment * installmentRemaining)
                : "XXX"}
            </span>
          </div>
        )
      )
    ),
    sort: () => {
      pennyStore.debt = pennyStore.debt.sort(([name, owner], [bname, bowner]) =>
        owner + name > bowner + bname
          ? 1
          : bowner + bname > owner + name
          ? -1
          : 0
      );
    },
    validate: ([name, owner, installment, dueDate, installmentRemaining]) => {
      if (isNaN(parseFloat(installment))) {
        alert("Cicilan salah!");
        return false;
      }
      if (
        installmentRemaining != "-" &&
        isNaN(parseFloat(installmentRemaining))
      ) {
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
            Utang
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
            {add ? <pennyDebt.action.form /> : null}
            <div className="row-a">
              <pennyDebt.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
