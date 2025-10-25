define((require) => {
  var { pakuan: Pakuan } = require('../../../lib/index')
  var View = require('./View')
  return () => {
    document.title = 'Pakuan Test'
    Pakuan.dom(View)
  }
})
