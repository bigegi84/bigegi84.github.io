const pennyInfo = {
  action: {
    balance: () => {
      return (
        <div className="row-a">
          <strong className={bigegi84theme.class.basic}>Total Saldo:</strong>
          <mobxReact.Observer>
            {() => (
              <span>
                {pennyStore.show.balance
                  ? pennyStore.account.reduce(
                      (partialSum, [, , balance]) => partialSum + balance,
                      0
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
          <div className={bigegi84theme.class.basic}>
            <mobxReact.Observer>
              {() => (
                <div className="column-a card-a">
                  <strong className={bigegi84theme.class.basic}>
                    {pennyStore.info.name}
                  </strong>
                  <pennyInfo.action.balance />
                </div>
              )}
            </mobxReact.Observer>
          </div>
        ) : null}
      </div>
    );
  },
};
