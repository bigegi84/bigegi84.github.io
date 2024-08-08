define((require) => {
  var bigegi84 = require("../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  var { login, song } = require("./page/index");
  var store = require("./store/index");
  return jurus.pamacan({
    textHighlight: "bigegi84 - Chord Admin",
    panelTest: {
      "buttonAlert Success": () => {
        alertify.success("Success.");
      },
      "buttonAlert Error": () => {
        alertify.error("Error.");
      },
    },
    observer: () => (store.token ? song.view : login.view),
  });
});
