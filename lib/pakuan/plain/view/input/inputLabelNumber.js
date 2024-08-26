define((require) => {
  var textLabel = require('../text/textLabel')
  var inputNumber = require('./inputNumber')
  var column = require('../layout/column')
  var labelCls = 'pakuan-textStrong',
    inputCls = 'pakuan-inputText'
  return (label = null, state = null) => {
    return column([
      textLabel(label, labelCls),
      inputNumber(label, state, inputCls),
    ])
  }
})
