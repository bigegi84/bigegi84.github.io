define(() => {
  var inputClass = 'pakuan-inputSelect'
  return (label = null, props = null) => {
    var component = document.createElement('select')
    component.id = `inputSelect${label}`

    var cOptionMain = document.createElement('option')
    cOptionMain.innerHTML = `- Select ${label} -`
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
    if (inputClass) component.setAttribute('class', inputClass)
    if (props)
      if (props.state) if (props.state[0]) component.value = props.state[0]
    component.onchange = (e) => {
      if (props) if (props.state) if (props.state[1]) props.state[1](e)
    }
    return component
  }
})
