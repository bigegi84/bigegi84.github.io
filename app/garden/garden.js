const garden = {
  view: () => {
    return (
      <div className={"column-a"} style={{ padding: "3em" }}>
        <h1 className={bigegi84theme.class.basic}>bigegi84 - Garden</h1>
        <div className="row-a">
          <mobxReact.Observer>
            {() => (
              <div
                style={bigegi84theme.styleCircle}
                className="circle-a"
                onClick={() =>
                  (gardenStore.show.balance = !gardenStore.show.balance)
                }
              >
                <i
                  className={
                    "fa-solid " +
                    (gardenStore.show.balance ? " fa-eye-slash" : "fa-eye")
                  }
                />
              </div>
            )}
          </mobxReact.Observer>
        </div>
        <gardenConfig.view />
        <gardenInfo.view />
        <gardenSale.view />
        <gardenPurchase.view />
        <gardenCustomer.view />
        {/* <gardenStuff.view /> */}
        <gardenSupply.view />
      </div>
    );
  },
};
