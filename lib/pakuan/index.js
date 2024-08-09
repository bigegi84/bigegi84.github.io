define((require) => {
  var plain = require("./plain/index");
  var react = require("./react/index");
  return plain.action.render;
  // return react;
});
