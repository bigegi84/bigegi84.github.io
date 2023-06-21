const pennyInfo = {
  action: {
    balance: () => {
      const account = pennyStore.account.reduce(
        (partialSum, [, , balance]) => partialSum + balance,
        0
      );
      const assetBuy = pennyStore.asset.reduce(
        (partialSum, [, , buy]) => partialSum + parseFloat(buy),
        0
      );
      const assetSell = pennyStore.asset.reduce(
        (partialSum, [, , , sell]) => partialSum + parseFloat(sell),
        0
      );
      const debt = pennyStore.debt.reduce(
        (partialSum, [, , installment, , installmentRemaining]) =>
          partialSum + installment * installmentRemaining,
        0
      );
      const total = account + assetSell + debt;
      return (
        <div className="column-a">
          <div className="row-a">
            <strong className={bigegi84theme.class.basic}>Akun:</strong>
            <mobxReact.Observer>
              {() => (
                <span>
                  {pennyStore.show.balance
                    ? pennyAction.formatNumber(account)
                    : "XXX"}
                </span>
              )}
            </mobxReact.Observer>
          </div>
          <div className="row-a">
            <strong className={bigegi84theme.class.basic}>Aset:</strong>
            <mobxReact.Observer>
              {() => (
                <div className="column-a">
                  <span>
                    {pennyStore.show.balance
                      ? `${pennyAction.formatNumber(assetBuy)}(beli)`
                      : "XXX"}
                  </span>
                  <span>
                    {pennyStore.show.balance
                      ? `${pennyAction.formatNumber(assetSell)}(jual)`
                      : "XXX"}
                  </span>
                </div>
              )}
            </mobxReact.Observer>
          </div>
          <div className="row-a">
            <strong className={bigegi84theme.class.basic}>Utang:</strong>
            <mobxReact.Observer>
              {() => (
                <span>
                  {pennyStore.show.balance
                    ? pennyAction.formatNumber(debt)
                    : "XXX"}
                </span>
              )}
            </mobxReact.Observer>
          </div>
          <div className="row-a">
            <strong className={bigegi84theme.class.basic}>Total:</strong>
            <mobxReact.Observer>
              {() => (
                <span>
                  {pennyStore.show.balance
                    ? pennyAction.formatNumber(total)
                    : "XXX"}
                </span>
              )}
            </mobxReact.Observer>
          </div>
        </div>
      );
    },
    decision: {
      budget: () => {
        return (
          <mobxReact.Observer>
            {() => {
              const account = pennyStore.account.reduce(
                (partialSum, [name, , balance]) =>
                  partialSum + (name == "BPJSTK" ? 0 : balance),
                0
              );
              const today = moment();
              const nextMonth = moment().add(
                moment().format("MM") < pennyStore.config.payday ? 0 : 1,
                "M"
              );
              const nextPayday = moment(
                `${nextMonth.format("YYYY")}-${nextMonth.format("MM")}-${
                  pennyStore.config.payday
                }`
              );
              const dayLeftToPayday = nextPayday.diff(today, "days");
              return (
                <div className="column-a card-a">
                  <strong className={bigegi84theme.class.basic}>Budget</strong>
                  <div className="column-a">
                    <div className="column-b">
                      <span>Per Hari</span>
                      <span>
                        {pennyAction.formatNumber(account / dayLeftToPayday)}
                      </span>
                    </div>
                    <div className="column-b">
                      <span>Gajian Selanjutnya</span>
                      <span>{nextPayday.format("DD-MM-YYYY")}</span>
                    </div>
                  </div>
                </div>
              );
            }}
          </mobxReact.Observer>
        );
      },
    },
    obligation: () => {
      return (
        <div className="row-a">
          <strong className={bigegi84theme.class.basic}>Total:</strong>
          <mobxReact.Observer>
            {() => (
              <span>
                {pennyStore.show.balance
                  ? pennyAction.formatNumber(
                      pennyStore.debt.reduce(
                        (partialSum, [, , balance]) => partialSum + balance,
                        0
                      )
                    )
                  : "XXX"}
              </span>
            )}
          </mobxReact.Observer>
        </div>
      );
    },
    summary: {
      account: () => (
        <div className="column-a">
          {pennyStore.account.map(([name, owner, balance], i) => (
            <div key={i} className="column-b">
              <span>
                {owner} - {name}
              </span>
              <span>{pennyAction.formatNumber(balance)}</span>
            </div>
          ))}
        </div>
      ),
      debt: () => (
        <div className="column-a">
          {pennyStore.debt.map(([name, owner, balance, , total], i) => (
            <div key={i} className="column-b">
              <span>
                {owner} - {name}
              </span>
              <span>{pennyAction.formatNumber(balance * total)}</span>
            </div>
          ))}
        </div>
      ),
    },
  },
  view: () => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            Info
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
          <div className={bigegi84theme.class.basic + " column-a card-a"}>
            <mobxReact.Observer>
              {() => (
                <strong className={bigegi84theme.class.basic}>
                  {pennyStore.info.name}
                </strong>
              )}
            </mobxReact.Observer>
            <div className="row-a">
              <mobxReact.Observer>
                {() => (
                  <div className="column-a card-a">
                    <strong className={bigegi84theme.class.basic}>
                      Ringkasan
                    </strong>
                    <pennyInfo.action.balance />
                  </div>
                )}
              </mobxReact.Observer>
              <mobxReact.Observer>
                {() => (
                  <div className="column-a card-a">
                    <strong className={bigegi84theme.class.basic}>
                      Kewajiban Bulanan
                    </strong>
                    <pennyInfo.action.obligation />
                  </div>
                )}
              </mobxReact.Observer>
              <mobxReact.Observer>
                {() => (
                  <div className="column-a card-a">
                    <strong className={bigegi84theme.class.basic}>
                      Ringkasan Akun
                    </strong>
                    <pennyInfo.action.summary.account />
                  </div>
                )}
              </mobxReact.Observer>
              <mobxReact.Observer>
                {() => (
                  <div className="column-a card-a">
                    <strong className={bigegi84theme.class.basic}>
                      Ringkasan Utang
                    </strong>
                    <pennyInfo.action.summary.debt />
                  </div>
                )}
              </mobxReact.Observer>
              <pennyInfo.action.decision.budget />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
