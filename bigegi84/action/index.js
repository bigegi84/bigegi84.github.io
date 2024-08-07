define((require) => {
  var init = require("./init/index");
  var jurus = require("./jurus/index");
  var render = require("./render");
  return { init, jurus, render };
});
