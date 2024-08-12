define((require) => {
  var state = require("../state/index");
  var main = (obj) => {
    var private = { ...obj };
    var newObj = {};
    for (const key in private) {
      if (typeof private[key] === "object" && !Array.isArray(private[key])) {
        newObj[key] = main(private[key]);
      } else {
        Object.defineProperty(newObj, key, {
          get() {
            return private[key];
          },
          set(value) {
            private[key] = value;
            state.observer.notify();
          },
        });
      }
    }
    return newObj;
  };
  return main;
});
