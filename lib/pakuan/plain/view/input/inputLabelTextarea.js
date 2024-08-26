define((require) => {
  var textLabel = require('../text/textLabel')
  var inputTextarea = require('./inputTextarea')
  var column = require('../layout/column')
  return (
    label = null,
    state = null,
    labelCls = 'pakuan-textStrong',
    inputCls = 'pakuan-inputTextarea'
  ) => {
    return column([
      textLabel(label, labelCls),
      inputTextarea(label, state, inputCls),
    ])
  }
})
