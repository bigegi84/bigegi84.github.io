define((require) => {
  var store = require('../store/index')
  return () => {
    localStorage.removeItem("chordAdmin-apiToken");
    store.IsLogin = false;
  };
});
