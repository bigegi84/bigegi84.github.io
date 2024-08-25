define((require) => {
  var { pakuan } = require('../../../lib/index')
  var { home, login } = require('./page/index')
  var state = require('./state/index')
  return pakuan.main({
    textHighlight: 'bigegi84 - Penny',
    view: state.apiToken ? home.view() : login.view(),
  })
})
