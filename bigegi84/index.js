define((require) => {
  var action = require("./action/index");
  var state = require("./state/index");
  var store = require("./store/index");
  var view = require("./view");
  return {
    action,
    state,
    store,
    view,
  };
});
