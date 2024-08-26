define((require) => {
  var textlabel = require('../text/textLabel')
  var inputPassword = require('./inputPassword')
  var column = require('../layout/column')
  var labelCls = 'pakuan-textStrong',
    inputCls = 'pakuan-inputText'
  return (label = null, state = null) => {
    return column([
      textlabel(label, labelCls),
      inputPassword(label, state, inputCls),
    ])
  }
})
