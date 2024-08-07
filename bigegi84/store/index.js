define((require) => {
  var state = require("../state/index");
  var theme = require("./theme/index");
  var private = { count: 0 };
  return {
    get count() {
      return private.count;
    },
    set count(v) {
      private.count = v;
      state.observer.notify();
    },
    theme,
  };
});
