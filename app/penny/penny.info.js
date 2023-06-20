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
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
