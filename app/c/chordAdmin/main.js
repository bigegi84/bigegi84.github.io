define((require) => {
  var { pakuan } = require("../../../lib/index");
  var view = require("./view");
  return () => {
    document.title = "Chord Admin";
    pakuan.dom(view);
  };
});
