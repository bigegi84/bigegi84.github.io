define((require) => {
  var action = require("./action/index");
  var state = require("./state/index");
  var store = require("./store/index");
  return {
    action,
    state,
    store,
  };
});
