define((require) => {
  var state = require("./state/index");
  var store = require("./store/index");
  var action = require("./action/index");
  return {
    action,
    state,
    store,
  };
});
