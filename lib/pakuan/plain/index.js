define((require) => {
  var action = require("./action/index");
  var view = require("./view/index");
  return {
    action,
    view,
  };
});
