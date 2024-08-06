define((require) => {
  var state = require("./state/index");
  var store = require("./store/index");
  var view = require("./action/view/index");
  return {
    state,
    store,
    view,
  };
});
