define((require) => {
  var { pakuan } = require("../../../lib/index");
  var view = require("./view");
  return () => {
    document.title = "Penny";
    pakuan.dom(view);
  };
});
