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
          store.login.username,
          (e) => (store.login.username = e.target.value),
        ],
        inputLabelPasswordPassword: [
          store.login.password,
          (e) => (store.login.password = e.target.value),
        ],
        buttonLogin: () => {
          action.login();
        },
      },
    });
});
