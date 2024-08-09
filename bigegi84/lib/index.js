define((require) => {
  var load = require("./load/index");
  var observer = require("./observer");
  var view = require("./pakuan/index");
  return { load, observer, view };
});
