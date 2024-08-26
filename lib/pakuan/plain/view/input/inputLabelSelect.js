define((require) => {
  var textLabel = require('../text/textLabel')
  var inputSelect = require('./inputSelect')
  var column = require('../layout/column')
  return (label = null, props = null) => {
    return column([textLabel(label), inputSelect(label, props)])
  }
})
