const pennyInvestForecast = {
  action: {
    add: () => {
      if (!pennyInvestForecast.action.validate()) return;
      const { name, owner, balance } = pennyStore.form.investForecast;
      bigegi84Orm.obj.createOne(pennyStore.investForecast, {
        name,
        owner,
        balance,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
      pennyStore.investForecast = bigegi84Orm.obj.sort(
        pennyStore.investForecast,
        "name"
      );
      pennyStore.form.investForecast = {
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
                  value={pennyStore.form.investForecast.name}
                  onChange={(e) =>
                    (pennyStore.form.investForecast.name = e.target.value)
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
                  value={pennyStore.form.investForecast.owner}
                  onChange={(e) =>
                    (pennyStore.form.investForecast.owner = e.target.value)
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
                  value={pennyStore.form.investForecast.balance}
                  onChange={(e) =>
                    (pennyStore.form.investForecast.balance = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => pennyInvestForecast.action.add()}
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
            return (
              <div className="row-a">
                {[{ period: 5, periodUnit: "year" }].map(
                  ({ period, periodUnit }, i) => {
                    let day = 0;
                    if (periodUnit == "year") day = period * 365;
                    let totalInterest = 0;
                    let balance = pennyStore.config.investForecast.balance;
                    for (let i = 0; i < day; i++) {
                      const interest = parseInt((balance * 4) / 100 / 365);
                      totalInterest += interest;
                      balance += interest;
                    }
                    return (
                      <div key={i} className="column-a card-a">
                        <span>
                          {period} {periodUnit.replace("year", "Tahun")}
                        </span>
                        <span>
                          Saldo Awal{" "}
                          {pennyAction.formatNumber(
                            pennyStore.config.investForecast.balance
                          )}
                        </span>
                        <span>
                          Saldo Akhir {pennyAction.formatNumber(balance)}
                        </span>
                        <span>
                          Keuntungan Total{" "}
                          {pennyAction.formatNumber(totalInterest)}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            );
          }}
        </mobxReact.Observer>
      );
    },
    validate: () => {
      const { balance } = pennyStore.form.investForecast;
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
            Ramalan Investasi
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
            {add ? <pennyInvestForecast.action.form /> : null}
            <pennyInvestForecast.action.list />
          </div>
        ) : null}
      </div>
    );
  },
};
