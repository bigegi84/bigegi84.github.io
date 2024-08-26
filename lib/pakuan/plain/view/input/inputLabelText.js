define((require) => {
  var textLabel = require('../text/textLabel')
  var inputText = require('./inputText')
  var column = require('../layout/column')
  var labelCls = 'pakuan-textStrong',
    inputCls = 'pakuan-inputText'
  return (label = null, state = null) => {
    return column([
      textLabel(label, labelCls),
      inputText(label, state, inputCls),
    ])
  }
})
