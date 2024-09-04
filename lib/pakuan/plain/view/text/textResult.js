define((require) => {
  var textLabel = require('./textLabel')
  var column = require('../layout/column')
  var labelCls = 'pakuan-textStrong'
  return (label = null, result = null) => {
    return column([textLabel(label, labelCls), textLabel(result, labelCls)])
  }
})
