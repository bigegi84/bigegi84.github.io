define((require) => {
  var bigegi84 = require("../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  var { login } = require("./page/index");
  var store = require("./store/index");
  return () => {
    jurus.pamacan({
      textHighlight: "bigegi84 - Chord Admin",
      view: store.token
        ? jurus.pamacan({ textHighlight: "login" })
        : login.view,
    })(document.getElementById("root"));
  };
});
