define((_require) => {
  var State = _require('../../../State/Index')
  return () => {
    State.ApiToken = null
    alertify.success('Logout success.')
    window.location.hash = '/ChordAdmin/Login'
  }
})
