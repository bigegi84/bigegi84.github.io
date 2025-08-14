define((_require) => {
  var { pakuan } = _require('../../../lib/index')
  var Page = _require('./page/index')
  var View = _require('./View')
  var State = _require('./State/Index')
  var store = _require('./store/index')
  return () => {
    document.title = 'Chord Admin'
    // store.IsLogin = State.apiToken ? true : false
    if (!State.ApiToken) {
      window.location.hash = '/ChordAdmin/Login'
      pakuan.dom(View(Page.login))
      return
    }
    if (State.ApiToken) {
      window.location.hash = '/ChordAdmin/Home'
      pakuan.dom(View(Page.song))
      return
    }
  }
})
