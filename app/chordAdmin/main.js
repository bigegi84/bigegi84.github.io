define((require) => {
  var bigegi84 = require("../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  var { login, song } = require("./page/index");
  var store = require("./store/index");
  document.title = "bigegi84 - Chord Admin";
  return () =>
    jurus.pamacan({
      textHighlight: "bigegi84 - Chord Admin",
      view: store.token ? song.view() : login.view(),
    });
});
