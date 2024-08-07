define((require) => {
  var action = require("./action/index");
  var main = require("./main");
  return {
    action,
    main,
  };
});
