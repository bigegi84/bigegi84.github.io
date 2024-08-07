define((require) => {
  var bigegi84 = require("../../../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  var store = require("../../store/index");
  var action = require("./action/index");
  return jurus.pamacan({
    buttonLogout: () => {
      action.logout();
    },
    buttonCircleCoba: "",
  });
});
