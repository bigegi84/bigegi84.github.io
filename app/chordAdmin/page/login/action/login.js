define((require) => {
  var state = require("../../../state/index");
  var store = require("../../../store/index");
  return async () => {
    var { username, password } = store.loginForm;
    const res = await axios.post(state.apiUrl + "/user/login", {
      username,
      password,
    });
    if (res.data.status == "ok") {
      localStorage.setItem("chordAdmin-apiToken", res.data.result);
      store.token = res.data.result;
      store.isLogin = true;
      alertify.success("Login berhasil.");
    } else {
      alertify.error("Login gagal.");
    }
  };
});
