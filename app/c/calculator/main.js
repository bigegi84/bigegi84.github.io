define((require) => {
  var { pakuan } = require('../../../lib/index')
  var view = require('./view')
  return () => {
    document.title = 'Calculator'
    pakuan.dom(view)
  }
})
