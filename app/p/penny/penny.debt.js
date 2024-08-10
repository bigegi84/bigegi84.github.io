const pennyDebt = {
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
                  value={pennyStore.form.debt.name}
                  onChange={(e) => (pennyStore.form.debt.name = e.target.value)}
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
                  value={pennyStore.form.debt.owner}
                  onChange={(e) =>
                    (pennyStore.form.debt.owner = e.target.value)
                  }
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
                  value={pennyStore.form.debt.installment}
                  onChange={(e) =>
                    (pennyStore.form.debt.installment = e.target.value)
                  }
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
                  value={pennyStore.form.debt.dueDate}
                  onChange={(e) =>
                    (pennyStore.form.debt.dueDate = e.target.value)
                  }
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
                  value={pennyStore.form.debt.installmentLeft}
                  onChange={(e) =>
                    (pennyStore.form.debt.installmentLeft = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => {
                    if (!pennyDebt.action.validate()) return;
                    const {
                      name,
                      owner,
                      installment,
                      dueDate,
                      installmentLeft,
                    } = pennyStore.form.debt;
                    bigegi84Orm.obj.createOne(pennyStore.debt, {
                      name,
                      owner,
                      installment: parseFloat(installment),
                      dueDate: parseFloat(dueDate),
                      installmentLeft: parseFloat(installmentLeft),
                      createdAt: moment().format(),
                      updatedAt: moment().format(),
                    });
                    pennyStore.form.debt = {
                      mode: null,
                      i: null,
                      name: "",
                      owner: "",
                      installment: 0,
                      dueDate: "-",
                      installmentLeft: 0,
                    };
                    bigegi84Orm.obj.sort(pennyStore.debt, "name");
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
    edit: () => {
      const { name, owner, installment, dueDate, installmentLeft } =
        pennyStore.form.debt;
      pennyStore.debt[pennyStore.form.debt.i] = {
        ...pennyStore.debt[pennyStore.form.debt.i],
        ...{
          name,
          owner,
          installment: parseFloat(installment),
          dueDate: parseFloat(dueDate),
          installmentLeft: parseFloat(installmentLeft),
        },
      };
      pennyStore.form.debt = {
        mode: null,
        i: null,
        name: "",
        owner: "",
        installment: 0,
        dueDate: "-",
        installmentLeft: 0,
      };
    },
    list: mobxReact.observer(() => {
      return pennyStore.debt.map(
        ({ id, name, owner, installment, dueDate, installmentLeft }, debtI) => {
          const isEdit =
            pennyStore.form.debt.mode == "edit" &&
            pennyStore.form.debt.i == debtI;
          return (
            <div key={debtI} className="column-a card-a">
              <bigegi84View.letsRock
                column={{
                  buttonSmallHapus: () => {
                    bigegi84Orm.obj.deleteOne(pennyStore.debt, id);
                  },
                }}
              />
              <div className="row-a">
                {isEdit ? (
                  <bigegi84View.letsRock
                    column={{
                      inputTextNama: [
                        pennyStore.form.debt.name,
                        (e) => (pennyStore.form.debt.name = e),
                      ],
                      inputTextCicilan: [
                        pennyStore.form.debt.installment,
                        (e) => (pennyStore.form.debt.installment = e),
                      ],
                      "inputTextTanggal Jatuh Tempo": [
                        pennyStore.form.debt.dueDate,
                        (e) => (pennyStore.form.debt.dueDate = e),
                      ],
                      "inputTextSisa Cicilan": [
                        pennyStore.form.debt.installmentLeft,
                        (e) => (pennyStore.form.debt.installmentLeft = e),
                      ],
                    }}
                  />
                ) : (
                  <div className="column-a">
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
                      Tanggal Jatuh Tempo:{" "}
                      {pennyStore.show.balance ? dueDate : "XXX"}
                    </span>
                    <span>
                      Sisa Cicilan :{" "}
                      {pennyStore.show.balance ? installmentLeft + "x" : "XXX"}
                    </span>
                    <span>
                      Total:{" "}
                      {pennyStore.show.balance
                        ? pennyAction.formatNumber(
                            installment * installmentLeft
                          )
                        : "XXX"}
                    </span>
                  </div>
                )}
                <div className="row-a">
                  <div
                    style={bigegi84theme.styleCircle}
                    className="circle-a"
                    onClick={() => {
                      if (isEdit) {
                        pennyDebt.action.edit();
                      } else {
                        pennyStore.form.debt = {
                          mode: "edit",
                          i: debtI,
                          id,
                          name,
                          owner,
                          installment,
                          dueDate,
                          installmentLeft,
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
              </div>
            </div>
          );
        }
      );
    }),
    sort: () => {
      pennyStore.debt = pennyStore.debt.sort(([name, owner], [bname, bowner]) =>
        owner + name > bowner + bname
          ? 1
          : bowner + bname > owner + name
          ? -1
          : 0
      );
    },
    validate: () => {
      const { name, owner, installment, dueDate, installmentLeft } =
        pennyStore.form.debt;
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
            {add ? <pennyDebt.action.addForm /> : null}
            <div className="row-a">
              <pennyDebt.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
