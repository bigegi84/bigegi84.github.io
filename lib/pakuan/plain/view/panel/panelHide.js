define((require) => {
  var buttonCircle = require('../buttonCircle')
  var column = require('../layout/column')
  var useState = require('../useState')
  return (label = '', children) => {
    var isShow = useState(false)
    var component = column([
      buttonCircle(label, isShow),
      isShow.observerView(() => (isShow.value ? column(children) : column([]))),
    ])
    return component
  }
})
