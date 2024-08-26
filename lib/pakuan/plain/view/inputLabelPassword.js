define((require) => {
  var labelV = require('./label')
  var inputPassword = require('./inputPassword')
  var column = require('./layout/column')
  return (
    label = null,
    state = null,
    labelCls = 'pakuan-textStrong',
    inputCls = 'pakuan-inputText'
  ) => {
    return column([
      labelV(label, labelCls),
      inputPassword(label, state, inputCls),
    ])
  }
})
