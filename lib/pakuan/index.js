define((require) => {
  var plain = require("./plain/index");
  var react = require("./react/index");
  var state = require("./state/index");
  return {
    dom: (p, c) => plain.action.dom(p, c),
    main: (it) => plain.action.render(it),
    state,
  };
  // return react;
});
