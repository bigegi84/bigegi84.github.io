define((require) => {
  var buttonCircle = require('./buttonCircle')
  var column = require('../layout/column')
  var div = require('../layout/div')
  var row = require('../row')
  var textStrong = require('../text/textStrong')
  var useState = require('../useState')
  return (label = null, isShowP = null, lCls = 'pakuan-textStrong') => {
    var isShow = isShowP ? isShowP : useState(false)
    var child = () =>
      row([
        label ? textStrong(label, lCls) : null,
        div([
          buttonCircle(isShow.value ? '<' : '>', () => {
            isShow.value = !isShow.value
          }),
        ]),
      ])
    var component = column([child()])
    isShow.observer.subscribe(() => {
      component.innerHTML = ''
      component.appendChild(child())
    })
    return component
  }
})
