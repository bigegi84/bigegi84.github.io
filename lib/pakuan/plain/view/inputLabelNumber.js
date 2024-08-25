define((require) => {
  var _label = require('./label')
  var inputNumber = require('./inputNumber')
  var column = require('./column')
  return (
    label = null,
    state = null,
    labelCls = 'pakuan-textStrong',
    inputCls = 'pakuan-inputText'
  ) => {
    return column([
      _label(label, labelCls),
      inputNumber(label, state, inputCls),
    ])
  }
})
