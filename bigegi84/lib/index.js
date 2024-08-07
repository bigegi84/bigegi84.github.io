define((require) => {
  var load = require("./load/index");
  var observer = require("./observer");
  var view = require("./view/index");
  return { load, observer, view };
});
