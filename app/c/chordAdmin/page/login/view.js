define((require) => {
  var { pakuan } = require("../../../../../lib/index");
  var store = require("../../store/index");
  var action = require("./action/index");
  return () =>
    pakuan({
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
