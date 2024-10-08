define((require) => {
  var buttonCircle = require('../button/buttonLabelCircle')
  var column = require('../layout/column')
  var useState = require('../useState')
  return (label = '', children) => {
    var isShow = useState(true)
    var component = column([
      buttonCircle(label, isShow),
      isShow.observerView(() => (isShow.value ? column(children) : column([]))),
    ])
    return component
  }
})
