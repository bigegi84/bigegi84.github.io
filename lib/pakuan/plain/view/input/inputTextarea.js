define(() => {
  var inputCls = 'pakuan-inputTextarea',
    styleColor = 'white'
  return (label = null, state = null) => {
    var [value, setState] = state
    var component = document.createElement('textarea')
    component.type = 'text'
    component.name = label
    component.style.color = styleColor
    if (inputCls) component.setAttribute('class', inputCls)
    if (value) component.value = value
    component.onchange = (e) => {
      if (setState) setState(e)
    }
    return component
  }
})
