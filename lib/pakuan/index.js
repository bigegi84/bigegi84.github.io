define((require) => {
  var action = require('./action/index')
  var plain = require('./plain/index')
  var react = require('./react/index')
  var state = require('./state/index')
  return {
    action,
    dom: (p, c) => plain.action.dom(p, c),
    main: (it) => plain.action.render(it),
    state,
    view: plain.view,
  }
  // return react;
})
