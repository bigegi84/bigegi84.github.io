define((require) => {
  var bigegi84 = require("./index");
  var { action, state, store } = bigegi84;
  // var { button, column, text } = bigegi84.view;
  // var render = () => {
  //   column([
  //     text(store.count),
  //     button("count", () => {
  //       store.count++;
  //     }),
  //   ])(document.getElementById("root"));
  // };
  var render = () => {
    action.jurus.pamacan({
      text: store.count,
      buttonCount: () => {
        store.count++;
      },
    })(document.getElementById("root"));
  };
  state.observer.subscribe(() => {
    document.getElementById("root").innerHTML = "";
    render();
  });
  action.init.all();
  render();
});
