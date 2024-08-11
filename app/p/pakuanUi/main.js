define((require) => {
  var { pakuan } = require("../../../lib/index");
  var view = require("./view");
  return () => {
    document.title = "Pakuan UI";
    pakuan.dom(view);
  };
});
