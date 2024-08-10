define((require) => {
  var { pakuan } = require("../../../lib/index");
  var { login, song } = require("./page/index");
  var store = require("./store/index");
  document.title = "bigegi84 - Chord Admin";
  return () =>
    pakuan.main({
      textHighlight: "bigegi84 - Chord Admin",
      view: store.token ? song.view() : login.view(),
    });
});
