define((require) => {
  var store = require("../../../store/index");
  return () => {
    localStorage.removeItem("chordAdmin-apiToken");
    store.token = null;
    store.isLogin = true;
  };
});
