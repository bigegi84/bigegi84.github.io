define((require) => {
  var bigegi84 = require("./bigegi84/index");
  var { action } = bigegi84;
  var route = require("./route/index");
  action.init.all();
  route.plain.main();
  // const e = React.createElement;
  // ReactDOM.render(
  //   e("div", null, "Hello World"),
  //   document.getElementById("root")
  // );
});
