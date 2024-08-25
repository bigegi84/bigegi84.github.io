define(() => {
  var className = 'pakuan-row'
  return (children) => {
    const component = document.createElement('div')
    component.setAttribute('class', className)
    children.forEach((it) => component.appendChild(it))
    return component
  }
})
