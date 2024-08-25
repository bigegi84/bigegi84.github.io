define(() => {
  var className = 'pakuan-text'
  return (label = null) => {
    const component = document.createElement('p')
    if (label) component.innerHTML = label
    component.setAttribute('class', className)
    return component
  }
})
