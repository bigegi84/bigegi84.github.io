define((require) => {
  var state = require("../state/index");
  return {
    _count: 0,
    get count() {
      return this._count;
    },
    set count(v) {
      this._count = v;
      state.observer.notify();
    },
  };
});
