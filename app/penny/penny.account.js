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
                pennyAccount.action.sort();
              }}
            >
              Simpan
            </button>
          </div>
        </div>
      );
    },
    list: () => {
      return (
        <mobxReact.Observer>
          {() => {
            return pennyStore.account.map(
              ([name, owner, balance, updatedAt], i) => {
                return (
                  <div key={i} className="column-a card-a">
                    {pennyStore.form.account[4] &&
                    pennyStore.form.account[5] == i ? (
                      <div className="row-a">
                        <div>
                          <input
                            type="text"
                            value={pennyStore.form.account[1]}
                            onChange={(e) =>
                              (pennyStore.form.account[1] = e.target.value)
                            }
                          />
                        </div>
                        -
                        <div>
                          <input
                            type="text"
                            value={pennyStore.form.account[0]}
                            onChange={(e) =>
                              (pennyStore.form.account[0] = e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <span>
                        {owner} - {name}
                      </span>
                    )}
                    {pennyStore.form.account[4] &&
                    pennyStore.form.account[5] == i ? (
                      <div className="row-a">
                        IDR
                        <div>
                          <input
                            type="text"
                            value={pennyStore.form.account[2]}
                            onChange={(e) =>
                              (pennyStore.form.account[2] = e.target.value)
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
                          if (pennyStore.form.account[4]) {
                            if (
                              !pennyAccount.action.validate(
                                pennyStore.form.account
                              )
                            )
                              return;
                            const [fname, fowner, fbalance, ,] =
                              pennyStore.form.account;
                            pennyStore.account[i] = [
                              ...[fname, fowner, parseFloat(fbalance)],
                              ...[moment().format()],
                            ];
                            pennyStore.form.account[4] = false;
                          } else {
                            pennyStore.form.account = [
                              ...[name, owner, parseFloat(balance), , true, i],
                            ];
                          }
                        }}
                      >
                        <i
                          className={
                            "fa-solid" +
                            (pennyStore.form.account[4] &&
                            pennyStore.form.account[5] == i
                              ? " fa-check"
                              : " fa-pen")
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
    sort: () => {
      pennyStore.account = pennyStore.account.sort(
        ([name, owner], [bname, bowner]) =>
          owner + name > bowner + bname
            ? 1
            : bowner + bname > owner + name
            ? -1
            : 0
      );
    },
    validate: ([name, owner, balance]) => {
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
