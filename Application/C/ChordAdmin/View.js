define((require) => {
  var { pakuan } = require('../../../lib/index')
  var { login, song } = require('./page/index')
  var store = require('./store/index')
  return (Page) =>
    pakuan.main({
      textHighlight: 'bigegi84 - Chord Admin',
      view: Page.view(),
    })
})
