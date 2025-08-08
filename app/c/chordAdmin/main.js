define((require) => {
  var { pakuan } = require('../../../lib/index')
  var view = require('./view')
  var state = require('./state/index')
  var store = require('./store/index')
  return () => {
    document.title = 'Chord Admin'
    store.IsLogin = state.apiToken ? true : false
    pakuan.dom(view)
  }
})
