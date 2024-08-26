define((require) => {
  var label = require('../label')
  var inputSelect = require('./inputSelect')
  var column = require('../layout/column')
  return (name = null, props = null) => {
    return column([label(name), inputSelect(name, props)])
  }
})
