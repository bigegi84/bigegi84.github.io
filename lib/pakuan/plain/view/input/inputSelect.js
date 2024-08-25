define(() => {
  return (name = null, props = null) => {
    var inputCls = 'pakuan-inputText',
      styleColor = 'white'
    //   var [value, setState] = state
    var component = document.createElement('select')
    component.style.color = styleColor
    component.id = `inputSelect${name}`

    var cOptionMain = document.createElement('option')
    cOptionMain.innerHTML = `- Select ${name} -`
    cOptionMain.value = ''
    component.appendChild(cOptionMain)
    if (props) {
      if (props.option) {
        props.option.forEach((it) => {
          var cOption = document.createElement('option')
          cOption.innerHTML = `${it[0] ?? ''}`
          cOption.value = it[1] ?? ''
          component.appendChild(cOption)
        })
      }
    }
    if (inputCls) component.setAttribute('class', inputCls)
    if (props)
      if (props.state) if (props.state[0]) component.value = props.state[0]
    component.onchange = (e) => {
      if (props) if (props.state) if (props.state[1]) props.state[1](e)
    }
    return component
  }
})
