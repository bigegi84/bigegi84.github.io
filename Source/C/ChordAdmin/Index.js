define((_require) => {
  var action = _require('./action/index')
  var Main = _require('./Main')
  return {
    action,
    Main,
  }
})
