define((require) => {
  var state = require("../state/index");
  return (obj) => {
    var newObj = {};
    for (var [key] of Object.entries(obj)) {
      newObj["_" + key] = obj[key];
    }
    for (var [key] of Object.entries(newObj)) {
      Object.defineProperty(newObj, key.slice(1), {
        get() {
          return newObj[key];
        },
        set(value) {
          newObj[key] = value;
          state.observer.notify();
        },
      });
    }
    return newObj;
  };
});
