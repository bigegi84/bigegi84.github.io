define((require) => {
  var action = require("./action/index");
  var main = require("./main");
  var state = require("./state/index");
  var store = require("./store/index");
  var view = require("./view");
  return {
    action,
    main,
    state,
    store,
    view,
  };
});
