define((require) => {
  var app = require("./app");
  var plain = require("./plain/index");
  return {
    app,
    plain,
  };
});
