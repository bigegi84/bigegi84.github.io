const penny = {
  view: () => {
    return (
      <div className={"column-a"} style={{ padding: "3em" }}>
        <h1 className={bigegi84theme.class.basic}>bigegi84 - Penny</h1>
        <div className="row-a">
          <mobxReact.Observer>
            {() => (
              <div
                style={bigegi84theme.styleCircle}
                className="circle-a"
                onClick={() =>
                  (pennyStore.show.balance = !pennyStore.show.balance)
                }
              >
                <i
                  className={
                    "fa-solid " +
                    (pennyStore.show.balance ? " fa-eye-slash" : "fa-eye")
                  }
                />
              </div>
            )}
          </mobxReact.Observer>
        </div>
        <pennyInfo.view />
        <pennyConfig.view />
        <pennyAccount.view />
        <pennyAsset.view />
        <pennyDebt.view />
        {/* <pennyClaim.view /> */}
      </div>
    );
  },
};