const pennyInfo = {
  action: {
    balance: () => {
      const account = pennyStore.account.reduce(
        (partialSum, { balance }) => partialSum + balance,
        0
      );
      const assetBuy = pennyStore.asset.reduce(
        (partialSum, { buyPrice }) => partialSum + parseFloat(buyPrice),
        0
      );
      const assetSell = pennyStore.asset.reduce(
        (partialSum, { sellPrice }) => partialSum + parseFloat(sellPrice),
        0
      );
      const debt = pennyStore.debt.reduce(
        (partialSum, { installment, installmentLeft }) =>
          partialSum + installment * installmentLeft,
        0
      );
      const total = account + assetSell + debt;
      return (
        <mobxReact.Observer>
          {() => {
            return (
              <div className="column-a card-a">
                <strong className={bigegi84theme.class.basic}>Ringkasan</strong>
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
                  </div>
                  <div className="row-a">
                    <strong className={bigegi84theme.class.basic}>
                      Utang:
                    </strong>
                    <span>
                      {pennyStore.show.balance
                        ? pennyAction.formatNumber(debt)
                        : "XXX"}
                    </span>
                  </div>
                  <div className="row-a">
                    <strong className={bigegi84theme.class.basic}>
                      Total:
                    </strong>
                    <span>
                      {pennyStore.show.balance
                        ? pennyAction.formatNumber(total)
                        : "XXX"}
                    </span>
                  </div>
                </div>
              </div>
            );
          }}
        </mobxReact.Observer>
      );
    },
    decision: {
      budget: () => {
        return (
          <mobxReact.Observer>
            {() => {
              const account = pennyStore.account.reduce(
                (partialSum, { name, balance }) =>
                  partialSum + (name == "BPJSTK" ? 0 : balance),
                0
              );
              const today = moment();
              const nextMonth = moment().add(
                parseInt(moment().format("DD")) < pennyStore.config.payday - 1
                  ? 0
                  : 1,
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
                  <strong className={bigegi84theme.class.basic}>
                    Anggaran
                  </strong>
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
                    <div className="column-b">
                      <span>Jarak Ke Hari Gajian</span>
                      <span>{dayLeftToPayday} hari</span>
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
        <mobxReact.Observer>
          {() => (
            <div className="column-a card-a">
              <strong className={bigegi84theme.class.basic}>
                Kewajiban Bulanan
              </strong>
              <div className="row-a">
                <strong className={bigegi84theme.class.basic}>Total:</strong>
                <span>
                  {pennyStore.show.balance
                    ? pennyAction.formatNumber(
                        pennyStore.debt.reduce(
                          (partialSum, { installment }) =>
                            partialSum + installment,
                          0
                        )
                      )
                    : "XXX"}
                </span>
              </div>
            </div>
          )}
        </mobxReact.Observer>
      );
    },
    summary: {
      account: () => (
        <mobxReact.Observer>
          {() => (
            <div className="column-a card-a">
              <strong className={bigegi84theme.class.basic}>
                Ringkasan Akun
              </strong>
              <div className="column-a">
                {pennyStore.account.map(({ name, owner, balance }, i) => (
                  <div key={i} className="column-b">
                    <span>
                      {owner} - {name}
                    </span>
                    <span>{pennyAction.formatNumber(balance)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </mobxReact.Observer>
      ),
      debt: () => (
        <mobxReact.Observer>
          {() => (
            <div className="column-a card-a">
              <strong className={bigegi84theme.class.basic}>
                Ringkasan Utang
              </strong>
              <div className="column-a">
                {pennyStore.debt.map(
                  ({ name, owner, installment, installmentLeft }, i) => (
                    <div key={i} className="column-b">
                      <span>
                        {owner} - {name}
                      </span>
                      <span>
                        {pennyAction.formatNumber(
                          installment * installmentLeft
                        )}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </mobxReact.Observer>
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
              <pennyInfo.action.balance />
              <pennyInfo.action.obligation />
              <pennyInfo.action.summary.account />
              <pennyInfo.action.summary.debt />
              <pennyInfo.action.decision.budget />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
