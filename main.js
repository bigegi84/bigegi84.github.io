define((require) => {
  var bigegi84 = require("./bigegi84/index");
  var { action } = bigegi84;
  var route = require("./route/index");
  action.init.all();
  route.plain.main();
  // var e = React.createElement;
  // window.e = React.createElement;
  // var view = require("./bigegi84/lib/view/index");
  // ReactDOM.render(view.text(), document.getElementById("root"));
});
