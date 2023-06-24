const pennyAccount = {
  action: {
    add: () => {
      if (!pennyAccount.action.validate()) return;
      const { name, owner, balance } = pennyStore.form.account;
      bigegi84Orm.obj.createOne(pennyStore.account, {
        name,
        owner,
        balance,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
      pennyStore.account = bigegi84Orm.obj.sort(pennyStore.account, "name");
      pennyStore.form.account = {
        mode: null,
        i: null,
        name: "",
        owner: "",
        balance: "",
      };
    },
    form: () => {
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
                  value={pennyStore.form.account.name}
                  onChange={(e) =>
                    (pennyStore.form.account.name = e.target.value)
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
                  value={pennyStore.form.account.owner}
                  onChange={(e) =>
                    (pennyStore.form.account.owner = e.target.value)
                  }
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
                  value={pennyStore.form.account.balance}
                  onChange={(e) =>
                    (pennyStore.form.account.balance = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => pennyAccount.action.add()}
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
            return pennyStore.account.map(
              ({ name, owner, balance, updatedAt }, i) => {
                const isEdit = (pennyStore.form.account.mode =
                  "edit" && pennyStore.form.account.i == i);
                return (
                  <div key={i} className="column-a card-a">
                    {isEdit ? (
                      <div className="row-a">
                        <div>
                          <input
                            type="text"
                            name="owner"
                            value={pennyStore.form.account.owner}
                            onChange={(e) =>
                              (pennyStore.form.account.owner = e.target.value)
                            }
                          />
                        </div>
                        -
                        <div>
                          <input
                            type="text"
                            name="name"
                            value={pennyStore.form.account.name}
                            onChange={(e) =>
                              (pennyStore.form.account.name = e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <span>
                        {owner} - {name}
                      </span>
                    )}
                    {isEdit ? (
                      <div className="row-a">
                        IDR
                        <div>
                          <input
                            type="text"
                            name="balance"
                            value={pennyStore.form.account.balance}
                            onChange={(e) =>
                              (pennyStore.form.account.balance = e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <span>
                        {pennyStore.show.balance
                          ? pennyAction.formatNumber(balance)
                          : "XXX"}
                      </span>
                    )}
                    <span>{moment(updatedAt).locale("id").fromNow()}</span>
                    <div className="row-a">
                      <div
                        style={bigegi84theme.styleCircle}
                        className="circle-a"
                        onClick={() => {
                          if (isEdit) {
                            pennyAccount.action.validate();
                            pennyStore.account[i] = {
                              name: pennyStore.form.account.name,
                              owner: pennyStore.form.account.owner,
                              balance: parseFloat(
                                pennyStore.form.account.balance
                              ),
                              updatedAt: moment().format(),
                            };
                            pennyStore.form.account = {
                              mode: null,
                              i: null,
                              name: "",
                              owner: "",
                              balance: 0,
                            };
                          } else {
                            pennyStore.form.account = {
                              mode: "edit",
                              i,
                              name,
                              owner,
                              balance,
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
                );
              }
            );
          }}
        </mobxReact.Observer>
      );
    },
    validate: () => {
      const { balance } = pennyStore.form.account;
      if (isNaN(parseFloat(balance))) {
        alert("Saldo salah!");
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
                <i className={"fa-solid" + (add ? " fa-minus" : " fa-plus")} />
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
