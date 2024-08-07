define((require) => {
  var bigegi84 = require("../../../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  var store = require("../../store/index");
  var action = require("./action/index");
  return jurus.pamacan({
    buttonLogout: () => action.logout(),
    buttonCircleCoba: () => action.logout(),
    inputLabelTextUsername: [
      store.loginForm.username,
      (e) => (store.loginForm.username = e.target.value),
    ],
    inputLabelTextPassword: [
      store.loginForm.password,
      (e) => (store.loginForm.password = e.target.value),
    ],
    buttonLogin: () => action.login(),
  });
});
