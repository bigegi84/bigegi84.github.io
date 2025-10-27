define((require) => {
  var { pakuan } = require('../../../lib/index')
  var Page = require('./page/index')
  var View = require('./View')
  var state = require('./state/index')
  var store = require('./store/index')
  return () => {
    document.title = 'Chord Admin'
    store.IsLogin = state.apiToken ? true : false
    if (!store.IsLogin) {
      window.location.hash = '/ChordAdmin/Login'
      pakuan.dom(View(Page.login))
      return
    }
    if (store.IsLogin) {
      window.location.hash = '/ChordAdmin/Home'
      pakuan.dom(View(Page.song))
      return
    }
  }
})
