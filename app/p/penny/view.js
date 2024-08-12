define((require) => {
  var { pakuan } = require("../../../lib/index");
  var { home, login } = require("./page/index");
  var store = require("./store/index");
  return () =>
    pakuan.main({
      textHighlight: "bigegi84 - Penny",
      view: store.token ? home.view() : login.view(),
    });
});
