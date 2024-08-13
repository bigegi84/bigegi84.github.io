define((require) => {
  var { pakuan } = require("../../../lib/index");
  var { login, song } = require("./page/index");
  var state = require("./state/index");
  return () =>
    pakuan.main({
      textHighlight: "bigegi84 - Chord Admin",
      view: state.apiToken ? song.view() : login.view(),
    });
});
