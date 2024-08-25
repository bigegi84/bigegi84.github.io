define(() => {
  var className = 'pakuan-highlight'
  return (label = null) => {
    const component = document.createElement('h2')
    if (label) component.innerHTML = label
    component.setAttribute('class', className)
    return component
  }
})
