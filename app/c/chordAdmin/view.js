define((require) => {
  var { pakuan } = require('../../../lib/index')
  var { login, song } = require('./page/index')
  var store = require('./store/index')
  return pakuan.main({
    textHighlight: 'bigegi84 - Chord Admin',
    observer: () => (store.IsLogin ? song.view() : login.view()),
  })
})
