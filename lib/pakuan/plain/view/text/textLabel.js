define(() => {
  var labelCls = 'pakuan-textStrong'
  return (label = null) => {
    const component = document.createElement('label')
    if (label) component.innerHTML = label
    component.setAttribute('class', labelCls)
    return component
  }
})
