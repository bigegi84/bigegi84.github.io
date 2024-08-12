define((require) => {
  var { pakuan } = require("../../../lib/index");
  var { login, song } = require("./page/index");
  var state = require("./state/index");
  var store = require("./store/index");
  console.log(store);
  return () =>
    pakuan.main({
      textHighlight: "bigegi84 - Chord Admin",
      view: state.apiToken ? song.view() : login.view(),
    });
});
