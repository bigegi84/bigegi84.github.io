define((require) => {
  var bigegi84 = require("./bigegi84/index");
  var { action } = bigegi84;
  var route = require("./route/index");
  action.init.all();
  route.plain.main();
  // window.e = React.createElement;
  // var view = require("./lib/pakuan/react/index");
  // ReactDOM.render(view.text("coba"), document.getElementById("root"));
});
