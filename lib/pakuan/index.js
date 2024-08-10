define((require) => {
  var plain = require("./plain/index");
  var react = require("./react/index");
  var state = require("./state/index");
  return {
    main: (it) => plain.action.render(it),
    state,
  };
  // return react;
});
