define((require) => {
  var load = require("./load/index");
  var observer = require("./observer");
  var pakuan = require("./pakuan/index");
  var view = require("./pakuan/index");
  return { load, observer, pakuan, view };
});
