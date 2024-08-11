define((require) => {
  var { pakuan } = require("../lib/index");
  var view = require("./view");
  return () => {
    document.title = "bigegi84";
    pakuan.dom(view);
  };
});
