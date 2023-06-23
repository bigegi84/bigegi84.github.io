const gardenInfo = {
  action: {
    balance: () => {
      const account = gardenStore.account.reduce(
        (partialSum, [, , balance]) => partialSum + balance,
        0
      );
      const assetBuy = gardenStore.asset.reduce(
        (partialSum, [, , buy]) => partialSum + parseFloat(buy),
        0
      );
      const assetSell = gardenStore.asset.reduce(
        (partialSum, [, , , sell]) => partialSum + parseFloat(sell),
        0
      );
      const debt = gardenStore.debt.reduce(
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
                  {gardenStore.show.balance
                    ? gardenAction.formatNumber(account)
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
                    {gardenStore.show.balance
                      ? `${gardenAction.formatNumber(assetBuy)}(beli)`
                      : "XXX"}
                  </span>
                  <span>
                    {gardenStore.show.balance
                      ? `${gardenAction.formatNumber(assetSell)}(jual)`
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
                  {gardenStore.show.balance
                    ? gardenAction.formatNumber(debt)
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
                  {gardenStore.show.balance
                    ? gardenAction.formatNumber(total)
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
              const account = gardenStore.account.reduce(
                (partialSum, [name, , balance]) =>
                  partialSum + (name == "BPJSTK" ? 0 : balance),
                0
              );
              const today = moment();
              const nextMonth = moment().add(
                moment().format("MM") < gardenStore.config.payday ? 0 : 1,
                "M"
              );
              const nextPayday = moment(
                `${nextMonth.format("YYYY")}-${nextMonth.format("MM")}-${
                  gardenStore.config.payday
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
                        {gardenAction.formatNumber(account / dayLeftToPayday)}
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
        <div className="row-a">
          <strong className={bigegi84theme.class.basic}>Total:</strong>
          <mobxReact.Observer>
            {() => (
              <span>
                {gardenStore.show.balance
                  ? gardenAction.formatNumber(
                      gardenStore.debt.reduce(
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
          {gardenStore.account.map(([name, owner, balance], i) => (
            <div key={i} className="column-b">
              <span>
                {owner} - {name}
              </span>
              <span>{gardenAction.formatNumber(balance)}</span>
            </div>
          ))}
        </div>
      ),
      debt: () => (
        <div className="column-a">
          {gardenStore.debt.map(([name, owner, balance, , total], i) => (
            <div key={i} className="column-b">
              <span>
                {owner} - {name}
              </span>
              <span>{gardenAction.formatNumber(balance * total)}</span>
            </div>
          ))}
        </div>
      ),
      profit: () => {
        return (
          <mobxReact.Observer>
            {() => {
              const count =
                gardenStore.purchase.length + gardenStore.sale.length;
              const total =
                gardenStore.purchase.reduce(
                  (partialSum, { price }) => partialSum + price,
                  0
                ) +
                gardenStore.sale.reduce(
                  (partialSum, { price }) => partialSum + price,
                  0
                );
              return (
                <div className="column-a card-a">
                  <strong className={bigegi84theme.class.basic}>
                    Keuntungan
                  </strong>
                  <div className="column-a">
                    <div className="column-b">
                      <span>Jumlah</span>
                      <span>{count}</span>
                    </div>
                    <div className="column-b">
                      <span>Total</span>
                      <span>{gardenAction.formatNumber(total)}</span>
                    </div>
                  </div>
                </div>
              );
            }}
          </mobxReact.Observer>
        );
      },
      purchase: () => {
        return (
          <mobxReact.Observer>
            {() => {
              const count = gardenStore.purchase.length;
              const total = gardenStore.purchase.reduce(
                (partialSum, { price }) => partialSum + price,
                0
              );
              return (
                <div className="column-a card-a">
                  <strong className={bigegi84theme.class.basic}>Beli</strong>
                  <div className="column-a">
                    <div className="column-b">
                      <span>Jumlah</span>
                      <span>{count}</span>
                    </div>
                    <div className="column-b">
                      <span>Total</span>
                      <span>{gardenAction.formatNumber(total)}</span>
                    </div>
                  </div>
                </div>
              );
            }}
          </mobxReact.Observer>
        );
      },
      sale: () => {
        return (
          <mobxReact.Observer>
            {() => {
              const count = gardenStore.sale.length;
              const total = gardenStore.sale.reduce(
                (partialSum, { price }) => partialSum + price,
                0
              );
              return (
                <div className="column-a card-a">
                  <strong className={bigegi84theme.class.basic}>Jual</strong>
                  <div className="column-a">
                    <div className="column-b">
                      <span>Jumlah</span>
                      <span>{count}</span>
                    </div>
                    <div className="column-b">
                      <span>Total</span>
                      <span>{gardenAction.formatNumber(total)}</span>
                    </div>
                  </div>
                </div>
              );
            }}
          </mobxReact.Observer>
        );
      },
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
                  {gardenStore.info.name}
                </strong>
              )}
            </mobxReact.Observer>
            <div className="row-a">
              <gardenInfo.action.summary.purchase />
              <gardenInfo.action.summary.sale />
              <gardenInfo.action.summary.profit />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
