define((require) => {
  var { pakuan } = require("../../../../../lib/index");
  var app = require("../../../../../route/app");
  var store = require("../../store/index");
  var action = require("./action/index");
  return () =>
    pakuan.main({
      ...app,
      card: {
        inputLabelTextUsername: [
          store.loginForm.username,
          (e) => (store.loginForm.username = e.target.value),
        ],
        inputLabelPasswordPassword: [
          store.loginForm.password,
          (e) => (store.loginForm.password = e.target.value),
        ],
        buttonLogin: () => action.login(),
      },
    });
});
