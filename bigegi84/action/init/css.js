define((require) => {
  var lib = require("../../lib/index");
  var { load } = lib;
  var state = require("../../state/index");
  return () => {
    load.css(state.css);
  };
});
